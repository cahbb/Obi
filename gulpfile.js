'use strict'

var gulp = require('gulp'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass'),
  cleanCSS = require('gulp-clean-css'),
  rimraf = require('gulp-rimraf'),
  autoprefixer = require('gulp-autoprefixer')

/*========================================
  SASS-CSS
========================================*/

gulp.task('css', function() {
  return gulp.src('src/scss/obi.scss')
    .pipe(sass())
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('src/css'))
    .pipe(cleanCSS())
    .pipe(rename('obi.min.css'))
    .pipe(gulp.dest('src/css'))
})


/*========================================
  TASKS
========================================*/

gulp.task('watch', function() {
    gulp.watch('src/scss/**/*.scss', ['css'])
})

gulp.task('clean', function() {
  return gulp.src(['src/css/*'], { read: false })
    .pipe(rimraf())
})

gulp.task('build', ['css'])

gulp.task('default', ['clean'], function() {
    gulp.start('build')
})