const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const watch = require('gulp-watch');
const batch = require('gulp-batch');
const sequence = require('run-sequence');
const del = require('del');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const size = require('gulp-size');
const connect = require('gulp-connect');
const sourcemaps = require('gulp-sourcemaps');
const newer = require('gulp-newer');
const JS = ['!systemjs/**/*.*', '!node_modules/**/*.*', '!dist/**/*.*', '!build/**/*.*', '*.js', '**/*.js'];

const ERROR_MESSAGE = {
    errorHandler: notify.onError("Error: <%= error.message %>")
};

gulp.task('js', () => {
    const s = size({title: 'JS -> ', pretty: true});
    return gulp.src(JS)
        .pipe(babel())
        .pipe(s)
        .pipe(newer('./build'))
        .pipe(plumber.stop())
        .pipe(gulp.dest('./build'))
});


gulp.task('watch', function () {
    watch(JS, batch(function (events, done) {
        gulp.start(['js'], done);
    }));
});

gulp.task('clean', () => {
    return del(['./build']);
});

gulp.task('connect', () => {
    connect.server({
        root: './',
        port: 9000,
        livereload: true
    });
});

gulp.task('dev', (done) => {
    sequence('clean', 'js', done);
});


gulp.task('default', (done) => {
    sequence('js', ['watch', 'connect'], done);
});
