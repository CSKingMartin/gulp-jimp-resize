var expect = require('chai').expect;
var gulp = require('gulp');
var File = require('vinyl');
var fs = require('fs');
var gutil = require('gulp-util');
var Jimp = require('jimp');

var plugin = require('../');

var resizeyBit = require(".././resize.js");

describe('testing gulp-jimp-resize', function(){

	var testImage = new gutil.File({
			path: __dirname + './originals/IMG_1743.jpg',
			contents: fs.readFileSync( __dirname + '/originals/IMG_1743.jpg')
		});

	var testImage2 = new gutil.File({
		path: __dirname + './originals/zed.png',
		contents: fs.readFileSync( __dirname + '/originals/zed.png')
	})

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

	describe('jimpy bits', function() { //deals with the 'jimp' bits (resize.js)

		this.timeout(4000);

		var testImage = new gutil.File({
				path: __dirname + '/originals/IMG_1743.jpg',
				contents: fs.readFileSync( __dirname + '/originals/IMG_1743.jpg')
			});

		var testImage2 = new gutil.File({
			path: __dirname + '/originals/zed.png',
			contents: fs.readFileSync( __dirname + '/originals/zed.png')
		})

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
					{"suffix": "don't", "width": 200},
					{"suffix": "be-a", "height": 200},
					{"suffix": "square", "width": 200, "height": 200}
				]};

			it('test one - width', function(done) {

				resizeyBit(testImage, options.sizes[0])
				.then(function(res) {
					//console.log(res);

					var width;

					Jimp.read(res.contents, function (err, image) {
						if (err) {
							reject(err);
							return;
						}

						width = image.bitmap.width;

					})
					expect(width).to.equal(200);
					done();
				})
			})

			it('test two - height', function(done) {

				resizeyBit(testImage, options.sizes[1])
				.then(function(res) {
					//console.log(res);

					var height;

					Jimp.read(res.contents, function (err, image) {
						if (err) {
							reject(err);
							return;
						}

						height = image.bitmap.height;

					})
					expect(height).to.equal(200);
					done();
				})
			})

			it('test three - width+height', function(done) {

				resizeyBit(testImage, options.sizes[2])
				.then(function(res) {
					//console.log(res);

					var height;
					var width;

					Jimp.read(res.contents, function (err, image) {
						if (err) {
							reject(err);
							return;
						}

						width = image.bitmap.width;

						height = image.bitmap.height;

					})
					expect(height).to.equal(200);
					expect(width).to.equal(200);
					done();
				})		
			})
		})	

		// describe("Error Messages:", function() {
		// 	it('should throw warning when embiggening images', function(done) {
		// 		resizeyBit(testImage2, {"suffix": "tooBig", "width": 800});
		// 		expect("warning");
		// 		done();
		// 	});
		// });
	})
})