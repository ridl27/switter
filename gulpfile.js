// самі створюємо цей файл

var gulp = require('gulp'),
	browserSync = require('browser-sync'),  // наш сервер
	less = require('gulp-less'),
	notify = require('gulp-notify'),     // показує ошибкі, якшо є
	plumber = require('gulp-plumber');   // красиво виводить ці ошибкі і продовжує (!) виконувати наступні таски

gulp.task ('server', ['less'], function(){    // логіка така: спочатку загружає залежності (у нас це ['less']), а потім виконується сам таск ('server')
	browserSync.init({
		server: { baseDir: 'app/' }
	});
	gulp.watch('app/**/*.html').on('change', browserSync.reload);
	gulp.watch('app/**/*.js').on('change', browserSync.reload);
	gulp.watch('app/less/**/*.less', ['less']);   // коли змінюються файли .less - тоді запускається таск ['less']
});

gulp.task ('less', function(){
	return gulp.src('app/less/**/*.less')
		.pipe(plumber({
			errorHandler: notify.onError(function(err){
				return {
					title: 'Styles',
					sound: false,
					message: err.message
				}
			})
		}))
		.pipe(less())
		.pipe(gulp.dest('app/css/'))
		.pipe(browserSync.stream())
});

gulp.task ('default', ['server']);   // залежності можна писати через кому в квадратних дужках

// в консолі можна писати просто команду 'gulp' - буде запускатися дефолтний таск. якшо ж треба тільки конкретний таск, то: 'gulp назва_таска'. наприклад, 'gulp less'  