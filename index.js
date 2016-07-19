var Jimp = require("jimp");
var through = require('through2');
var gutil = require('gulp-util');
var File = require('vinyl');
var PluginError = gutil.PluginError;
var resize = require('./resize.js');
var Promise = require('bluebird');

const PLUGIN_NAME = "gulp-jimp-resize";

var newImages = [];

function gulpJimpResize(options) {
	if (!options) {
		throw new PluginError(PLUGIN_NAME, 'Missing options!');
	}
	return through.obj(function(file, enc, cb) { //transform function
		if(!file){
			throw new PluginError(PLUGIN_NAME, 'No files passed!');
			return cb(null, file);
		}

		Promise.all(options.sizes.map(opt => resize(file, opt)))
			.then(imageArray => {
				imageArray.forEach(image => this.push(image)) 
				cb();
			})
			.catch(err => {
			    throw new PluginError(PLUGIN_NAME, err.message);
			});
	});
}

module.exports = gulpJimpResize;