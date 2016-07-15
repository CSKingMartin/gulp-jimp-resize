var Jimp = require("jimp");
var through = require('through2');
var gutil = require('gulp-util');
var File = require('vinyl');
var PluginError = gutil.PluginError;
var resize = require('./resize.js');

const PLUGIN_NAME = "gulp-jimp-resize";

var newImages = [];

function throwThatErrorOnTheGround(err) {
	throw err;
}

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
				return throwThatErrorOnTheGround( new PluginError(PLUGIN_NAME, 'test'));
			});
	});
}

module.exports = gulpJimpResize;