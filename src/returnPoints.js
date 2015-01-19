'use strict';

var localStorageKey = 'ReturnPoints';

module.exports = {

	get: function( key, defaultLocation ) {

		this._validateParam( key, 'key' );

		var me = this;
		var data = me._read();

		for( var i=data.length - 1; i > -1; i-- ) {
			if( data[i].key === key ) {
				var url = data[i].url;
				data = data.slice( 0, i );
				me._write( data );
				return url;
			}
		}

		return defaultLocation;

	},

	reset: function() {
		try {
			window.sessionStorage.removeItem( localStorageKey );
		} catch( e ) {}
	},

	set: function( key, location ) {

		this._validateParam( key, 'key' );
		this._validateParam( location, 'location' );

		var data = this._read();
		data.push( { key: key, url: location } );
		this._write( data );

	},

	_read: function() {

		var json;
		try {
			json = window.sessionStorage.getItem( localStorageKey );
		} catch( e ) {
			return [];
		}

		if( json === undefined || json === null || json.length === 0 ) {
			return [];
		}

		var data = JSON.parse(json);
		return data;

	},

	_write: function( data ) {

		var json = JSON.stringify( data );

		try {
			window.sessionStorage.setItem( localStorageKey, json );
		} catch( e ) {}

	},

	_validateParam: function( param, name ) {
		if( param === undefined || param === null || param.length === 0 ) {
			throw new TypeError('Invalid ' + name);
		}
	}

};
