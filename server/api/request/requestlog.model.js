'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Requestlog', {
	requestid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
	accessid: DataTypes.INTEGER,
	personid: DataTypes.INTEGER,
	infoids: { 
        type: DataTypes.STRING, 
    },
	pending: DataTypes.BOOLEAN,
	allow: DataTypes.BOOLEAN,
	timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
	purpose: DataTypes.STRING,
	price: DataTypes.DOUBLE
  });
}