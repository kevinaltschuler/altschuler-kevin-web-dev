var gulp = require('gulp');

var less = require('gulp-less');
var path = require('path');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();

 
gulp.task('less', function () {
  return gulp.src('./public/**/less/**/*.less')
  	.pipe(concat('styles.css'))
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ],
      compress: true
    }))
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './public'
    },
  })
});

gulp.task('watch', ['browserSync', 'less'],  function(){
  gulp.watch('./public/**/less/**/*.less', ['less']);
});