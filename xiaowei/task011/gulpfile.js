var gulp = require('gulp');

var sass = require('gulp-sass'); //需要添加插件：install gulp-sass --save-dev


var browserSync = require('browser-sync'); //需要添加插件：npm i browser-sync --save-dev

var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer');


//编译sass任务
gulp.task('sass', function () {
    //练习路径
    return gulp.src('scss/*.scss')
        .pipe(sass()) // Converts Sass to CSS with gulp-sass
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});
//监听scss、html、js，有修改就刷新浏览器任务
gulp.task('watch', ['browserSync', 'sass','testAutoFx'], function () {
    //练习路径
    gulp.watch('scss/*.scss', ['sass']);
    gulp.watch('*.html', browserSync.reload);
    gulp.watch('js/**/*.js', browserSync.reload);
    gulp.watch('css/*.css',['testAutoFx']);
})
//刷新浏览器任务
gulp.task('browserSync', function () {
    browserSync({
        server: {
            //练习路径
            baseDir: 'D:/website/练习/ife2017/level01/task011', //根目录   
            index: 'task011.html' //同步的网页
        },
    })
})


 //添加前缀
gulp.task('testAutoFx', function () {
    gulp.src('css/task011.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0','ios_saf>=6.0'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove:true //是否去掉不必要的前缀 默认：true 
        }))
        .pipe(gulp.dest('css'));
});

