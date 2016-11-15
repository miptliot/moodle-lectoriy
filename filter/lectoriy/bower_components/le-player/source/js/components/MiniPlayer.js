'use strict';
/**
 * @file MiniPlayer.js
 */

import $ from 'jquery';
import Component from './Component';
import ControlCollection from './ControlCollection';
import { secondsToTime, createEl } from '../utils';
import Icon from './Icon';

/**
 * @class MiniPlayer
 * @param {Player} player Main player
 * @param {Object} [options]
 * @extends Control
 */
class MiniPlayer extends Component {
	constructor (player, options ) {
		// Merge options
		options = $.extend({}, {
			visible : false,
		}, player.options.miniplayer, options);

		super(player, options);

		if(this.options.width != null) {
			console.warn('miniplayer.width is deprecated option. Now uses CSS for this')
		}

		if (!options.visible) {
			this.hide();
		}

		this.listenScroll();
		this.player.on('fullscreenchange', this._onFullscreenChange.bind(this));
	};

	listenScroll() {
		let didScroll = false;

		$(window).scroll(function() {
			didScroll = true;
		})

		setInterval(() => {
			if(didScroll) {
				didScroll = false;

				const scrollTop = $(window).scrollTop();

				if(scrollTop > this.offsetShow) {
					this.show();
				} else {
					this.hide();
				}
			}
		}, 250)
	}

	get offsetShow() {
		if ($.isFunction(this.options.offsetShow)) {
			return this.options.offsetShow(this.player);
		}

		return this.options.offsetShow
	}


	_onFullscreenChange(e, data) {
		if (data == true) {
			this.hide();
		}
	}

	get height() {
		return this.player.element.height();
	}

	get width() {
		return this.options.width || this.player.element.width()
	}

	/**
	 * Show mini player
	 *
	 * @public
	 */
	show() {
		if (this.visible == true) {
			return;
		}
		this.visible = true;
		this.player.innerElement.css('max-width', this.width);
		this.player.element.css('padding-top', this.player.videoContainer.height());
		this.player.setView('mini');
	}

	/**
	 * Hide mini player
	 *
	 * @public
	 */
	hide() {
		if(this.visible == false) {
			return;
		}
		this.player.setView('common');

		this.player.innerElement.css('max-width', '')
		// Added empty space
		this.player.element.css('padding-top', '');
		this.visible = false;
	}

	/**
	 * @override
	 */
	createElement() {
		const controls = new ControlCollection(this.player, { name : 'mini' });
		return this.element = createEl('div', {
			className : 'leplayer-miniplayer'
		}).append(controls.element)
	}
}

export default MiniPlayer;
