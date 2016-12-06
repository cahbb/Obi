'use strict'

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass'),
  cleanCSS = require('gulp-clean-css'),
  sourcemaps = require('gulp-sourcemaps'),
  rimraf = require('gulp-rimraf')


/*========================================
  JS
========================================*/

gulp.task('js', function() {
  return gulp.src('src/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('src/js/build'))
        .pipe(rename('app.min.js'))
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('src/js/build'));
})


/*========================================
  SASS-CSS
========================================*/

gulp.task('css', function() {
  return gulp.src('src/scss/app.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('src/css'))
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(cleanCSS())
        .pipe(rename('app.min.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('src/css'))
})


/*========================================
  TASKS
========================================*/

gulp.task('watch', function() {
    gulp.watch('src/scss/**/*.scss', ['css'])
    gulp.watch('src/js/*.js', ['js'])
})

gulp.task('clean', function() {
  return gulp.src(['src/js/build/*', 'src/css/*'], { read: false })
    .pipe(rimraf())
})

gulp.task('build', ['js', 'css'])

gulp.task('default', ['clean'], function() {
    gulp.start('build')
})