'use strict'

var gulp = require('gulp')
var rename = require('gulp-rename')
var sass = require('gulp-sass')
var cleanCSS = require('gulp-clean-css')
var rimraf = require('gulp-rimraf')
var autoprefixer = require('gulp-autoprefixer')

/*========================================
  SASS-CSS
========================================*/

gulp.task('css', function() {
  return gulp.src('src/scss/obi/obi.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(cleanCSS())
    .pipe(rename('obi.min.css'))
    .pipe(gulp.dest('dist/css'))
})


/*========================================
  TASKS
========================================*/

gulp.task('watch', ['build'], function() {
  gulp.watch('src/scss/**/*.scss', ['css'])
})

gulp.task('clean', function() {
  return gulp.src(['dist'], { read: false })
    .pipe(rimraf())
})

gulp.task('build', ['css'])

gulp.task('default', ['clean'], function() {
  gulp.start('build')
})
