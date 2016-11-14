/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/requests              ->  index
 * POST    /api/requests              ->  create
 * GET     /api/requests/:id          ->  show
 * PUT     /api/requests/:id          ->  upsert
 * PATCH   /api/requests/:id          ->  patch
 * DELETE  /api/requests/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import {RequestLog} from '../../sqldb';
import {PreviousRequest} from '../../sqldb';
import {PendingRequest} from '../../sqldb';

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

// Gets a list of Requests
export function index(req, res) {

}

// Gets a single Request from the DB
export function show(req, res) {
	var basic = {name:"Kalle Karlsson", personid:"199007071415", UCHandle:false, info:[{title:"Income", value:"50000/Month", timestamp:"1/1/2015"},{title:"Address", value:"Sveavägen 12", timestamp:"1/1/2015"}], timestamp:"01/01/2016", purpose:"Check to buy a phone.", access:"approved", companystatus:"pending"};
	var html = "<div class='weak-border-bottom'><h4 class='textborderbottom'>Personal</h4><p class='fontbold'>Address</p><p>Sveavägen 12</p><p class='fontbold inlineblock'>Latest change: </p><p class='inlineblock'>1/1/2015</p><h4 class='textborderbottom'>Economical</h4><p class='fontbold'>Income</p><p>50 000 SEK/month</p><p class='fontbold inlineblock'>Latest change: </p><p class='inlineblock'>1/1/2015</p></div>";
	var history = [{actor:{name:"Media Markt", id:"3"}, info:["Address"], timestamp:"1/1/2015", access:"approved"}, {actor:{name:"Elgiganten", id:"4"}, info:["Address", "Income"], timestamp:"1/1/2015", access:"denied"}, {actor:{name:"Media Markt", id:"3"}, info:["Address", "Income"], timestamp:"1/1/2015", access:"approved"}];
	var data = {basic:basic, html:html, history:history};
	res.json(data);
}

// Creates a new Request in the DB
export function create(req, res) {
	var newRequest = RequestLog.build();
	console.log(req.body);
	newRequest.setDataValue('personid', req.body.id);
	newRequest.setDataValue('accessid', req.body.accessor);
	newRequest.setDataValue('purpose', req.body.purpose);
	newRequest.setDataValue('infoids', JSON.stringify(req.body.info));
	newRequest.setDataValue('pending', true);
	newRequest.setDataValue('allow', false);
	newRequest.setDataValue('price', req.body.price);
	console.log(newRequest);
  return newRequest.save()
	.then(function(request) {
	  res.json({ requestid:request.requestid });
	})
	.catch(console.log("BAD"));
}

// Upserts the given Request in the DB at the specified ID
export function upsert(req, res) {

}

// Updates an existing Request in the DB
export function patch(req, res) {

}

// Deletes a Request from the DB
export function destroy(req, res) {

}
