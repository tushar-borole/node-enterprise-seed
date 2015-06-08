var fs = require('fs');
var route = {};

fs.readdirSync(__dirname).forEach(function(file) {
	if (file == "index.js") return;
	var name = file.substr(0, file.indexOf('.'));
    console.log(file)
	route[name] = require('./' + file);
});

module.exports = route;
