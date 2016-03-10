var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var zip = require('gulp-zip');

gulp.task('default', function() {
	gulp.src('src/diningin.tweaks.js')
	.pipe(uglify({preserveComments: "some"}))
	.pipe(rename({
		suffix: '.min'
	}))
	.pipe(gulp.dest('src'));

	return gulp.src(['**', '!./node_modules/', '!./node_modules/**', '!./dist/', '!./dist/**'])
    .pipe(zip('diningin.tweaks.zip'))
	.pipe(gulp.dest('dist'));
});