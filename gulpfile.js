"use strict";

var gulp = require("gulp"),
  autoprefixer = require("autoprefixer"),
  cssnano = require("cssnano"),
  postcss = require("gulp-postcss"),
  stylelint = require("stylelint"),
  sass = require("gulp-sass"),
  syntax_scss = require("postcss-scss"),
  reporter = require("postcss-reporter"),
  rigger = require("gulp-rigger"),
  imagemin = require("gulp-imagemin"),
  rimraf = require("rimraf"),
  browserSync = require("browser-sync"),
  styleLintConfig = require("./.stylelintrc"),
  reload = browserSync.reload;

var path = {
  build: {
    //Тут мы укажем куда складывать готовые после сборки файлы
    html: "build/",
    js: "build/js/",
    css: "build/css/",
    img: "build/img/"
  },
  src: {
    //Пути откуда брать исходники
    html: "src/*.html", //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
    js: "src/js/main.js", //В стилях и скриптах нам понадобятся только main файлы
    style: "src/css/main.scss",
    img: "src/img/**/*.*" //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
  },
  watch: {
    //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
    html: "src/**/*.html",
    js: "src/js/**/*.js",
    style: "src/css/**/*.scss",
    img: "src/img/**/*.*"
  },
  clean: "./build"
};

var config = {
  server: {
    baseDir: "./build"
  },
  host: "localhost",
  port: 3000
};

gulp.task("html:build", function() {
  return gulp
    .src(path.src.html) //Выберем файлы по нужному пути
    .pipe(rigger()) //Прогоним через rigger
    .pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build
    .pipe(reload({ stream: true })); //И перезагрузим наш сервер для обновлений
});

gulp.task("js:build", function() {
  return gulp
    .src(path.src.js) //Найдем наш main файл
    .pipe(rigger()) //Прогоним через rigger
    .pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
    .pipe(reload({ stream: true })); //И перезагрузим сервер
});

gulp.task("style:build", function() {
  var plugins = [autoprefixer(), cssnano()];
  var processors = [
    stylelint(styleLintConfig),
    reporter({
      clearMessages: true,
      throwError: true
    })
  ];
  return gulp
    .src(path.src.style) //Выберем наш main.scss
    .pipe(postcss(processors, { syntax: syntax_scss }))
    .pipe(sass())
    .pipe(postcss(plugins))
    .pipe(gulp.dest(path.build.css)) //И в build
    .pipe(reload({ stream: true }));
});

gulp.task("image:build", function() {
  return gulp
    .src(path.src.img) //Выберем наши картинки
    .pipe(
      imagemin({
        //Сожмем их
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        interlaced: true
      })
    )
    .pipe(gulp.dest(path.build.img)) //И бросим в build
    .pipe(reload({ stream: true }));
});
gulp.task(
  "build",
  gulp.series("html:build", "js:build", "style:build", "image:build")
);
gulp.task("watch", function() {
  gulp.watch(path.watch.html, gulp.series("html:build"));
  gulp.watch(path.watch.style, gulp.series("style:build"));
  gulp.watch(path.watch.js, gulp.series("js:build"));
  gulp.watch(path.watch.img, gulp.series("image:build"));
});

gulp.task("webserver", function() {
  browserSync(config);
});

gulp.task("clean", function(cb) {
  rimraf(path.clean, cb);
});
gulp.task("default", gulp.parallel("build", "webserver", "watch"));
