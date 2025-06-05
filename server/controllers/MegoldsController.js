/**
 * The MegoldsController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic routes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/MegoldsService');
const createSolution = async (request, response) => {
  await Controller.handleRequest(request, response, service.createSolution);
};

const deleteSolution = async (request, response) => {
  await Controller.handleRequest(request, response, service.deleteSolution);
};

const getSolutionById = async (request, response) => {
  await Controller.handleRequest(request, response, service.getSolutionById);
};

const listSolutions = async (request, response) => {
  await Controller.handleRequest(request, response, service.listSolutions);
};

const updateSolution = async (request, response) => {
  await Controller.handleRequest(request, response, service.updateSolution);
};


module.exports = {
  createSolution,
  deleteSolution,
  getSolutionById,
  listSolutions,
  updateSolution,
};
