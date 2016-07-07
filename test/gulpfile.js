var jimp = require("../");
var gulp = require('gulp');


gulp.task('images', function() {
	gulp.src('./originals/**/*.*')
	.pipe(jimp([
		{"suffix": "-custom", 
		"dimension": 1000, 
		"square": true}, 
		'md', 'sm', 'square', 
		{"suffix": "-custom2", 
		"dimension": 500, 
		"square": false}]))
	.pipe(gulp.dest('./resized/'));
});
		
