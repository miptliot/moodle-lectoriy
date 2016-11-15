'use strict';
/**
 * @file FullscreenControl.js
 */

import $ from 'jquery';
import Control from './Control';

/**
 * @param {Player} player Main player
 * @class FullscreenControl
 * @extends Control
 */
class FullscreenControl extends Control {
	constructor (player, options={}) {
		options = $.extend({}, {
			iconName : 'arrows-alt',
			className : 'fullscreen',
			title : 'Развернуть/свернуть на полный экран',
			name : 'fullscreen'
		}, options);
		super(player, options);
	}

	/**
	 * @override
	 */
	onClick(e) {
		super.onClick(e)
		this.player.toggleFullscreen();
	}
}

export default FullscreenControl;
