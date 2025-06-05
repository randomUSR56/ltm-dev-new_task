/**
 * The SszerendelsController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic routes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/SszerendelsService');
const createTaskImageMapping = async (request, response) => {
  await Controller.handleRequest(request, response, service.createTaskImageMapping);
};

const createTaskUserMapping = async (request, response) => {
  await Controller.handleRequest(request, response, service.createTaskUserMapping);
};

const deleteTaskImageMapping = async (request, response) => {
  await Controller.handleRequest(request, response, service.deleteTaskImageMapping);
};

const deleteTaskUserMapping = async (request, response) => {
  await Controller.handleRequest(request, response, service.deleteTaskUserMapping);
};

const getTaskImageMappingById = async (request, response) => {
  await Controller.handleRequest(request, response, service.getTaskImageMappingById);
};

const getTaskUserMappingById = async (request, response) => {
  await Controller.handleRequest(request, response, service.getTaskUserMappingById);
};

const listTaskImageMappings = async (request, response) => {
  await Controller.handleRequest(request, response, service.listTaskImageMappings);
};

const listTaskUserMappings = async (request, response) => {
  await Controller.handleRequest(request, response, service.listTaskUserMappings);
};

const updateTaskImageMapping = async (request, response) => {
  await Controller.handleRequest(request, response, service.updateTaskImageMapping);
};

const updateTaskUserMapping = async (request, response) => {
  await Controller.handleRequest(request, response, service.updateTaskUserMapping);
};


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
