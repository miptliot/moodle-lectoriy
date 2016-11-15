'use strict';
/**
 * @file ErrorDisplay.js
 */


import $ from 'jquery';
import Component from './Component';

/**
 * @param {Player} player Main player
 * @param {Object} [options]
 * @param {String} [options.imgUrl] path to poster image
 * @class Poster
 * @extends Component
 */
class Poster extends Component {

	constructor(player, options={}) {
		options = $.extend({}, {
			imgUrl : player.options.poster
		}, options);

		super(player, options);
	}

	/**
	 * @override
	 */
	createElement() {
		this.element = $('<div />')
			.css('background-image', `url("${this.options.imgUrl}")`)
			.addClass('leplayer-poster')
	}

}

export default Poster;
