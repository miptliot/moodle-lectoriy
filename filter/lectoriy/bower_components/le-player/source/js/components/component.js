'use strict';
/**
 * @file Component.js
 */

import $ from 'jquery';

/**
 * Player component - Base class for all UI
 *
 * @param {Player} player Main player
 * @param {Object} [options] Options of component
 * @param {jQuery} [options.element] Элемент на котором можно иницилизовать класс.
 * @property {Object} options
 * @property {jQuery} element
 * @class Component
 */
class Component {

	constructor(player, options) {
		/** TODO(adinvadim): Add options.component, for clone component instance */
		options = this.options = $.extend({}, this.options, options);
		this.player = player;

		if (options.element) {
			this.element = options.element;
		} else {
			this.createElement();
		}
		if (this.element.length != 1) {
			console.error(`Component.prototype.element.length must equal 1, not ${this.element.length}\n`, this.element);
		}
		this.element[0].__node = this;
	}

	/**
	 * @abstract
	 */
	createElement() {

		return '';
	}

	/**
	 * @abstract
	 */
	buildCSSClass() {
		return ''
	}


}

export default Component;
