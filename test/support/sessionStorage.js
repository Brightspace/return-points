'use strict';

module.exports = {
	_items: {},
	getItem: function( key ) {
		return this._items[key];
	},
	removeItem: function( key ) {
		delete this._items[key];
	},
	setItem: function( key, val ) {
		this._items[key] = val;
	}
};
