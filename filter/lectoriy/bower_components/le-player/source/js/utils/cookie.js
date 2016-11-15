'use strict';
/**
 * @file cookie-control.js
 *
 * @clas Cookie
 */
class Cookie {
	/**
	 * @public
	 *
	 * @param {String} name Name of cookie
	 * @param {String} [dflt] Return default value if this field is empty
	 *
	 */
	static get (name, dflt) {
		var cookies = document.cookie.split(';');
		for (let i in cookies) {
			var d = cookies[ i ].trim().split('=');
			if (d[ 0 ] == 'leplayer_' + name)
				return d[ 1 ];
		}
		return dflt;
	};

	/**
	 * @public
	 *
	 * @param {String} name Key
	 * @param {String} value Value
	 */
	static set (name, value) {
		var d = new Date();
		d.setDate(d.year + 1);
		document.cookie = 'leplayer_' + name + '=' + value + ';expires=' + d.toString();
	};
}

export default Cookie;
