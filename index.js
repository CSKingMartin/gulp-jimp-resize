var Jimp = require("jimp");
var through = require('through2');
var gutil = require('gulp-util');
var File = require('vinyl');
var PluginError = gutil.PluginError;

const PLUGIN_NAME = "gulp-jimp-resize";

var newImages = [];

function goGoGadgetImageCrop (file, opt) {
	return new Promise(function(resolve, reject) {
		Jimp.read(file.contents, function (err, image) {
			if (err) {
				reject(err);
				return;
			}

			var center = 0;

			//CROP
    		if(crop == true) {
        		image.crop(center, 0, dim, dim);
        	}
		})
	})
};

function goGoGadgetImageResize (file, opt) {

	if(opt.width && opt.height && opt.preserveAspect == true){
		throw new PluginError(PLUGIN_NAME, 'You cannot preserve the aspect ratio while resizing the height and width');
	};

	var path = file.path;

	var suffix = "";

	if(opt.suffix) {
		var suffix = "-" + opt.suffix;
	}
	
	var name = path.substring(path.lastIndexOf('\\')+1, path.lastIndexOf('.')) + suffix + ".png";

	if(!opt.width && !opt.height) { //no resizing to be done
		return new gulp-util.File({
			path: name,
			contents: file.contents
		})
	}

	var result = new Promise(function(resolve, reject) {
		Jimp.read(file.contents, function (err, image) {
			if (err) {
				reject(err);
				return;
			}

			var width = Jimp.AUTO; var height = Jimp.AUTO;

			if((opt.width && opt.width > image.bitmap.width) || 
				(opt.height && opt.height > image.bitmap.height)) {
				gutil.log(PLUGIN_NAME, 'You are resizing an image to a larger size than the original');
			}

			if(opt.width) { width = opt.width; }

			if(opt.height) { height = opt.height; }
			
			image.resize(width, height).quality(100);
        	
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

	//crop here or separate?

	return result;
};


function gulpJimpResize(options) {
	if (!options) {
		throw new PluginError(PLUGIN_NAME, 'Missing options entry!');
	}
	return through.obj(function(file, enc, cb) { //transform function
		if(!file){
			throw new PluginError(PLUGIN_NAME, 'No files passed!');
			return cb(null, file);
		}

		Promise.all(options.sizes.map(opt => goGoGadgetImageResize(file, opt)))
			.then(imageArray => {
				imageArray.forEach(image => this.push(image)) 
				cb();
			});
	});
}

module.exports = gulpJimpResize;