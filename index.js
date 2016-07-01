var Jimp = require("jimp");
var glob = require("glob");

var images = glob.sync('./test/**/*.*');

var size = Object.keys(images).length;

console.log('preparing to process ' + size + ' images\n');

var array = ['squareH', 'sm', 'lg', 'md', 'squareV-sm'];

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


for (var key in images){
	var path = images[key];
	var filename = path.substring(path.lastIndexOf('/')+1, path.lastIndexOf('.'));
	//console.log(filename + ",");

	for(i = 0; i < array.length; i++){
		var param = array[i];

		var data = defaults[param];

		goGoGadgetRewrite(path, filename, data);
	}
}

function goGoGadgetImageResize(path, filename, data) {
	var width = data.width;
	var suffix = data.suffix;
	var crop = data.crop;
	var horizontal = data.horizontal;

	Jimp.read(path, function (err, image) {
		if (err) throw err;
	
		image.resize(width, Jimp.AUTO)
        .quality(60)

        if(crop == true) {
        	var center = (image.bitmap.width - width)/2;
 
        	if(horizontal == true) {
        		image.crop(center, 0, width, width)
        	}
        	else {
        		image.crop(0, center, width, width)
        	}

        }

        image.write(filename + suffix + ".png", function(err) {
         	if (err) {
         		console.log('write error:', err);
         	}
        }); 

	});
};




