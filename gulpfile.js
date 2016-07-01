var jimp = require("gulp-jimp-resize");
var glob = require("glob");
var gulp = require('gulp');
var debug = require('gulp-debug');



gulp.task('images', function() {
	gulp.src('./test/**.*')
	.pipe(debug())
	.pipe(jimp(['lg', 'md']))
	.pipe(gulp.dest('resized'));
});
		
		