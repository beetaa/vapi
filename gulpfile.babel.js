'use strict';

import gulp from 'gulp';
import babel from 'gulp-babel';

const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const changed = require('gulp-changed');

// 不要使用绝对路径或以点开始的路径
// 否则 gulp.watch 不监视新增或删除的文件
// 注意：gulp.watch 不支持文件夹，不支持空文件夹增加文件
const ES6_SRC = 'src/*.js';
const ES6_DEST = 'dist/api';

gulp.task('babel_and_min', () => {
  return gulp.src(ES6_SRC)
      .pipe(babel())
      .pipe(changed(ES6_DEST))
      // .pipe(gulp.dest('./dist/js'))
      // .pipe(rename({suffix: '.min'}))
      // .pipe(uglify())
      .pipe(gulp.dest(ES6_DEST));
});

gulp.task('watch', function() {
  var es6_watcher = gulp.watch(ES6_SRC, ['babel_and_min']);
  es6_watcher.on('change', function(event) {
    console.log('ES6 File ' + event.path + ' was ' + event.type + '!');
  });
});

//Init the database
gulp.task('init', function() {
  
});