/**
 * Sequelize initialization module
 */

'use strict';

import config from '../config/environment';
import Sequelize from 'sequelize';

var db = {
  Sequelize,
  sequelize: new Sequelize(config.sequelize.uri, config.sequelize.options)
};

// Insert models below
db.Setting = db.sequelize.import('../api/setting/setting.model');
db.Infotype = db.sequelize.import('../api/infotype/infotype.model');
db.Actor = db.sequelize.import('../api/actor/actor.model');
db.RequestLog = db.sequelize.import('../api/request/requestlog.model');
db.Thing = db.sequelize.import('../api/thing/thing.model');
db.User = db.sequelize.import('../api/user/user.model');

module.exports = db;
