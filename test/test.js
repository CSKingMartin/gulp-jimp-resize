var expect = require('chai').expect;
var assert = require('chai').assert;
var gulp = require('gulp');
var File = require('vinyl');
var fs = require('fs');
var gutil = require('gulp-util');
var Jimp = require('jimp');

var plugin = require('../index');

var resizeyBit = require('../resize');


function read(contents, fn, done) {
	Jimp.read(contents, function (err, image) {
		if (err) {
			done(err);
		}
		try {
			fn(image);
		} catch(e) {
			done(e);
			return;
		}
		done();
	});
}

var testImage = new gutil.File({
	path: __dirname + '/originals/trees.jpg',
	contents: fs.readFileSync( __dirname + '/originals/trees.jpg')
})

var testImage2 = new gutil.File({
	path: __dirname + '/originals/portrait.png',
	contents: fs.readFileSync( __dirname + '/originals/portrait.png')
})

var testText= new gutil.File({
	path: __dirname + '/originals/test.txt',
	contents: fs.readFileSync( __dirname + '/originals/test.txt')
})

var testGif= new gutil.File({
	path: __dirname + '/originals/haha.gif',
	contents: fs.readFileSync( __dirname + '/originals/haha.gif')
})

describe('testing gulp-jimp-resize', function(){

	var endImages = [];

	describe('plugin bits', function() { //deals with the gulp plugin bits
		it('should return a stream', function(done) {
			var test = plugin({sizes: [{"suffix": "mad skillz"}]}); //bracket hell, lol

			test.on('data', function(newImage){ //need this for some reason?

			});

			test.on('end', function(){
				done();
			});

			var endStream = test.write(testImage); //true when a stream is returned
		
			expect(endStream).to.be.true;
		
			test.end();
		});

		it('should return one image for each option', function(done){

			var test = plugin({sizes: [
				{"suffix": "rad"},
				{"suffix": "test"},
				{"suffix": "dude"}
			]});

			test.on('data', function(newImage){
				endImages.push(newImage);
			});

			test.on('end', function(){
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

	describe('jimpy bits', function() { //deals with the 'jimp' bits (resize.js)

		this.timeout(4000);

		describe('should save with correct name', function() {
			it('test one', function(done) {

				var originalName = testImage.path.substring(testImage.path.lastIndexOf('/')+1, testImage.path.lastIndexOf('.'));
				
				var extension = testImage.path.substring(testImage.path.lastIndexOf('.'));
			
				var options = {sizes: [
					{"suffix": "you're"},
					{"suffix": "so"},
					{"suffix": "rad"}
				]};

				Promise.all(options.sizes.map(opt => resizeyBit(testImage, opt)))
					.then(imageArray => {
						var index = 0;
						imageArray.forEach(image => {
							var path = image.path;
							var name = path.substring(path.lastIndexOf('/')+1);
							console.log("\t" + name);
							expect(name).to.equal(originalName + "-" + options.sizes[index].suffix + extension);
							index++;
						})
					})
					.catch(err => console.log(err));

				done();
			});

			it('test two', function(done) {
				var originalName = testImage2.path.substring(testImage2.path.lastIndexOf('/')+1, testImage2.path.lastIndexOf('.'));
				
				var extension = testImage2.path.substring(testImage2.path.lastIndexOf('.'));
			
				var options = {sizes: [
					{"suffix": "so"},
					{"suffix": "cool"}
				]};

				Promise.all(options.sizes.map(opt => resizeyBit(testImage2, opt)))
					.then(imageArray => {
						var index = 0;
						imageArray.forEach(image => {
							var path = image.path;
							var name = path.substring(path.lastIndexOf('/')+1);
							console.log("\t" + name);
							expect(name).to.equal(originalName + "-" + options.sizes[index].suffix + extension);
							index++;
						})
					})
					.catch(err => console.log(err));

				done();

			});
		});

		describe('should have correct dimensions', function() {

			var options = {sizes: [
					{"suffix": "don't", "width": 300},
					{"suffix": "be-a", "height": 300},
					{"suffix": "square", "width": 200, "height": 200}
				]};

			it('test one - width', function(done) {

				resizeyBit(testImage, options.sizes[0])
				.then(function(res) {
					//console.log(res);
					read(res.contents, function(image) {
						expect(image.bitmap.width).to.equal(300);
					}, done);
	
				})
				.catch(err => console.log(err))
			})

			it('test two - height', function(done) {


				resizeyBit(testImage, options.sizes[1])
				.then(function(res) {
					//console.log(res);
					read(res.contents, function(image) {
						expect(image.bitmap.height).to.equal(300);
					}, done);
	
				})
				.catch(err => console.log(err))

			})

			it('test three - width+height', function(done) {

				resizeyBit(testImage, options.sizes[2])
					.then(function(res) {
						read(res.contents, function(image) {
							expect(image.bitmap.width).to.equal(200);
							expect(image.bitmap.height).to.equal(200);
						}, done);

					})
					.catch(err => console.log(err))
			})

		})	

		describe("Error Messages:", function() {
			it('Bad file type with .txt', function(done) {

				resizeyBit(testText, {"suffix": "notAnImage", "width": 800})
				.then(function(res) {
					var err = "No error thrown!";
					done(err);
				}, function(rej) {
					console.log("\tThrows an Error-", rej.message);
					done();
				})
			});
			it('Bad file type with .gif', function(done) {

				resizeyBit(testGif, {"suffix": "notAnImage", "width": 800})
				.then(function(res) {
					var err = "No error thrown!";
					done(err);
				}, function(rej) {
					console.log("\tThrows an Error-", rej.message);
					done();
				})
			});
		});
	})
})