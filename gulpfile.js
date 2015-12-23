/*=====================================
=        Default Configuration        =
=====================================*/

// Please use config.js to override these selectively:

var config = {
  dest: 'dist/mobile/www',
  cordova: true,
  minify_images: false,
};


if (require('fs').existsSync('./config.js')) {
  var configFn = require('./config');
  configFn(config);
};

/*-----  End of Configuration  ------*/


/*========================================
=            Requiring stuffs            =
========================================*/

var gulp           = require('gulp'),
    seq            = require('run-sequence'),
    uglify         = require('gulp-uglify'),
    cssmin         = require('gulp-cssmin'),
    order          = require('gulp-order'),
    concat         = require('gulp-concat'),
    rimraf         = require('gulp-rimraf'),
    imagemin       = require('gulp-imagemin'),
    pngcrush       = require('imagemin-pngcrush'),
    replace        = require('gulp-replace'),
    streamqueue    = require('streamqueue'),
    rename         = require('gulp-rename'),
    path           = require('path');


/*================================================
=            Report Errors to Console            =
================================================*/

gulp.on('err', function(e) {
  console.log(e.err.stack);
});


/*=========================================
=            Clean dest folder            =
=========================================*/

gulp.task('clean', function (cb) {
  return gulp.src([
        path.join(config.dest, 'index.html'),
        path.join(config.dest, 'icon.png'),       
        path.join(config.dest, 'assets'),
        path.join(config.dest, 'css'),
        path.join(config.dest, 'js'),
        path.join(config.dest, 'res')
      ], { read: false })
     .pipe(rimraf());
});



/*=====================================
=            Minify images            =
=====================================*/

gulp.task('assets', function () {
  var stream = gulp.src('assets/**/*.png')
  
  if (config.minify_images) {
    stream = stream.pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngcrush()]
    }))
  };
  
  return stream.pipe(gulp.dest(path.join(config.dest, 'assets')));
});


gulp.task('fnt',function(){
  gulp.src(['assets/**/*.fnt'])
    .pipe(gulp.dest(path.join(config.dest, 'assets')));	
	
});

gulp.task('sounds',function(){
  gulp.src(['assets/**/*.ogg','assets/**/*.mp3'])
    .pipe(gulp.dest(path.join(config.dest, 'assets')));	
	
});


/*=================================================
=            Copy html files to dest              =
=================================================*/

gulp.task('html', function() {

  if (config.cordova) {
  var inject = [];
    inject.push('<script src="cordova.js"></script>');
    inject.push('<script src="js/app.min.js"></script>');
    gulp.src(['index.html'])
    .pipe(replace(/<!--mobile-->[\S\s]*<!--end-->/g, inject.join('\n    ')))
    .pipe(replace("app.css","app.min.css"))
    .pipe(gulp.dest(config.dest));
  } else
   gulp.src(['index.html']) .pipe(gulp.dest(config.dest));
});

/*=================================================
=            Copy i18n files to dest              =
=================================================*/
gulp.task('i18n',function(){
  gulp.src(['js/i18n/*.json'])
    .pipe(gulp.dest(path.join(config.dest, 'js/i18n')));	
});



/*======================================================================
=            Compile and minify  css                                   =
======================================================================*/

gulp.task('css', function () {
  gulp.src(['css/app.css'])
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(path.join(config.dest, 'css')));
});


/*====================================================================
=            Compile and minify js                                   =
====================================================================*/

gulp.task('js', function() {
      gulp.src([
      "js/lib/phaser.min.js",
      "js/boot.js",
      "js/preload.js",
      "js/introstate.js",
      "js/flapstate.js",
      "js/gameoverstate.js",
      "js/nubulustate.js", 
      "js/main.js",
      "js/ads.js"
           ])
    .pipe(concat('app.js'))
    .pipe(uglify()) 
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(path.join(config.dest, 'js')));
});


/*====================================
=            Default Task            =
====================================*/

gulp.task('default', function(done){
  var tasks = ['html', 'assets','fnt', 'sounds','css', 'js','i18n'];
  seq('clean', tasks, done);
});
