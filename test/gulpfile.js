var jimp = require("../");
var gulp = require('gulp');


gulp.task('images', function() {
	gulp.src('./originals/**/*.*')
	.pipe(jimp(['lg', 'md', 'sm', 'square']))
	.pipe(gulp.dest('./resized/'));
});
		
