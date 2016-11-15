'use strict';
/**
 * @file time.js
 *
 * @module time
 */

/**
 * Convert seconds to format string 'hh:mm:ss'
 *
 * @access public
 * @param {Number} seconds Seconds
 * @returns {String}
 */
export function secondsToTime (seconds) {
	var h = Math.floor(seconds / 3600);
	var m = Math.floor(seconds % 3600 / 60);
	var s = Math.floor(seconds % 3600 % 60);
	var out = '';
	if (h > 0)
		out = h + ':';
	if (m < 10)
		out += '0';
	out += m + ':';
	if (s < 10)
		out += '0';
	out += s;
	return out;
};
