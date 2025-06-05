/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Új feladat-kép összerendelés létrehozása
* Létrehoz egy új kapcsolatot egy feladat és egy kép között az adatbázisban.
*
* fldtkpInput FldtkpInput 
* returns Fldtkp
* */
const createTaskImageMapping = ({ fldtkpInput }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        fldtkpInput,
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
* Új feladat-felhasználó összerendelés létrehozása
* Létrehoz egy új kapcsolatot egy feladat és egy felhasználó között az adatbázisban.
*
* fldtFlhsznlInput FldtFlhsznlInput 
* returns FldtFlhsznl
* */
const createTaskUserMapping = ({ fldtFlhsznlInput }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        fldtFlhsznlInput,
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
* Adott összerendelés törlése ID alapján
* Egy feladat és kép közötti összerendelés törlése az adatbázisból.
*
* fldtkpUnderscoreid Integer Az összerendelés egyedi azonosítója.
* no response value expected for this operation
* */
const deleteTaskImageMapping = ({ fldtkpUnderscoreid }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        fldtkpUnderscoreid,
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
* Adott összerendelés törlése ID alapján
* Egy feladat és felhasználó közötti kapcsolat törlése az adatbázisból.
*
* fldtflhsznlUnderscoreid Integer Az összerendelés egyedi azonosítója.
* no response value expected for this operation
* */
const deleteTaskUserMapping = ({ fldtflhsznlUnderscoreid }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        fldtflhsznlUnderscoreid,
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
* Adott összerendelés lekérdezése ID alapján
* Egy konkrét feladat-kép összerendelés adatainak lekérdezése azonosító alapján.
*
* fldtkpUnderscoreid Integer Az összerendelés egyedi azonosítója.
* returns Fldtkp
* */
const getTaskImageMappingById = ({ fldtkpUnderscoreid }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        fldtkpUnderscoreid,
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
* Adott összerendelés lekérdezése ID alapján
* Egy konkrét feladat-felhasználó összerendelés adatainak lekérdezése azonosító alapján.
*
* fldtflhsznlUnderscoreid Integer Az összerendelés egyedi azonosítója.
* returns FldtFlhsznl
* */
const getTaskUserMappingById = ({ fldtflhsznlUnderscoreid }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        fldtflhsznlUnderscoreid,
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
* Összes feladat-kép összerendelés listázása
* Lekérdezi az összes feladathoz tartozó kép összerendelést az adatbázisból.
*
* returns List
* */
const listTaskImageMappings = () => new Promise(
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
* Összes feladat-felhasználó összerendelés listázása
* Lekérdezi az összes feladat-felhasználó összerendelést az adatbázisból.
*
* returns List
* */
const listTaskUserMappings = () => new Promise(
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
* Adott összerendelés frissítése ID alapján
* Egy meglévő feladat-kép kapcsolat módosítása az adatbázisban.
*
* fldtkpUnderscoreid Integer Az összerendelés egyedi azonosítója.
* fldtkpInput FldtkpInput 
* returns Fldtkp
* */
const updateTaskImageMapping = ({ fldtkpUnderscoreid, fldtkpInput }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        fldtkpUnderscoreid,
        fldtkpInput,
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
* Adott összerendelés frissítése ID alapján
* Egy meglévő feladat-felhasználó kapcsolat módosítása az adatbázisban.
*
* fldtflhsznlUnderscoreid Integer Az összerendelés egyedi azonosítója.
* fldtFlhsznlInput FldtFlhsznlInput 
* returns FldtFlhsznl
* */
const updateTaskUserMapping = ({ fldtflhsznlUnderscoreid, fldtFlhsznlInput }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        fldtflhsznlUnderscoreid,
        fldtFlhsznlInput,
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
  createTaskImageMapping,
  createTaskUserMapping,
  deleteTaskImageMapping,
  deleteTaskUserMapping,
  getTaskImageMappingById,
  getTaskUserMappingById,
  listTaskImageMappings,
  listTaskUserMappings,
  updateTaskImageMapping,
  updateTaskUserMapping,
};
