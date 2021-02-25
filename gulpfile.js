const { watch, parallel, src, dest } = require('gulp'),
    sass = require('gulp-sass'),  // sass compiler
    autoprefixer = require('gulp-autoprefixer'),  // add vender prifix
    plumber = require('gulp-plumber');  // error handling

const compileSass = () =>
    src('src/sass/main.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(dest('assets/css/'));

const watchSass = () =>
    watch([
        'src/sass/*.scss'
    ], compileSass);
    
exports.default = parallel(compileSass, watchSass);