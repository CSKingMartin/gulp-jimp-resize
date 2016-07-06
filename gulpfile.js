var jimp = require("gulp-jimp-resize");
var glob = require("glob");
var gulp = require('gulp');
var debug = require('gulp-debug');



gulp.task('images', function() {
	gulp.src('./originals/**/*.*')
	.pipe(jimp(['sm', 'md', 'squareV-sm', 'squareH-sm']))
	.pipe(gulp.dest('./resized/'));
});
		
