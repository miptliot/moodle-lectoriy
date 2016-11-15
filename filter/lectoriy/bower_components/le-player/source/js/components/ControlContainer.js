'use strict';
/**
 * @file ControlContainer.js
 */

import $ from 'jquery';
import ControlDropdown from './ControlDropdown';

/**
 * @param {Player} player Main player
 * @class ControlContainer
 * @extends ControlDropdown
 */
class ControlContainer extends ControlDropdown {

	constructor(player, options) {
		super(player, options);
		this._active = null;
		/**
		 * List of items
		 *
		 * @public
		 * @type {Array}
		 */
		this.list = [];
	}

	/**
	 * Get item of container by index
	 *
	 * @public
	 * @param {number} index
	 */
	getByIndex(index) {
		return this.list[index];
	}

	/**
	 * Set item active by index
	 *
	 * @public
	 * @param {number} index
	 */
	setActiveByIndex(index) {
		if (this.active) {
			this.active.removeClass('control-container__item--active');
		}
		this._active = this.list[index].addClass('control-container__item--active');
		return this._active;
	}


	/**
	 * Getter of active field
	 *
	 * @public
	 * @type {jQuery}
	 */
	get active () {
		if (this._active && this._active.length > 0 ) {
			return this._active;
		}
		this.list.forEach(item => {
			if (item.hasClass('control-container__item--active')) {
				this._active = item;
			}
		})
		return this._active;
	}

	/**
	 * Setter of active field
	 *
	 * @public
	 * @param {jQuery} Item of container
	 */
	set active (element) {
		if (this.active) {
			this.active.removeClass('control-container__item--active');
		}
		if (element) {
			$(element).addClass('control-container__item--active');
		}
		this._active = element;
		return this._active
	}


	/**
	 * @public
	 * @param {String|jQuery} Content of item
	 * @param {Object} Data of item
	 */
	addItem (content, data) {
		const item = $('<div />')
			.addClass('control-container__item')
			.data(data)
			.on('click', this.onItemClick.bind(this))
			.append(content);
		this.list.push(item);

		this.dropdownContent.append(item);

		return item;
	}

	/**
	 * On item click event handler
	 * @public
	 * @param {Event} e
	 */
	onItemClick (e) {
		this.active = e.currentTarget;
	}

	/**
	 * @override
	 */
	buildCSSClass() {
		return `${super.buildCSSClass()} control-container`
	}
}

export default ControlContainer;
