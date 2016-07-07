var Jimp = require("jimp");
var through = require('through2');
var gutil = require('gulp-util');
var File = require('vinyl');
var PluginError = gutil.PluginError;

const PLUGIN_NAME = "gulp-jimp-resize";

var defaults =
	{
		"xl": {
			"dimension": 1500,
			"suffix": "-xl",
			"square": false
			},
		"lg": {
			"dimension": 1220,
			"suffix": "-lg",
			"square": false
			},
		"md": {
			"dimension": 960,
			"suffix": "-md",
			"square": false
			},
		"sm": {
			"dimension": 480,
			"suffix": "-sm",
			"square": false
			},
		"xs": {
			"dimension": 320,
			"suffix": "-xs",
			"square": false
			},
		"square": {
			"dimension": 500,
			"suffix": "-square",
			"square": true
			},
		"square-sm": {
			"dimension": 320,
			"suffix": "-square-sm",
			"square": true
			},
	}

var newImages = [];

function process (file, opt) {

	//console.log(option)

	if(typeof opt == 'object'){
		var option = opt;
	} else {
		var option = defaults[opt];
	}

	console.log(option);

	
	var dim = option.dimension;
	var suffix = option.suffix;
	var crop = option.square;
	var horizontal = option.horizontal;
	var path = file.path;

	var name = path.substring(path.lastIndexOf('\\')+1, path.lastIndexOf('.')) + suffix + ".png";

	return new Promise(function(resolve, reject) {
		Jimp.read(file.contents, function (err, image) {
			if (err) {
				reject(err);
				return;
			}

			console.log("got here?");

	        var center = 0;

	        //RESIZE
        	if(image.bitmap.width > image.bitmap.height) { //horizontal image
        		if(option == 'square' || 'square-sm'){
        			//square crop we crop to different dimensions
        			image.resize(Jimp.AUTO, dim);
        		} else {
        			image.resize(dim, Jimp.AUTO)
        		}
        		image.quality(100);
        		var center = (image.bitmap.width - dim) / 2;
        	} 
        	else { 		// vertical image
        	 	if(option == 'square' || 'square-sm'){
        			image.resize(dim, Jimp.AUTO);
        		} else {
        			image.resize(Jimp.AUTO, dim)
        		}
		        image.quality(100);
        	}

       		//CROP
    		if(crop == true) {
        		
        		image.crop(center, 0, dim, dim);
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

		Promise.all(options.map(opt => process(file, opt)))
			.then(imageArray => {
				imageArray.forEach(image => this.push(image))
				cb();
			});
	});
}

module.exports = gulpJimpResize;


