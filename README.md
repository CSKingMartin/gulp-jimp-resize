# gulp-jimp-resize [![Build Status](https://travis-ci.org/CSKingMartin/gulp-jimp-resize.svg?branch=master)](https://travis-ci.org/CSKingMartin/gulp-jimp-resize)
Maniuplate images' size with few dependencies. Uses JIMP wrapped with gulp.

Inspired by the same functionality as gulp-jimp, which has open issues crucial to it's functionality. JIMP is a great, simple image processing library with 0 dependencies. This gulp plugin wraps JIMP functionality for gulp in an extremely simple way purely for resizing images ONLY. Resizes based on: width or height (or both), and can crop to a square image.

# how to:
Usage is pretty simple. Pipe in a directory of images to the "gulp-jimp-resize" module, and then pipe it somewhere else as you wish (for minification, or to a new directory, etc).

# example gulp file:
```
var jimp = require("gulp-jimp-resize");
var gulp = require('gulp');

gulp.task('images', function() {
return gulp.src('./originals/**/*.*')
	.pipe(jimp([
		{"suffix": "-custom", "dimension": 1000, "square": true}, //custom entry
	
		'md', 'sm', 'square', //examples of defaults
	
		{"suffix": "-custom2", "dimension": 500, "square": false}]))
	.pipe(gulp.dest('./resized/'));
});
		
```

#options:
gulp-jimp-resize supports custom options, and has structure for creation of defaults for quick access. The current defaults are located in the 'index.js' file of the module. These can be edited if desired. 

The current defaults (located in the index.js folder) are placed below:
```
var defaults =
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
