/**
 * The FelhasznlController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic routes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/FelhasznlService');
const createUser = async (request, response) => {
  await Controller.handleRequest(request, response, service.createUser);
};

const deleteUser = async (request, response) => {
  await Controller.handleRequest(request, response, service.deleteUser);
};

const getAllUsers = async (request, response) => {
  await Controller.handleRequest(request, response, service.getAllUsers);
};

const getCurrentUser = async (req, res) => {
  const apikulcs = req.get('apikulcs') || req.headers['apikulcs'];
  await service.getCurrentUser({ apikulcs })
    .then(result => res.json(result.payload))
    .catch(error => res.status(error.status || 500).json({ message: error.message }));
};

const getUserById = async (request, response) => {
  await Controller.handleRequest(request, response, service.getUserById);
};

const loginUser = async (request, response) => {
  await Controller.handleRequest(request, response, service.loginUser);
};

const signOutUser = async (request, response) => {
  await Controller.handleRequest(request, response, service.signOutUser);
};

const updateUser = async (request, response) => {
  await Controller.handleRequest(request, response, service.updateUser);
};


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
