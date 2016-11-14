/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/datas              ->  index
 * POST    /api/datas              ->  create
 * GET     /api/datas/:id          ->  show
 * PUT     /api/datas/:id          ->  upsert
 * PATCH   /api/datas/:id          ->  patch
 * DELETE  /api/datas/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import {Datalog} from '../../sqldb';
import {FinancialData} from '../../sqldb';
import {EducationalData} from '../../sqldb';
import {BasicData} from '../../sqldb';

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

// Gets a list of Datas
export function index(req, res) {
  return Data.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Data from the DB
export function show(req, res) {
  return Data.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Data in the DB
export function createdata(req, res) {
  return Data.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

export function createlog(req, res) {
  return Data.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Data in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }

  return Data.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Data in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Data.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Data from the DB
export function destroy(req, res) {
  return Data.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
