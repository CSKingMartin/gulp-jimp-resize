var expect = require('chai').expect;
var gulp = require('gulp');
var File = require('vinyl');
var fs = require('fs');
var gutil = require('gulp-util');
var probe = require('probe-image-size');

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
		var myTest = plugin(['sm']);

		myTest.on('data', function(newImage){
			//make assertions
		});

		myTest.on('end', function(){
			//once the stream has ended
			done();
		});

		var endStream = myTest.write(testImage);
	
		expect(endStream).to.be.true;
	
		myTest.end();
	});

	describe('should save with correct name', function() {
		it('test one (default)', function(done) {
			var test = plugin(['sm']);

			var path = '';

			test.on('data', function(newImage){
			//make assertions
				path = newImage.path;
			});

			test.on('end', function(){
				//once the stream has ended
				expect(path).to.equal("test/originals/IMG_1743-sm.png");
				done();
			});

			test.write(testImage);
		
			test.end();

		});

		it('test two (custom)', function(done) {
			var test = plugin([{"suffix": "-custom", "dimension": 1000, "square": true}]);

			var path = '';

			test.on('data', function(newImage){
			//make assertions
				path = newImage.path;
			});

			test.on('end', function(){
				//once the stream has ended
				expect(path).to.equal("test/originals/IMG_1743-custom.png");
				done();
			});

			test.write(testImage);
		
			test.end();

		});
	});

	it('should return one image for each option', function(done){

		var myTest = plugin(['sm', 'md', 'lg']);

		myTest.on('data', function(newImage){
			//make assertions
			endImages.push(newImage);
	
		});
		myTest.on('end', function(){
			//once the stream has ended
			var count = endImages.length;
			expect(count).to.equal(3);

			done();
		});

		myTest.write(testImage);
	
		myTest.end();

	});

	describe("Error Messages:", function() {
		it('should throw error with no options', function(done) {
			expect(() => plugin()).to.throw('Missing options entry!');
			done();
		});
		it('should error with no files passed', function(done) {
			var test = plugin(['sm', 'md']);

			expect(() => test.write('')).to.throw('No files passed!');
			done();
		});

		it('should error on non-existent defaults', function(done) {

			var test = plugin(['med']);

			expect(() => test.write(testImage)).to.throw("Default option doesn't exist");
			done();
		
		});

		it('should error on missing metadata', function(done) {
			var test = plugin([{"suffix": "-custom"}]);
	
			expect(() => test.write(testImage)).to.throw("Custom option missing metadata");
			done();
		})
		
	});

})