'use strict';

var expect = require('chai').expect,
	returnPoints = require('../'),
	sessionStorage = require('./support/sessionStorage');

var invalid = [undefined,null,''];

describe('return-points', function() {

	beforeEach( function() {
		global.window = {
			sessionStorage: sessionStorage
		};
	});

	afterEach(function() {
		returnPoints.reset();
	});

	describe('get', function() {

		invalid.forEach(function(key) {
			it('should throw TypeError on \'' + key + '\' key', function() {
				expect( function() {
					returnPoints.get(key);
				} ).to.throw(TypeError);
			});
		});

		it('should use defaultLocation if no entry', function() {
			var val = returnPoints.get('foo','bar');
			expect(val).to.equal('bar');
		});

		it('should return value that was set', function() {
			returnPoints.set('myKey','myVal');
			returnPoints.set('key2','val2');
			var val = returnPoints.get('myKey');
			expect(val).to.equal('myVal');
		});

		it('should remove value after it is asked for', function() {
			returnPoints.set('myKey', 'myVal');
			returnPoints.get('myKey');
			var val = returnPoints.get('myKey', 'default');
			expect(val).to.equal('default');
		});

		it('should return last added value when added multiple times', function() {
			returnPoints.set('myKey','val1');
			returnPoints.set('myKey','val2');
			var val = returnPoints.get('myKey');
			expect(val).to.equal('val2');
		});

	});

	describe('set', function() {

		invalid.forEach(function(key) {
			it('should throw TypeError on \'' + key + '\' key', function() {
				expect( function() {
					returnPoints.set(key,'val');
				} ).to.throw(TypeError);
			});
		});

		invalid.forEach(function(val) {
			it('should throw TypeError on \'' + val + '\' val', function() {
				expect( function() {
					returnPoints.set('key',val);
				} ).to.throw(TypeError);
			});
		});

		it('should set value specified', function() {
			returnPoints.set('key','val');
			var val = returnPoints.get('key');
			expect(val).to.equal('val');
		});

	});

	describe('reset', function() {

		it('should remove all data', function() {
			returnPoints.set('a','val1');
			returnPoints.reset();
			var val = returnPoints.get('a','default');
			expect(val).to.equal('default');
		});

	});

	describe('_read', function() {

		it('should return empty array if sessionStorage is broken', function() {
			global.window.sessionStorage.getItem = function() { throw 'oh no'; };
			var data = returnPoints._read();
			expect( data ).to.be.defined;
			expect( data.length ).to.equal(0);
		})
	});

});
