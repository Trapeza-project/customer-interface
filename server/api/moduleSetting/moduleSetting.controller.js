/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/moduleSettings              ->  index
 * POST    /api/moduleSettings              ->  create
 * GET     /api/moduleSettings/:id          ->  show
 * PUT     /api/moduleSettings/:id          ->  upsert
 * PATCH   /api/moduleSettings/:id          ->  patch
 * DELETE  /api/moduleSettings/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import {ModuleSetting} from '../../sqldb';
import {Infotype} from '../../sqldb';
import Sequelize from 'sequelize';

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

// Gets a list of ModuleSettings
export function index(req, res) {
  return ModuleSetting.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets ModuleSetting for a single user from the DB
export function show(req, res) {
  var modules = [];
  var promises = [];
  return ModuleSetting.findAll({
    where: {
	  $or: [{creatorid: req.params.id}, {creatorid: 0}]
    }
  }).then(function(modules){
	  for(var i = 0; i < modules.length; i++){
			var module = {};
			module.name = modules[i].modulename;
			module.active = modules[i].active;
			module.UCHandle = modules[i].UCHandle;
		  var infoids = JSON.parse(modules[i].infoids);
		  var tempids = [];
		  for(var j = 0; j < infoids.length; j++){
			var promise = Infotype.find({
				where: {
					infoid : infoids[j]
				}
			}).then(function(info){
				/*tempids.push(info.infoname);
				if(infoids.length-1 == j){
					modules.push(module);
				}*/
			})
			
			promises.push(promise);
		  }
	  }
  })
	return Sequelize.Promise.all(promises).then(function(){
		res.json(modules);
	})
}

// Creates a new ModuleSetting in the DB
export function create(req, res) {
	var entry = ModuleSetting.build();
	entry.setDataValue('infoids', JSON.stringify(req.body.infoids));
	entry.setDataValue('active', req.body.active);
	entry.setDataValue('creatorid', req.body.accessor);
	entry.setDataValue('UCHandle', req.body.UCHandle);
	return entry.save()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Upserts the given ModuleSetting in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }

  return ModuleSetting.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing ModuleSetting in the DB
export function patch(req, res) {
  req.body.infoids = JSON.stringify(req.body.infoids);
  if(req.body.moduleid) {
    delete req.body.moduleid;
  }
  return ModuleSetting.find({
    where: {
      moduleid: req.params.moduleid
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a ModuleSetting from the DB
export function destroy(req, res) {
  return ModuleSetting.find({
    where: {
      moduleid: req.params.moduleid
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
