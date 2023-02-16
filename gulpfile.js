const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const ejs = require('gulp-ejs');
const rename = require("gulp-rename");
const plumber = require("gulp-plumber");
const img64 = require('gulp-img64');
const typescript = require('gulp-typescript');
const minifyInline = require('gulp-minify-inline');
const htmlmin = require('gulp-htmlmin');

gulp.task('default',()=>{ 
  gulp.src('./src/**/*')
    .pipe(gulp.dest('./dist'))
  gulp.src('./src/**/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('./dist'));
  gulp.src('./src/**/*.ejs')
    .pipe(plumber())
    .pipe(ejs())
    .pipe(img64())
    .pipe(rename({extname: ".html"}))
    .pipe(minifyInline())
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./dist'));
  gulp.src('./src/**/*.js')
    .pipe(plumber())
    .pipe(gulp.dest('./dist'));
  gulp.src('./src/**/*.ts')
    .pipe(typescript())
    .pipe(gulp.dest('./dist'));
});
