const { src, dest, parallel } = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const terser = require('gulp-terser');
const htmlmin = require('gulp-htmlmin')
const minifyCSS = require('gulp-csso');
const concat = require('gulp-concat');

const Paths = {
    js: "src/js/*.js",

    css: [
        "src/*.css",
        // we bring in flatly from bootswatch
        "node_modules/bootswatch/dist/flatly/bootstrap.css"
    ], 

    html: "src/*.html"
};

function js() {
    return src(Paths.js)
        .pipe(sourcemaps.init())
            .pipe(terser())
            .pipe(concat('app.min.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build'));
}

function css() {
    return src(Paths.css)
            .pipe(minifyCSS())
            .pipe(dest('build'));
}

function html() {
    return src(Paths.html)
        .pipe(htmlmin(require('./htmlmin.json')))
        .pipe(dest('build'));
}

exports.js = js;
exports.css = css;
exports.html = html;

exports.default = parallel(js, css, html);