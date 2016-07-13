# gulp-jimp-resize [![Build Status](https://travis-ci.org/CSKingMartin/gulp-jimp-resize.svg?branch=master)](https://travis-ci.org/CSKingMartin/gulp-jimp-resize)
Maniuplate images' size with few dependencies. Uses JIMP wrapped with gulp.

Inspired by the same functionality as gulp-jimp, which has open issues crucial to it's functionality. JIMP is a great, simple image processing library with 0 dependencies. This gulp plugin wraps JIMP functionality for gulp in an extremely simple way purely for resizing images ONLY. Resizes based on one dimension passed while keeping the aspect ratio of the original image, or can crop to a square image.

# install:
```
npm install --save-dev gulp-jimp-resize
```

# how to:
Usage is pretty simple. Pipe in a directory of images to the "gulp-jimp-resize" module, and then pipe it somewhere else as you wish (for minification, or to a new directory, etc). Each image will be resized to EACH option piped into the plugin. The example gulpfile below will produce 5 new images for every image (custom, md, sm, square, and custom2).

# example gulp file:
```js
var jimp = require("gulp-jimp-resize");
var gulp = require('gulp');

gulp.task('images', function() {
return gulp.src('./originals/**/*.*')
	.pipe(jimp([
		{"suffix": "-custom", "dimension": 1000, "square": true}, //custom entry
	
		'md', 'sm', 'square', //examples of defaults
	
		{"suffix": "-custom2", "dimension": 500, "square": false}]))
	.pipe(gulp.dest('./resized/'));

	.pipe(jimp({
		prefixAll: '',
		sizes: [
			{ suffix: '', width: 100, square: false },
			{ suffix: '', height: 100, square: false }
		]
	}))

	.pipe(jimp({
		sizes: [
		    {  },
			jimp.default.xl,
			jimp.default.md,
		]
	}))
});
		
```

#options:
gulp-jimp-resize supports custom options, and has structure for creation of defaults for quick access. The current defaults are located in the 'index.js' file of the module. These can be edited if desired. Each option passed has 3 parameters: the suffix -- which will be included in the name of resized image; the dimension -- which will become the size of the LARGEST side of the new resized image (this is to keep the aspect ratio intact); and the square property -- which will crop your image to a square whose dimensions are both equal to the "dimension" property.

The current defaults (located in the index.js folder) are placed below:
```js

var jimp = require('gulp-jimp-resize');
jimp.default =
	{
		"xl": {
			"width": 1500,
			"suffix": "-xl",
			"crop": false
		"lg": {
			"width": 1220,
			"suffix": "-lg",
			"crop": false
		"md": {
			"width": 960,
			"suffix": "-md",
			"crop": false
		"sm": {
			"width": 480,
			"suffix": "-sm",
			"crop": false
		"xs": {
			"width": 320,
			"suffix": "-xs",
			"crop": false
		"square": {
			"width": 500,
			"suffix": "-square",
			"crop": true
		"square-sm": {
			"width": 320,
			"suffix": "-square-sm",
			"crop": true
	}
```


#Licence
MIT
