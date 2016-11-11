/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/infotypes              ->  index
 * POST    /api/infotypes              ->  create
 * GET     /api/infotypes/:id          ->  show
 * PUT     /api/infotypes/:id          ->  upsert
 * PATCH   /api/infotypes/:id          ->  patch
 * DELETE  /api/infotypes/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import {Infotype} from '../../sqldb';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.destroy()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Infotypes
export function index(req, res) {
	var datatypes = [];
	var allCat = {name:"<strong>All Information</strong>", msGroup:true};
	var financialCat = {name:"<strong>Financial</strong>", msGroup:true};
	var income = {name:"Income", id:1, price:5, ticked:false};
	var endFinancialCat = {msGroup:false};
	var educationalCat = {name:"<strong>Educational</strong>", msGroup:true};
	var degree = {name:"Degrees", id:4, price:10, ticked:false};
	var endEducationalCat = {msGroup:false};
	var endAllCat = {msGroup:false};
	datatypes.push(allCat);
	datatypes.push(financialCat);
	datatypes.push(income);
	datatypes.push(endFinancialCat);
	datatypes.push(educationalCat);
	datatypes.push(degree);
	datatypes.push(endEducationalCat);
	datatypes.push(endAllCat);
	var data ={};
	data.datatypes = datatypes;
	res.json(data);
  /*return Infotype.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));*/
}

// Gets a single Infotype from the DB
export function show(req, res) {
  return Infotype.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Infotype in the DB
export function create(req, res) {
  return Infotype.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Infotype in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }

  return Infotype.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Infotype in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Infotype.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Infotype from the DB
export function destroy(req, res) {
  return Infotype.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
