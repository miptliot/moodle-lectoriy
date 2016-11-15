'use strict';
/**
 * @file RateControl.js
 */

import $ from 'jquery';
import Control from './Control';
import ControlText from './ControlText';
import Cookie from '../utils/cookie';

/**
 * @class RateControl
 * @param {Player} player Main player
 * @param {Object} [options]
 * @property {Control} downControl  Down rate control
 * @property {Control} upControl  Up rate control
 * @property {ControlText} currentRate Control of cuurent rate
 * @extends Control
 */
class RateControl extends Control {
	constructor (player, options={}) {
		options = $.extend({}, {
			className : 'control-container'
		}, options);
		super(player, options);
		const video = this.player.video;

		this.player.on('ratechange', (e, data) => {
			this.value = data.rate
		})
	}



	/**
	 * @override
	 */
	createElement() {
		super.createElement();
		const video = this.player.video;

		this.downControl = new Control(this.player, {
			className : 'rate-down',
			name: 'rate-down',
			iconName : 'backward',
			collection : this.options.collection,
			title : 'Уменьшить скорость проигрывания',
			onClick : function(e) {
				video.rate -= this.player.options.rate.step;
			}
		});

		this.upControl = new Control(this.player, {
			className : 'rate-up',
			name : 'rate-up',
			iconName : 'forward',
			collection : this.options.collection,
			title : 'Увеличить скорость проигрывания',
			onClick : function(e) {
				video.rate += this.player.options.rate.step;
			}
		});

		this.currentRate = new ControlText(this.player, { className : 'rate-current'});

		this.element
			.append(this.downControl.element)
			.append(this.currentRate.element)
			.append(this.upControl.element);
	}

	/**
	 * @override
	 */
	buildCSSClass() {
		return this.options.className;
	}

	/**
	 * @override
	 */
	onPlayerInited() {
		this.value = this.player.video.defaultRate;
	}

	/**
	 *
	 */
	_onClick(e) {
		e.preventDefault()
	}

	set value (value) {
		let video = this.player.video;
		let options = this.player.options;
		if (this.disable) {
			return false;
		}
		this.upControl.disable = false;
		this.downControl.disable = false;
		if (video.rate <= options.rate.min) {
			this.downControl.disable = true;
		} else if (video.rate >= options.rate.max) {
			this.upControl.disable = true;
		}
		this.show();
	}

	set disable(value) {
		this._disable = value;
		this.downControl.disable = value;
		this.upControl.disable = value;
	}

	init () {
		let rate = Cookie.get('rate', this.player.options.rate.default);
		this.show(rate);
	}

	show (value) {
		let video = this.player.video;
		value = value || video.rate;
		value = parseFloat(value)
			.toFixed(2)
			.toString()
			.replace(/,/g, '.');
		this.currentRate.text = '×' + value;
	}

}

export default RateControl;
