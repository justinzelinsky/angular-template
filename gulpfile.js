'use strict';

const gulp = require('gulp');
const scss = require('gulp-scss');
const prefix = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const connect = require('gulp-connect')
const gulpFilter = require('gulp-filter');
const cleanCSS = require('gulp-clean-css');
const less = require('gulp-less');
const uglify = require('gulp-uglify');
const ngAnnotate = require('gulp-ng-annotate');
const util = require('gulp-util');
const templateCache = require('gulp-angular-templatecache');
const del = require('del');
const bowerFiles = require('main-bower-files');
const runSequence = require('run-sequence');

const jsFiles = './app/**/*.js';
const partialFiles = './app/partials/**/*.html';
const sassFiles = './assets/css/*.scss';

const jsFilter = gulpFilter('**/*.js', {
  restore: true
});
const lessFilter = gulpFilter('**/*.less', {
  restore: true
});

const config = {
  moduleName: 'app',
  PORT: 4000,
  production: !!util.env.production
}

gulp.task('connect', function() {
  connect.server({
    root: 'public',
    port: config.PORT
  });
});

gulp.task('javascript', function() {
  return gulp.src(jsFiles)
    .pipe(config.production ? ngAnnotate() : util.noop())
    .pipe(config.production ? uglify() : util.noop())
    .pipe(concat(config.production ? 'main.min.js' : 'main.js'))
    .pipe(gulp.dest('public'));
});

gulp.task('styles', function() {
  return gulp
    .src(sassFiles)
    .pipe(scss())
    .pipe(prefix())
    .pipe(config.production ? cleanCSS() : util.noop())
    .pipe(concat(config.production ? 'style.min.css' : 'style.css'))
    .pipe(gulp.dest('public'));
});

gulp.task('templates', function() {
  return gulp.src(partialFiles)
    .pipe(templateCache({
      module: config.moduleName
    }))
    .pipe(gulp.dest('app/templates'));
});

gulp.task('vendor', function() {
  return gulp
    .src(bowerFiles())
    .pipe(jsFilter)
    .pipe(uglify())
    .pipe(concat('vendor.min.js'))
    .pipe(jsFilter.restore)
    .pipe(lessFilter)
    .pipe(less())
    .pipe(concat('vendor.min.css'))
    .pipe(lessFilter.restore)
    .pipe(gulp.dest('public'));
});

gulp.task('watch', function() {
  gulp.watch(sassFiles, ['styles']);
  gulp.watch(jsFiles, ['javascript']);
  gulp.watch(partialFiles, function() {
    runSequence(['templates', 'concat-js']);
  });
});

gulp.task('build', function() {
  runSequence(['clean', 'vendor', 'styles', 'templates', 'javascript']);
});

gulp.task('clean', function() {
  return del(['public/*.js', 'public/*.css']);
});

gulp.task('default', ['build']);
