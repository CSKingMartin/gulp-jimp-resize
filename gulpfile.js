var jimp = require("gulp-jimp-resize");
var glob = require("glob");
var gulp = require('gulp');
var debug = require('gulp-debug');



gulp.task('images', function() {
	gulp.src('./test/*.jpg')
	.pipe(debug())
	.pipe(jimp(['lg', 'md', 'squareV-sm', 'sm']))
	.pipe(gulp.dest('./resized/'));
});
		
