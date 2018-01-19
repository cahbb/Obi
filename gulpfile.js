'use strict'
var gulp = require('gulp')
var rename = require('gulp-rename')
var sass = require('gulp-sass')
var rimraf = require('gulp-rimraf')
var postcss = require('gulp-postcss')
var autoprefixer = require('autoprefixer')
var cssnano = require('cssnano')

/*========================================
  SASS-CSS
========================================*/

gulp.task('css', function() {
  var plugins = [
    autoprefixer({browsers: ['last 2 versions','> 1%','safari 5','ie 8','ie 9','opera 12.1','ios 6','android 4']}),
    cssnano()
  ]

  return gulp.src('src/scss/obi/obi.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest('dist'))
    .pipe(postcss(plugins))
    .pipe(rename('obi.min.css'))
    .pipe(gulp.dest('dist'))
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
