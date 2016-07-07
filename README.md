# gulp-jimp-resize
Maniuplate images' size with few dependencies. Uses JIMP wrapped with gulp.

Inspired by the same functionality as gulp-jimp, which has open issues crucial to it's functionality. JIMP is a great, simple image processing library with 0 dependencies. This gulp plugin wraps JIMP functionality for gulp in an extremely simple way purely for resizing images ONLY. Resizes based on: width or height (or both), and can crop to a square image.

# how to:
Usage is pretty simple. Pipe in a directory of images to the "gulp-jimp-resize" module, and then pipe it somewhere else as you wish (for minification, or to a new directory, etc).

# example gulp file:
```
var jimp = require("gulp-jimp-resize");
var gulp = require('gulp');


gulp.task('images', function() {
	gulp.src('./originals/**/*.*')
	.pipe(jimp(['sm', 'md', 'squareV-sm', 'squareH-sm']))
	.pipe(gulp.dest('./resized/'));
});
```

#options:
gulp-jimp-resize currently only supports options described inside of the index.js folder. If you install gulp-jimp-resize and disagree with the defaults, you can change them yourself. Future patches will add the ability to pass your own parameters for custom sizes from the gulpfile. 

#current options:
The current options (located in the index.js folder) are placed below. There are separate options for cropping to squares (the 'H' and 'V' varieties). This is for images that are horizontal (long) and vertical (tall) respective to their matching letters. There is currently a bug where for both options it will crop for vertical (tall) images.
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
