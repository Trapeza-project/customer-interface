'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Actor', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    info: DataTypes.STRING
  });
}
