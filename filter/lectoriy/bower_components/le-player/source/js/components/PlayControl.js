'use strict';
/**
 * @file PlayControl.js
 */

import $ from 'jquery';
import Control from './Control';

/**
 * @class PlayControl
 * @param {Player} player Main player
 * @extends Control
 */
class PlayControl extends Control {
	constructor (player, options={}) {
		options = $.extend({}, {
			iconName : 'play',
			title : 'Воспроизвести видео',
			className : 'play',
			name : 'play'
		}, options);
		super(player, options);

		this.player.on('play', (e) => {
			this.play();
		})

		this.player.on('pause', (e) => {
			this.pause();
		})
	}

	/**
	 * Pause the video
	 */
	pause () {
		this.icon.iconName = 'play';
		this.element.attr('title', this.options.title);
	}

	/**
	 * Play the video
	 */
	play () {
		this.icon.iconName = 'pause';
		this.element.attr('title', 'Поставить на паузу');
	}

	/**
	 * @override
	 */
	onClick(e) {
		//super.onClick(e);
		this.player.video.togglePlay();
	}
}

export default PlayControl;
