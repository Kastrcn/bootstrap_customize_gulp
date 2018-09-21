var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-csso');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var gulp = require('gulp');
var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');
var postcss = require('gulp-postcss');
var borwserSync = require('browser-sync').create();
var autoprefixer = require('autoprefixer');
var clean = require('gulp-clean');
var reload = borwserSync.reload;

gulp.task('build-theme', function () {
    return gulp.src(['src/scss/*.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer({
            browsers: [
                'Chrome >= 35',
                'Firefox >= 38',
                'Edge >= 12',
                'Explorer >= 10',
                'iOS >= 8',
                'Safari >= 8',
                'Android 2.3',
                'Android >= 4',
                'Opera >= 12'
            ]
        })]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css/'))
        .pipe(cleanCss())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist/css/')).pipe(reload({stream: true}))
});

gulp.task('watch', ['cp','build-theme'], function () {
    borwserSync.init({
        server: {
            baseDir: 'dist/'
        }
    });
    gulp.watch(['src/scss/*.scss'], ['build-theme']);
    gulp.watch(['src/*.html'], ['cp']);
});

gulp.task('default', ['build-theme'], function () {});

gulp.task('browser-sync', function () {
    gulp.watch('src/scss/**/*.scss', ['sassfile']);
    gulp.watch("*.html").on('change', reload);
});

gulp.task('sassfile', function () {
    return gulp.src('src/scss/**/build.scss')
        .pipe(sass().on('error', sass.logError)).pipe(gulp.dest('./dist/css'));
});
gulp.task('clean', function () {
    return gulp.src('dist', {read: true})
        .pipe(clean());
});
gulp.task('cp', function () {
    return gulp.src('./src/*.html')
        .pipe(gulp.dest('dist/')).pipe(reload({stream: true}));

});


gulp.task('css', function () {
    return gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist/css'))
});

gulp.task('js', function () {
    return gulp.src('client/javascript/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/js'))
});


