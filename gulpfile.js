'use strict';

const gulp = require('gulp');
const scss = require('gulp-scss');
const prefix = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const connect = require('gulp-connect')
const bowerFiles = require('main-bower-files');
const uglify = require('gulp-uglify');
const templateCache = require('gulp-angular-templatecache');
const del = require('del');
const runSequence = require('run-sequence');

const jsFiles = './app/**/*.js';
const partialFiles = './app/partials/**/*.html';
const sassFiles = './assets/css/*.scss';
const vendorCssFiles = './vendor/css/**/*.css';
const vendorJsFiles = './vendor/js/**/*.js';

const moduleName = 'app'; // This isn't optimal....

gulp.task('connect', function() {
  connect.server({
    root: 'public',
    port: 4000
  });
});

gulp.task('concat-js', function() {
  return gulp.src(jsFiles)
    .pipe(concat('main.js'))
    .pipe(gulp.dest('public'));
});

gulp.task('templates', function() {
  return gulp.src(partialFiles)
    .pipe(templateCache({
      module: moduleName
    }))
    .pipe(gulp.dest('app/templates'));
});

gulp.task('vendor-js', function() {
  return gulp
    .src(bowerFiles())
    .pipe(uglify())
    .pipe(concat('vendor.min.js'))
    .pipe(gulp.dest('public'));
});

gulp.task('vendor-css', function() {
  /* return gulp
    .src(vendorCssFiles)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('public')); */ // TODO Determine how to handle vendor css/sass
});

gulp.task('vendor', ['vendor-css', 'vendor-js']);

gulp.task('styles', function() {
  return gulp
    .src(sassFiles)
    .pipe(scss())
    .pipe(prefix())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('public'));
});

gulp.task('watch', function() {
  gulp.watch(sassFiles, ['styles']);
  gulp.watch(jsFiles, ['concat-js']);
  gulp.watch(partialFiles, function() {
    runSequence(['templates', 'concat-js']);
  });
});

gulp.task('build', function() {
  runSequence(['clean', 'vendor', 'styles', 'templates', 'concat-js']);
});

gulp.task('clean', function() {
  return del(['public/main.js', 'public/style.css', 'public/vendor.min.js']);
});

gulp.task('default', ['build']);
