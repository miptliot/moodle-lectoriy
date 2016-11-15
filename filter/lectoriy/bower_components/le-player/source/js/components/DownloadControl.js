'use strict';
/**
 * @file DownloadControl.js
 *
 * Download control
 */

import $ from 'jquery';
import Control from './Control';
import Icon from './Icon';

/**
 * @param {Player} player Main player
 * @param {Object} [options]
 * @class DownloadControl
 * @exnteds Control
 */
class DownloadControl extends Control {
	constructor (player, options={}) {
		options = $.extend({
			title : 'Скачать видео',
			className : 'download',
			name : 'download'
		}, options);
		super(player, options);
		this.player.on('loadstart', this.onLoadStart.bind(this));
	}


	/**
	 * @override
	 */
	createElement() {
		// TODO: Доопределить этот метод, а не переопредлеить
		this.element = $('<a />')
			.attr({
				href : '',
				target : '_blank',
				download : true,
				title : this.options.title,
			})
			.addClass(this.buildCSSClass())
			.append(new Icon(this.player, { iconName : 'download' } ).element);
	}

	/**
	 * @override
	 */
	buildCSSClass() {
		return `${super.buildCSSClass()}`;
	}


	/**
	 * Setter of link field
	 * @public
	 * @param {String} value Path for video
	 */
	set link (value) {
		const parser = document.createElement('a');
		parser.href = value;
		let fileName = parser.pathname.split('/');
		fileName = fileName[fileName.length - 1];
		this.element.attr({
			'href' : value,
			download : fileName
		});
	}


	onLoadStart(e, data) {
		this.link = this.player.video.source.url
	}

}

export default DownloadControl;
