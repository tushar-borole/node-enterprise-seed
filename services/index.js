var fs = require('fs');
var service = {};

fs.readdirSync(__dirname).forEach(function(file) {
	if (file == "index.js") return;
	var name = file.substr(0, file.indexOf('.'));
    console.log(file)
	service[name] = require('./' + file);
});

module.exports = service;