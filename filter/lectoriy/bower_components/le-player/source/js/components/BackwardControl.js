'use strict';
/**
 * @file BackwardControl.js
 *
 * Backward control
 */

import $ from 'jquery';
import Control from './Control';

/**
 * @param {Player} player Main player
 * @param {Object} [options={}] Options
 * @class BackwardControl
 * @extends Control
 */
class BackwardControl extends Control {
	constructor (player, options={}) {
		options = $.extend({}, {
			iconName : 'undo',
			className : 'backward',
			name : 'backward',
			title : `Отмотать назад на ${player.options.playback.step.medium} секунд`,
		}, options);
		super(player, options);
	}

	/**
	 * @override
	 */
	onClick(e) {
		super.onClick(e);
		this.player.video.currentTime -= this.player.options.playback.step.medium;
	}
}

export default BackwardControl;
