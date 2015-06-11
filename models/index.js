// This code is built by Sequelize No Changes Required. Only Update Database Details

var env       = process.env.NODE_ENV || "development";
var config    = require('../config/config.json')[env];
var fs        = require('fs')
  , path      = require('path')
  , Sequelize = require('sequelize')
  , lodash    = require('lodash')
  /** 	MySQL DB: todo
	*	MySQL Username: root
	*	MySQL Password: null or blank
	*/
  , sequelize = new Sequelize(config.database, config.username, config.password)
  , db        = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return ((file.indexOf('.') !== 0) && (file !== 'index.js') && (file.slice(-3) === '.js'));
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

module.exports = lodash.extend({
  sequelize: sequelize,
  Sequelize: Sequelize
}, db);

