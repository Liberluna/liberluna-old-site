const gulp = require('gulp');
const merge = require('merge-stream');
const sass = require('gulp-sass')(require('sass'));
const ejs = require('gulp-ejs');
const rename = require("gulp-rename");
const plumber = require("gulp-plumber");
const img64 = require('gulp-img64');
const typescript = require('gulp-typescript');
const minifyInline = require('gulp-minify-inline');
const htmlmin = require('gulp-htmlmin');
const uglify = require('gulp-uglify-es').default;
const sitemap = require('gulp-sitemap');

gulp.task('default',()=>{ 
  return merge(
    gulp.src('./src/**/*')
      .pipe(gulp.dest('./dist')),
    
    gulp.src('./src/**/*.scss')
      .pipe(plumber())
      .pipe(sass())
      .pipe(gulp.dest('./dist')),
    
    gulp.src('./src/**/*.ejs')
      .pipe(plumber())
      .pipe(ejs())
      .pipe(img64())
      .pipe(rename({extname: ".html"}))
      .pipe(minifyInline())
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest('./dist')),
    
    gulp.src('./src/**/*.js')
      .pipe(plumber())
      .pipe(uglify())
      .pipe(gulp.dest('./dist')),
    
    gulp.src('./src/**/*.ts')
      .pipe(typescript({
        lib:["es2021","DOM"],
        allowJs:true
      }))
      .pipe(uglify())
      .pipe(gulp.dest('./dist')),
    gulp.src('./dist/**/*.html',{
      read:false,
    }).pipe(sitemap({
      siteUrl:"https://liberluna.github.io",
    }))
    .pipe(gulp.dest("./dist")),
  )
});
