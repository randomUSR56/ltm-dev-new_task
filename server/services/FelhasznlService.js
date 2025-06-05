/* eslint-disable no-unused-vars */
const Service = require('./Service');
const db = require('../db');

/**
* Új felhasználó létrehozása
* Létrehoz egy új felhasználót a megadott adatokkal.
*
* felhasznaloInput FelhasznaloInput 
* returns Felhasznalo
* */
const createUser = ({ felhasznaloInput }) => new Promise(
  async (resolve, reject) => {
    try {
      // TODO: Implement actual DB insert logic here if needed
      resolve(Service.successResponse({
        felhasznaloInput,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);

/**
* Adott felhasználó törlése ID alapján
* Eltávolít egy felhasználót a rendszerből a megadott azonosító alapján.
*
* flhsznl_id Integer A felhasználó egyedi azonosítója.
* no response value expected for this operation
* */
const deleteUser = ({ flhsznl_id }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        flhsznl_id,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);

/**
* Összes felhasználó listázása
* Lekérdezi az összes felhasználó adatait az adatbázisból.
*
* returns List
* */
const getAllUsers = () => new Promise(
  async (resolve, reject) => {
    try {
      const result = await db.query(
        'SELECT * FROM felhasznalo ORDER BY flhsznl_id;'
      );
      resolve(Service.successResponse(result.rows));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);

/**
* Get current user details
* Returns details of the authenticated user via API key
*
* returns Felhasznalo
* */
const getCurrentUser = ({ apikulcs }) => new Promise(
  async (resolve, reject) => {
    try {
      if (!apikulcs) {
        return reject(Service.rejectResponse('Missing API key', 401));
      }

      const result = await db.query(
        `SELECT letrejott, modositas, flhsznl_id, lejar AS "Lejar", nev, email
        FROM felhasznalo
        WHERE apikulcs = $1`,
        [apikulcs]
      );

      if (result.rows.length === 0) {
        return reject(Service.rejectResponse('User not found', 404));
      }

      resolve(Service.successResponse(result.rows[0]));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);


/**
* Adott felhasználó lekérdezése ID alapján
* Visszaadja egy adott azonosítójú felhasználó részletes adatait.
*
* flhsznl_id Integer A felhasználó egyedi azonosítója.
* returns Felhasznalo
* */
const getUserById = ({ flhsznl_id }) => new Promise(
  async (resolve, reject) => {
    try {
      const result = await db.query(
        'SELECT * FROM felhasznalo WHERE flhsznl_id = $1',
        [flhsznl_id]
      );
      if (result.rows.length === 0) {
        return reject(Service.rejectResponse('User not found', 404));
      }
      resolve(Service.successResponse(result.rows[0]));
    } catch (e) {
      reject(Service.rejectResponse(e.message, 500));
    }
  }
);

/**
* Felhasználó bejelentkezés
* Bejelentkezés email és jelszó alapján. Sikeres bejelentkezés esetén visszaadja a felhasználó apikulcs-át.
*
* loginUserRequest LoginUserRequest 
* returns loginUser_200_response
* */
const loginUser = ( loginUserRequest ) => new Promise(
  async (resolve, reject) => {
    try {
      const { body } = loginUserRequest;
      const { email, jelszo } = body;
      
      const result = await db.query(
        `SELECT apikulcs FROM felhasznalo 
         WHERE email = $1 
         AND jelszo = $2 
         AND belephet = true 
         AND lejar > NOW()`,
        [email, jelszo]
      );

      if (result.rows.length === 0) {
        return reject(Service.rejectResponse('Invalid credentials', 401));
      }

      resolve(Service.successResponse({ 
        apikulcs: result.rows[0].apikulcs 
      }));
    } catch (e) {
      reject(Service.rejectResponse(e.message, 500));
    }
  }
);

/**
* Felhasználó kijelentkezés (signout)
* Invalidate the user's API key, logging them out.
*
* no response value expected for this operation
* */
const signOutUser = () => new Promise(
  async (resolve, reject) => {
    try {
      // TODO: Implement actual sign out logic if needed
      resolve(Service.successResponse({}));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);

/**
* Adott felhasználó frissítése ID alapján
* Frissíti egy meglévő felhasználó adatait a megadott értékekkel.
*
* flhsznl_id Integer A felhasználó egyedi azonosítója.
* felhasznaloInput FelhasznaloInput 
* returns Felhasznalo
* */
const updateUser = ({ flhsznl_id, felhasznaloInput }) => new Promise(
  async (resolve, reject) => {
    try {
      // TODO: Implement actual DB update logic here if needed
      resolve(Service.successResponse({
        flhsznl_id,
        felhasznaloInput,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);

module.exports = {
  createUser,
  deleteUser,
  getAllUsers,
  getCurrentUser,
  getUserById,
  loginUser,
  signOutUser,
  updateUser,
};
