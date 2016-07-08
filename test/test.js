var expect = require('chai').expect;
var gulp = require('gulp');
var File = require('vinyl');
var count = require('gulp-count');
var fs = require('fs');
var gutil = require('gulp-util');

var should = require('chai').should();

var plugin = require('../');



function countStuff(){

	var count = 0;
	fs.readdir('./resized/', function(err, files) {
		count = files.length;
	})

	return count;
}

describe('gulp-jimp-resize', function(){
	it('should go fix itself', function(done){

		var testImage = new gutil.File({
			path: __dirname + '/originals/IMG_1743.jpg',
			contents: fs.readFileSync( __dirname + '/originals/IMG_1743.jpg')
		});
		
		
		this.timeout(20000);

		var myTest = plugin(['sm']);

		//console.log("testing");

		myTest.on('data', function(newImage){
			//make assertions
			var path = newImage.path;

			console.log(path);

			expect(path.to.equal('IMG_1743-sm.jpg'))
		});

		myTest.on('end', function(){
			//once the stream has ended
			done();
		});


		myTest.write(testImage); //returns true if chunk was buffered,
												//false if 

		//console.log(endStream);

		myTest.end();

		});


	// it('should return an stream of images', function() {
	// 	var returnStream = gulp.src("./originals/*.*")
	// 		.pipe(jimp(['sm', 'md']));
	// 	returnStream.should.be.an('object');
	// })

	// it('should return one image for each option', function() {

	// 	var options = ['sm', 'md'];


	// 	gulpFile();

	// 	var size = options.length;

	// 	var size2 = countStuff();

	// 	size.should.equal(size2);


	// })
})