'use strict';
/**
 * @file TimeInfoControl.js
 */

import $ from 'jquery';
import Control from './Control';
import ControlText from './ControlText';
import { secondsToTime } from '../utils';

/**
 * @param {Player} player Main player
 * @class TimeInfoControl
 * @property {ControlText} currentTime Current time's text
 * @property {ControlText} totalTime Total time
 * @property {jQuery} line
 * @extends Control
 */
class TimeInfoControl extends Control {

	constructor (player, options={}) {
		options = $.extend({}, {
			className : 'timeline timeline-container',
			name : 'time-info'
		}, options);
		super(player, options);

		this.player.on('timeupdate', (e, data) => {
			const { time } = data;
			this._currentTimeControl.text = secondsToTime(time);
		})
	}


	/**
	 * @override
	 */
	createElement() {
		this._currentTimeControl = new ControlText(this.player, { className : 'control-time__current'});
		this._totalTimeControl = new ControlText(this.player, { className : 'control-time__total'});

		this.element = $('<div/>').addClass('control-time');
		this.element
			.append(this._currentTimeControl.element)
			.append(this._totalTimeControl.element)

		return this.element;
	}


	/**
	 * @override
	 */
	onPlayerInited(e) {
		let video = this.player.video;
		this._currentTimeControl.text = secondsToTime(video.currentTime);
		this._totalTimeControl.text = secondsToTime(video.duration);
	}

	set currentTime(value) {

	}

	_onClick(e) {
		e.preventDefault()
	}
}

export default TimeInfoControl;
