'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Basic', {
	personid: DataTypes.INTEGER,
	address: DataTypes.STRING
  });
};
