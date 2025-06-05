// server/utils/authMiddleware.js
const db = require('../db');

// List of public paths that don't require authentication
const publicPaths = [
  '/api/v1/login',       // Login endpoint
  '/api-docs',           // Swagger UI
  '/openapi',            // Raw OpenAPI spec
  '/hello',              // Test endpoint
  '/oauth2-redirect'     // OAuth redirect (if needed)
];

const authenticate = async (req, res, next) => {
  // Skip auth for public paths
  if (publicPaths.some(path => req.path.startsWith(path))) {
    return next();
  }

  const apiKey = req.headers.apikulcs;
  if (!apiKey) {
    return res.status(401).json({ message: 'API key is required' });
  }

  try {
    const result = await db.query(
      'SELECT * FROM felhasznalo WHERE apikulcs = $1 AND belephet = true AND lejar > NOW()',
      [apiKey]
    );
    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid or expired API key' });
    }
    req.user = result.rows[0]; // Attach user to request
    next();
  } catch (e) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = authenticate;