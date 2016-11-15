'use strict';
/**
 * @file control-checkbox.js
 */


import $ from 'jquery';
import Control from './Control';

/**
 * @param {Player} player Main player
 * @param {Object} [options]
 * @param {boolean} [options.checked=false]
 * @class ControlCheckbox Toggable control
 */
class ControlCheckbox extends Control {

	constructor(player, options={}) {
		super(player, options);
		this.checked = this.options.checked || false;
		this.element.on('leplayer_checked', this.onChecked.bind(this))
	}


	/**
	 * Setter for checked property
	 * @public
	 * @param {boolean} val
	 */
	set checked (val) {
		if (this.disable) {
			return;
		}
		val = !!val;
		this._checked = val
		this.element.toggleClass('control-checkbox--checked', val);
		this.element.trigger('leplayer_checked', { checked  : val });
	}

	/**
	 * Getter for checked propery
	 * @public
	 * @return {boolean}
	 */
	get checked () {
		return this._checked;
	}

	/**
	 * @override
	 */
	onClick (e) {
		super.onClick(e);
		this.checked = !this.checked;
	}

	/**
	 * On checked event handler
	 *
	 * @param {Event} e
	 * @param {Object} data
	 */
	onChecked(e, data) {

	}


	/**
	 * @override
	 */
	buildCSSClass() {
		return `control-checkbox ${super.buildCSSClass()}`
	}

}

export default ControlCheckbox;
