'use strict';
/**
 * @file ControlText.js
 */

import $ from 'jquery';
import Control from './Control';

/**
 * @param {Player} player Main player
 * @class ControlText
 * @exnteds Control
 */
class ControlText extends Control {
	constructor (player, options={}) {
		options = $.extend({}, {
			className : ''
		}, options);
		super(player, options);
	}

	/**
	 * @override
	 */
	createElement() {
		super.createElement();
	}

	/**
	 * @override
	 */
	buildCSSClass() {
		return `control-text ${this.options.className}`;
	}


	/**
	 * Setter of text field
	 * @public
	 * @param {String} value
	 */

	set text (value) {
		this._text = value;
		this.element.html(value);
	}

	get text () {
		return this._text
	}
}

export default ControlText;
