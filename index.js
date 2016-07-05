var Jimp = require("jimp");
var through = require('through2');
var gutil = require('gulp-util');
var File = require('vinyl');
var fs = require('fs');
var PluginError = gutil.PluginError;

const PLUGIN_NAME = "gulp-jimp-resize";

var defaults =
	{
		"xl": {
			"width": 1500,
			"suffix": "-xl",
			"crop": false,
			"horizontal": false
			},
		"lg": {
			"width": 1220,
			"suffix": "-lg",
			"crop": false,
			"horizontal": false
			},
		"md": {
			"width": 960,
			"suffix": "-md",
			"crop": false,
			"horizontal": false
			},
		"sm": {
			"width": 480,
			"suffix": "-sm",
			"crop": false,
			"horizontal": false
			},
		"xs": {
			"width": 320,
			"suffix": "-xs",
			"crop": false,
			"horizontal": false
			},
		"squareV": {
			"width": 500,
			"suffix": "-square",
			"crop": true,
			"horizontal": false
			},
		"squareV-sm": {
			"width": 320,
			"suffix": "-square-sm",
			"crop": true,
			"horizontal": false
			},
		"squareH": {
			"width": 500,
			"suffix": "-square2",
			"crop": true,
			"horizontal": true
			},
		"squareH-sm": {
			"width": 320,
			"suffix": "-square2-sm",
			"crop": true,
			"horizontal": true
			}
	}

var newImages = [];

function goGoGadgetImageResize(path, filename, data, cb) {

	var width = data.width;
	var suffix = data.suffix;
	var crop = data.crop;
	var horizontal = data.horizontal;
	var name = path.substring(path.lastIndexOf('\\')+1, path.lastIndexOf('.')) + suffix + ".png";

	Jimp.read(path, function (err, image) {

		if (err) throw err;

		image.resize(width, Jimp.AUTO)
        .quality(100);

        if(crop == true) {
        	var center = (image.bitmap.width - width)/2;
 
        	if(horizontal == true) {
        		image.crop(center, 0, width, width);
        	}
        	else {
        		image.crop(0, center, width, width);
        	}
        }

        image.write('resized/' + name, function(err) {
         	if (err) {
         		console.log('write error:', err);
         	}
        }); 

       	image.getBuffer(Jimp.MIME_JPEG, function(err, buffer){
       		var alteredImage = new gutil.File({
       			path: name,
       			contents:buffer
       		});

       		newImages.push(alteredImage);

       		console.log("newImages has " + newImages.length + " images");

        });

        cb();
	});
};

function gulpJimpResize(options) {


	if (!options) {
		throw new PluginError(PLUGIN_NAME, 'Missing options entry!');
	}

	
	return through.obj(function(file, enc, next) { //stream where files will pass

		//newImages.push(file);

		if(file.isNull()){
			throw new PluginError(PLUGIN_NAME, 'No files detected!');
			return cb(null, file);
		}

		//console.log(file.contents);

		for(i = 0; i < options.length; i++){
			var param = options[i];
			var data = defaults[param];
			var path = file.path.toString();
			var name = file.relative.toString();

			
			function readOut() {
				console.log("test");
				console.log("finalImages: " + newImages);
				//this.push(file);
			}

			//console.log(goGoGadgetImageResize(path, name, data));

			goGoGadgetImageResize(path, name, data, readOut);
		}

		
		this.push(file);

		next();//allows us to apply our operation to multiple files. w/out cb, only deals with first globbed file

		
	}, function(flush) {
		console.log("i tried");
		for(i = 0; i < newImages.length; i++){
			this.push(newImages[i]);
			flush();
		}
	} //flush function

	);

	
}



module.exports = gulpJimpResize;


