var expect = require('chai').expect;
var gulp = require('gulp');
var File = require('vinyl');
var fs = require('fs');
var gutil = require('gulp-util');

var should = require('chai').should();

var plugin = require('../');

describe('Testing gulp-jimp-resize', function(){

	this.timeout(20000);

	var testImage = new gutil.File({
			path: __dirname + '/originals/IMG_1743.jpg',
			contents: fs.readFileSync( __dirname + '/originals/IMG_1743.jpg')
		});

	var endImages = [];

	it('should return a stream', function(done) {
		var test = plugin({sizes: [
			{"suffix": "so", "width": 960},
			{"suffix": "rad", "height": 500}
		]});

		test.on('data', function(newImage){
			//make assertions
			console.log(newImage.naturalWidth);
		});

		test.on('end', function(){
			//once the stream has ended
			done();
		});

		var endStream = test.write(testImage);
	
		expect(endStream).to.be.true;
	
		test.end();
	});

	describe('should save with correct name', function() {
		it('test one', function(done) {
			var test = plugin({sizes: [
			{"suffix": "youre", "width": 960}
		]});


			var name = '';

			test.on('data', function(newImage){
			//make assertions
				var path = newImage.path;
				name = path.substring(path.lastIndexOf('/')+1);
			});

			test.on('end', function(){
				//once the stream has ended
				expect(name).to.equal("IMG_1743-youre.jpg");
				done();
			});

			test.write(testImage);
		
			test.end();

		});

		it('test two', function(done) {
			var test = plugin({sizes: [
			{"suffix": "cool", "width": 960}
		]});

			var name = '';

			test.on('data', function(newImage){
			//make assertions
				var path = newImage.path;
				name = path.substring(path.lastIndexOf('/')+1);
			});

			test.on('end', function(){
				//once the stream has ended
				expect(name).to.equal("IMG_1743-cool.jpg");
				done();
			});

			test.write(testImage);
		
			test.end();

		});
	});

	it('should return one image for each option', function(done){

		var test = plugin({sizes: [
			{"suffix": "rad"},
			{"suffix": "test"},
			{"suffix": "dude"}
		]});


		test.on('data', function(newImage){
			//make assertions
			endImages.push(newImage);
	
		});
		test.on('end', function(){
			//once the stream has ended
			var count = endImages.length;
			expect(count).to.equal(3);

			done();
		});

		test.write(testImage);
	
		test.end();

	});

	describe("Error Messages:", function() {
		it('should throw error with no options', function(done) {
			expect(() => plugin()).to.throw('Missing options!');
			done();
		});

		
		
	});

})