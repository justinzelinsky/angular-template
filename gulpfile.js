var gulp = require('gulp');
var scss = require('gulp-scss');
var prefix = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var del = require('del');

var sassFiles = './scss/*.scss';
var jsFiles = './js/**/*.js';

gulp.task('clean', function() {
  return del(['public/app.js', 'public/style.css']);
});

gulp.task('styles', function() {
  return gulp
    .src(sassFiles)
    .pipe(scss())
    .pipe(prefix())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('public'));
});

gulp.task('concat-js', function() {
  return gulp.src(jsFiles)
    .pipe(concat('app.js'))
    .pipe(gulp.dest('public'));
});

gulp.task('watch', function() {
  gulp.watch(sassFiles, ['styles']);
  gulp.watch(jsFiles, ['concat-js']);
});

gulp.task('build', ['clean', 'styles', 'concat-js']);

gulp.task('default', ['build']);
