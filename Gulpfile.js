var gulp = require('gulp');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var debug = require('gulp-debug');
var livereload = require('gulp-livereload');
var order = require('gulp-order');
var merge = require('merge-stream');
var env = 'prod';

var appRootPath = 'assets/app/';

var paths = {
    app: {
        js_head: [
            'assets/vendor/modernizr/modernizr.js',
            'assets/vendor/lazysizes/lazysizes.min.js'
        ],
        js: [
            'assets/vendor/jquery/dist/jquery.min.js',
            'assets/vendor/jquery.easing/js/jquery.easing.min.js',
            'assets/vendor/bootstrap/dist/js/bootstrap.min.js',
            'assets/vendor/scrollreveal/dist/scrollreveal.min.js',
            'assets/vendor/classie/classie.js',
            'assets/vendor/wow/dist/wow.min.js',
            'public/js/script.js'
        ],
        js_ie: [
            'web/assets/vendor/html5shiv/dist/html5shiv.js',
            'web/assets/vendor/respond/src/respond.js'
        ],
        img: [
            'public/images/**'
        ],
        css: [
            'assets/vendor/bootstrap/dist/css/bootstrap.css',
            'assets/vendor/font-awesome/css/font-awesome.min.css',
            'assets/vendor/flag-icon-css/css/flag-icon.min.css',
            'public/css/main.css',
            'assets/vendor/wow/css/libs/animate.css'
        ],
        fonts: [
            'public/fonts/**',
            'assets/vendor/font-awesome/fonts/**',
            'assets/vendor/bootstrap/fonts/**'
        ],
        flags: [
            'assets/vendor/flag-icon-css/flags/**'
        ]
    }
};

gulp.task('app-js', function () {
    return gulp.src(paths.app.js)
        .pipe(concat('app.js'))
        .pipe(gulpif(env === 'prod', uglify()))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(appRootPath + 'js/'))
    ;
});

gulp.task('app-js-head', function () {
    return gulp.src(paths.app.js_head)
        .pipe(concat('app_head.js'))
        .pipe(gulpif(env === 'prod', uglify()))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(appRootPath + 'js/'))
        ;
});

gulp.task('app-js-ie', function () {
    return gulp.src(paths.app.js_head)
        .pipe(concat('app_ie.js'))
        .pipe(gulpif(env === 'prod', uglify()))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(appRootPath + 'js/'))
        ;
});

gulp.task('app-css', function() {
    return gulp.src(paths.app.css)
        .pipe(concat('style.css'))
        .pipe(gulpif(env === 'prod', uglifycss()))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(appRootPath + 'css/'))
        ;
});

gulp.task('app-img', function() {
    return gulp.src(paths.app.img)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(appRootPath + 'img/'))
    ;
});
gulp.task('app-fonts', function() {
    return gulp.src(paths.app.fonts)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(appRootPath + 'fonts/'))
        ;
});

gulp.task('app-flags', function() {
    return gulp.src(paths.app.flags)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(appRootPath + 'flags/'))
        ;
});

gulp.task('app-watch', function() {
    livereload.listen();

    gulp.watch(paths.app.js, ['app-js']);
    gulp.watch(paths.app.js_head, ['app-js-head']);
    gulp.watch(paths.app.js_ie, ['app-js-ie']);
    gulp.watch(paths.app.css, ['app-css']);
    gulp.watch(paths.app.img, ['app-img']);
    gulp.watch(paths.app.fonts, ['app-fonts']);
});

gulp.task('default', ['app-js', 'app-js-head', 'app-js-ie', 'app-css', 'app-fonts', 'app-flags', 'app-img']);
gulp.task('watch', ['default', 'app-watch']);
