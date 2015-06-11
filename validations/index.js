var fs = require('fs');
var validate = {};

fs.readdirSync(__dirname).forEach(function(file) {
	if (file == "index.js") return;
	var name = file.substr(0, file.indexOf('.'))
	validate[name] = require('./' + file);
});

module.exports = validate;