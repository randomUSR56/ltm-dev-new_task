/* eslint-disable no-unused-vars */
const Service = require('./Service');
const db = require('../db');

/**
* Új feladat létrehozása
* Új feladatot hoz létre a megadott adatokkal.
*
* feladatInput FeladatInput 
* returns Feladat
* */
const createTask = ({ body: feladatInput }) => new Promise(async (resolve, reject) => {
  try {
    // Validate coordinate structures
    const validateGeoJSON = (coord, systemName) => {
      if (coord && (
        !coord.type ||
        !Array.isArray(coord.coordinates) ||
        coord.coordinates.length !== 2 ||
        coord.coordinates.some(isNaN)
      )) {
        throw new Error(`Invalid ${systemName} coordinates structure`);
      }
    };

    validateGeoJSON(feladatInput.gps_koordinata, 'GPS');
    validateGeoJSON(feladatInput.eov_koordinata, 'EOV');

    if (!feladatInput.gps_koordinata && !feladatInput.eov_koordinata) {
      throw new Error('At least one coordinate system must be provided');
    }

    // Base parameters
    const params = [
      feladatInput.rovidnev,
      feladatInput.leiras,
      feladatInput.hatarido
    ];

    // Dynamic SQL parts
    let gpsField = 'NULL';
    let eovField = 'NULL';

    // Handle GPS coordinates
    if (feladatInput.gps_koordinata) {
      gpsField = `ST_SetSRID(ST_MakePoint($${params.length + 1}::float, $${params.length + 2}::float), 4326)`;
      params.push(
        feladatInput.gps_koordinata.coordinates[0],
        feladatInput.gps_koordinata.coordinates[1]
      );
    }

    // Handle EOV coordinates
    if (feladatInput.eov_koordinata) {
      eovField = `ST_SetSRID(ST_MakePoint($${params.length + 1}::float, $${params.length + 2}::float), 23700)`;
      params.push(
        feladatInput.eov_koordinata.coordinates[0],
        feladatInput.eov_koordinata.coordinates[1]
      );
    }

    const result = await db.query(
      `INSERT INTO feladat (
        rovidnev, leiras, hatarido, 
        gps_koordinata, eov_koordinata
      ) VALUES ($1, $2, $3, ${gpsField}, ${eovField})
      RETURNING *`,
      params
    );

    resolve(Service.successResponse(result.rows[0]));
  } catch (e) {
    reject(Service.rejectResponse(
      e.message || 'Database operation failed',
      e.status || 500
    ));
  }
});
/**
* Adott feladat törlése ID alapján
* Egy feladat törlése a megadott azonosító alapján.
*
* fldtUnderscoreid Integer A feladat egyedi azonosítója.
* no response value expected for this operation
* */
const deleteTask = ({ fldtUnderscoreid }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        fldtUnderscoreid,
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
* Adott feladat lekérdezése ID alapján
* Egy adott azonosítójú feladat részletes adatainak lekérdezése.
*
* fldtUnderscoreid Integer A feladat egyedi azonosítója.
* returns Feladat
* */
const getTaskById = ({ fldtUnderscoreid }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        fldtUnderscoreid,
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
* Összes feladat listázása
* Lekérdezi az összes feladatot az adatbázisból.
*
* returns List
* */
const listTasks = () => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
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
* Adott feladat frissítése ID alapján
* Egy meglévő feladat adatainak frissítése a megadott értékekkel.
*
* fldtUnderscoreid Integer A feladat egyedi azonosítója.
* feladatInput FeladatInput 
* returns Feladat
* */
const updateTask = ({ fldtUnderscoreid, feladatInput }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        fldtUnderscoreid,
        feladatInput,
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
  createTask,
  deleteTask,
  getTaskById,
  listTasks,
  updateTask,
};
