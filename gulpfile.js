const gulp = require('gulp');
const scss = require('gulp-scss');
const prefix = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const del = require('del');

const sassFiles = './scss/*.scss';
const jsFiles = './js/**/*.js';

const vendorCssFiles = './vendor/css/**/*.css';
const vendorJsFiles = './vendor/js/**/*.js';


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
  return gulp
    .src(jsFiles)
    .pipe(concat('app.js'))
    .pipe(gulp.dest('public'));
});

gulp.task('watch', function() {
  gulp.watch(sassFiles, ['styles']);
  gulp.watch(jsFiles, ['concat-js']);
});

gulp.task('build', ['clean', 'styles', 'concat-js']);

gulp.task('default', ['build']);
