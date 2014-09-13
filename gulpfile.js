'use strict';

var gulp = require('gulp'),
	browserify = require('browserify'),
	src = require('vinyl-source-stream'),
	plugins = require('gulp-load-plugins')();

gulp.task('hint', function () {
	return gulp.src(['./app/scripts/**/*.js', './api/**/*.js'])
		.pipe(plugins.jshint())
		.pipe(plugins.jshint.reporter('jshint-stylish'));
});

gulp.task('scripts', function () {
	return browserify('./app/scripts/main.js')
		.bundle()
		.pipe(src('main.js'))
		// .pipe(plugins.streamify(plugins.uglify())) // Slow
		.pipe(gulp.dest('./public/'));
});

gulp.task('styles', function () {
	return gulp.src('./app/styles/main.less')
		.pipe(plugins.less())
		// .pipe(plugins.csso()) // Slow
		.pipe(gulp.dest('./public/'));
});

gulp.task('watch', function () {
	gulp.watch('./app/scripts/**/*.{js,hbs}', ['hint', 'scripts']);
	gulp.watch('./app/styles/**/*.less', ['styles']);
});

gulp.task('default', ['hint', 'scripts', 'styles', 'watch']);