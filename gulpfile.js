'use strict';
 
const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const server = require('gulp-server-livereload');
const imagemin = require('gulp-imagemin');
const autoprefixer = require('gulp-autoprefixer');
const jshint = require('gulp-jshint');
const concat = require('gulp-concat-css');
sass.compiler = require('node-sass');
var uglify = require('gulp-uglify');

 
 
const styles = () => {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(concat())    
    .pipe(autoprefixer({
      cascade: true
    }))
    .pipe(gulp.dest('./dist/css'))
}
const html = () => {
  return gulp.src('./src/**/*.html')
    .pipe(gulp.dest('./dist'));
}
const js = () => {
  return gulp.src('./src/js/**/*.js')
  .pipe(concat())
  .pipe(uglify())
    .pipe(gulp.dest('./dist/js'));
}
const lib = () => {
  return gulp.src('./src/lib/*.css')
    .pipe(gulp.dest('./dist/css'));
}
gulp.task('lib', function () {
  gulp.watch('./src/lib/**/*.css', lib);
});

gulp.task('styles', function () {
  gulp.watch('./src/scss/**/*.scss', styles);
});



gulp.task('html', function () {
  gulp.watch('./src/**/*.html', html);
});

gulp.task('imagemin', function () {
  gulp.src('./src/img/*')
        .pipe(imagemin({progressive: true}))
        .pipe(gulp.dest('./dist/img'))
});
gulp.task('webserver', function() {
  gulp.src('dist/')
    .pipe(server({
      livereload: true,
      defaultFile: 'index.html',
      directoryListing: false,
      open: true
    }));
});
//errors js
gulp.task('lint', function() {
  return gulp.src('./src/js/*.js')
    .pipe(jshint(
     { esnext:true}
    ))
    .pipe(jshint.reporter('default'));
});
gulp.task('js', function () {
  gulp.watch('./src/js/**/*.js', js)
});
//
gulp.task('default', gulp.series(gulp.parallel('imagemin','html', 'styles', 'webserver','js','lib')));
gulp.task('build', gulp.series(gulp.parallel(html,'lint')));
