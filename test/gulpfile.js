var jimp = require("../");
var gulp = require('gulp');


gulp.task('images', function() {
	return gulp.src(
		'./originals/**/*.*'
		)
	.pipe(jimp({
		sizes: [
			{"suffix": "md", "width": 960},
			{"suffix": "sm", "width": 480}
		]
	}))
	.pipe(gulp.dest('./resized/'));
});
		
