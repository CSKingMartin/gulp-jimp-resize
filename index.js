var Jimp = require("jimp");
var through = require('through2');
var gutil = require('gulp-util');
var File = require('vinyl');
var PluginError = gutil.PluginError;

const PLUGIN_NAME = "gulp-jimp-resize";

var defaults =
	{
		"xl": {
			"width": 1500,
			"suffix": "-xl",
			"crop": false
			},
		"lg": {
			"width": 1220,
			"suffix": "-lg",
			"crop": false
			},
		"md": {
			"width": 960,
			"suffix": "-md",
			"crop": false
			},
		"sm": {
			"width": 480,
			"suffix": "-sm",
			"crop": false
			},
		"xs": {
			"width": 320,
			"suffix": "-xs",
			"crop": false
			},
		"square": {
			"width": 500,
			"suffix": "-square",
			"crop": true
			},
		"square-sm": {
			"width": 320,
			"suffix": "-square-sm",
			"crop": true
			},
	}

var newImages = [];

function process (file, option) {
	
	var side = option.width;
	var suffix = option.suffix;
	var crop = option.crop;
	var horizontal = option.horizontal;
	var path = file.path;

	var name = path.substring(path.lastIndexOf('\\')+1, path.lastIndexOf('.')) + suffix + ".png";

	return new Promise(function(resolve, reject) {
		Jimp.read(file.contents, function (err, image) {
			if (err) {
				reject(err);
				return;
			}

	        var center = 0;

	        //RESIZE
        	if(image.bitmap.width > image.bitmap.height) { //horizontal image
        		if(option == 'square' || 'square-sm'){
        			//square crop we crop to different dimensions
        			image.resize(Jimp.AUTO, side);
        		} else {
        			image.resize(side, Jimp.AUTO)
        		}
        		image.quality(100);
        		var center = (image.bitmap.width - side) / 2;
        	} 
        	else { 		// vertical image
        	 	if(option == 'square' || 'square-sm'){
        			image.resize(side, Jimp.AUTO);
        		} else {
        			image.resize(Jimp.AUTO, side)
        		}
		        image.quality(100);
        	}

       		//CROP
    		if(crop == true) {
        		
        		image.crop(center, 0, side, side);
        	}
    	
	       	var newImg = image.getBuffer(Jimp.MIME_JPEG, function(err, buffer){
				if (err) {
					reject(err);
					return;
				}

	       		resolve(new gutil.File({
	       			path: name,
	       			contents:buffer
	       		}));
	        });
		});
	})
};

function gulpJimpResize(options) {
	if (!options) {
		throw new PluginError(PLUGIN_NAME, 'Missing options entry!');
	}

	return through.obj(function(file, enc, cb) { //transform function
		if(file.isNull()){
			throw new PluginError(PLUGIN_NAME, 'No files passed!');
			return cb(null, file);
		}

		Promise.all(options.map(optName => process(file, defaults[optName])))
			.then(imageArray => {
				imageArray.forEach(image => this.push(image))
				cb();
			});
	});
}

module.exports = gulpJimpResize;


