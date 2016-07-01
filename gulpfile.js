var jimp = require("gulp-jimp");
var glob = require("glob");
var gulp = require('gulp');


gulp.task('images', function() {
	gulp.src('testImages/**/*.*')
	.pipe(jimp({
		
		'-sm': {
			resize: {height: 200}
		},
		'-md': {
			resize: {height: 400}
		},
		'-lg': {
			resize: {height: }
		}
	}))
	.pipe(resize({
		
	}))
	.pipe(gulp.dest('./newImages/'));
});