const http = require('http');
const fs = require('fs');
const path = require('path');
const swaggerUI = require('swagger-ui-express');
const jsYaml = require('js-yaml');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const OpenApiValidator = require('express-openapi-validator');
const logger = require('./logger');
const config = require('./config');
const authenticate = require('./utils/authMiddleware');

class ExpressServer {
  constructor(port, openApiYaml) {
    this.port = port;
    this.openApiPath = openApiYaml;
    this.app = express();

    // Parse OpenAPI schema for Swagger UI
    try {
      this.schema = jsYaml.safeLoad(fs.readFileSync(openApiYaml));
    } catch (e) {
      logger.error('failed to start Express Server', e.message);
    }

    // ---- MIDDLEWARE ORDER IS IMPORTANT ----
    this.app.use(cors());
    this.app.use(express.json({ limit: '14MB' }));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());

    // Authentication middleware (skips /login, /api-docs, etc. as needed)
    this.app.use(authenticate);

    // ---- ROUTES & DOCS ----
    // Test endpoint
    this.app.get('/hello', (req, res) => res.send(`Hello World. path: ${this.openApiPath}`));

    // Serve raw OpenAPI YAML
    this.app.get('/openapi', (req, res) => res.sendFile(path.join(__dirname, 'api', 'openapi.yaml')));

    // Swagger UI
    this.app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(this.schema));

    // OAuth2 redirect endpoint (optional)
    this.app.get('/login-redirect', (req, res) => {
      res.status(200).json(req.query);
    });
    this.app.get('/oauth2-redirect.html', (req, res) => {
      res.status(200).json(req.query);
    });

    // OpenAPI Validator (must come after routes and before error handler)
    this.app.use(
      OpenApiValidator.middleware({
        apiSpec: this.openApiPath,
        operationHandlers: path.join(__dirname),
        fileUploader: { dest: config.FILE_UPLOAD_PATH },
      })
    );
  }

  launch() {
    // Global error handler
    this.app.use((err, req, res, next) => {
      res.status(err.status || 500).json({
        message: err.message || err,
        errors: err.errors || '',
      });
    });

    http.createServer(this.app).listen(this.port);
    console.log(`Listening on port ${this.port}`);
  }

  async close() {
    if (this.server !== undefined) {
      await this.server.close();
      console.log(`Server on port ${this.port} shut down`);
    }
  }
}

module.exports = ExpressServer;
