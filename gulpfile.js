var jimp = require("gulp-jimp-resize");
var gulp = require('gulp');


gulp.task('images', function() {
	gulp.src('./originals/**/*.*')
	.pipe(jimp(['sm', 'md', 'squareV-sm', 'squareH-sm']))
	.pipe(gulp.dest('./resized/'));
});
		
