# gulp-jimp-resize [![Build Status](https://travis-ci.org/CSKingMartin/gulp-jimp-resize.svg?branch=master)](https://travis-ci.org/CSKingMartin/gulp-jimp-resize)
Maniuplate images' size with few dependencies. Uses JIMP wrapped with gulp.

Inspired by the same functionality as gulp-jimp, which has open issues crucial to it's functionality. JIMP is a great, simple image processing library with 0 dependencies. This gulp plugin wraps JIMP functionality for gulp in an extremely simple way for resizing images.

# install:
```
npm install --save-dev gulp-jimp-resize
```

# how to:
Usage is pretty simple. Pipe in a directory of images to the "gulp-jimp-resize" module, and then pipe it somewhere else as you wish (for minification, or to a new directory, etc). Each image will be resized to EACH option piped into the plugin. The example gulpfile below will produce 3 new images for every image piped.

# example gulp file:
```js
var jimp = require("gulp-jimp-resize");
var gulp = require('gulp');

gulp.task('images', function() {
	return gulp.src(
		'./originals/**/*.{png,jpg,bmp}'
		)
	.pipe(jimp({
		sizes: [
			{"suffix": "md", "width": 960},
			{"suffix": "sm", "width": 480}
		]
	}))
	.pipe(gulp.dest('./resized/'));
});
		
```

#options:
gulp-jimp-resize takes an Object 'sizes'. Each element inside 'sizes' is produced from each image passed to the plugin. Each option has 3 optional attributes. Suffix denotes the added string to the name of the new image. Width and height are self explainitory. If only one of width or height is passed through, the plugin will keep the apsect ratio of the original image. These attributes are also optional (i.e, you can give a suffix only and rename the image).

#Licence
MIT
