/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Új feladat kép létrehozása
* Új képet tölt fel egy feladathoz base64 formátumban.
*
* fldtkepInput FldtkepInput 
* returns Fldtkep
* */
const createPicture = ({ fldtkepInput }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        fldtkepInput,
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
* Adott kép törlése ID alapján
* Egy kép törlése az azonosító alapján.
*
* fldtkepUnderscoreid Integer A kép egyedi azonosítója.
* no response value expected for this operation
* */
const deletePicture = ({ fldtkepUnderscoreid }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        fldtkepUnderscoreid,
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
* Adott kép lekérdezése ID alapján
* Egy adott azonosítójú kép adatainak lekérdezése.
*
* fldtkepUnderscoreid Integer A kép egyedi azonosítója.
* returns Fldtkep
* */
const getPictureById = ({ fldtkepUnderscoreid }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        fldtkepUnderscoreid,
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
* Összes feladat kép listázása
* Lekérdezi az összes képet, amelyek feladatokhoz tartoznak.
*
* returns List
* */
const listPictures = () => new Promise(
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
* Adott kép frissítése ID alapján
* Egy meglévő kép adatainak frissítése base64 formátumban.
*
* fldtkepUnderscoreid Integer A kép egyedi azonosítója.
* fldtkepInput FldtkepInput 
* returns Fldtkep
* */
const updatePicture = ({ fldtkepUnderscoreid, fldtkepInput }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        fldtkepUnderscoreid,
        fldtkepInput,
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
  createPicture,
  deletePicture,
  getPictureById,
  listPictures,
  updatePicture,
};
