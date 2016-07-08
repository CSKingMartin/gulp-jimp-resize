var jimp = require("../");
var gulp = require('gulp');
var count = require('gulp-count');

gulp.task('images', function() {
	return gulp.src('./originals/**/*.*')
	.pipe(jimp([
		{"suffix": "-custom", "dimension": 1000, "square": true}, //custom entry

		'md', 'sm', 'square', //examples of defaults

		{"suffix": "-custom2", "dimension": 500, "square": false}]))
	.pipe(gulp.dest('./resized/'));
});
		
