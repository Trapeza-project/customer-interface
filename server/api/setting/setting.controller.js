/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/settings              ->  index
 * POST    /api/settings              ->  create
 * GET     /api/settings/:id          ->  show
 * PUT     /api/settings/:id          ->  upsert
 * PATCH   /api/settings/:id          ->  patch
 * DELETE  /api/settings/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import {Setting} from '../../sqldb';

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

// Gets a list of Settings
export function index(req, res) {
  return Setting.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Setting from the DB
export function show(req, res) {
	var modules = [{id:1, name:"Small", description:"Includes the basic information to the lookup.", info:[{name:"Income", id:1 ,price:5}], customized:false, active:true, UCHandle:true},{id:2, name:"Medium", description:"Includes the basic and personal information to the lookup.", info:[{name:"Income",id:1 , price:5}, {name:"Address", id:2, price:10}], customized:false, active:true, UCHandle:true},{id:3, name:"Large", description:"Includes detailed information to the lookup.", info:[{name:"Income",id:1, price:5},{name:"Address", id:2, price:10},{name:"Criminal Record", id:3, price:20}], customized:false, active:true, UCHandle:true}];
	var data = {};
	data.modules = modules;
	res.json(data);
  /*return Setting.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));*/
}

// Creates a new Setting in the DB
export function create(req, res) {
  return Setting.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Setting in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }

  return Setting.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Setting in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Setting.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Setting from the DB
export function destroy(req, res) {
  return Setting.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
