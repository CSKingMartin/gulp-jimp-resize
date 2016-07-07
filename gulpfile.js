var jimp = require("gulp-jimp-resize");
var gulp = require('gulp');


gulp.task('images', function() {
	gulp.src('./originals/**/*.*')
	.pipe(jimp(['square', 'square-sm']))
	.pipe(gulp.dest('./resized/'));
});
		
