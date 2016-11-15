'use strict';
/**
 * @file Icon.js
 */

import $ from 'jquery';
import Component from './Component';

/**
 * @param {Player} player Main player
 * @param {Object} [options] Icon's options
 * @param {String} [options.iconName=''] Icon's name. If use svgsprite icons, iconName it's id in sprite
 * @class Icon
 * @extends Component
 */
class Icon extends Component {

	constructor (player, options={}) {
		options = $.extend({}, {
			className : '',
			iconName : ''
		}, options)
		super(player, options);

	}


	/**
	 * @override
	 */
	createElement() {
		this._useTag = document.createElementNS('http://www.w3.org/2000/svg', 'use');
		this._svgTag = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

		this.iconName = this._iconName = this.options.iconName;
		this._svgTag.appendChild(this._useTag);
		this.element = $('<div />')
			.addClass(this.buildCSSClass())
			.attr('title', this.options.title)
			.append($(this._svgTag));
		return this.element;
	}

	/**
	 * @override
	 */
	buildCSSClass() {
		return `${super.buildCSSClass()} leplayer-icon ${this.options.className}`
	}

	/**
	 * Setter of iconName field
	 * @param {String} iconName
	 */
	set iconName(iconName) {
		let attrNS = ['http://www.w3.org/1999/xlink', 'href']
		this._useTag.removeAttributeNS(...attrNS, `${this.player.options.svgPath}#leplayer-icon-${this.iconName}`)
		this._useTag.setAttributeNS(...attrNS, `${this.player.options.svgPath}#leplayer-icon-${iconName}`)
		this._iconName = iconName;
	}

	/**
	 * Getter of iconName field
	 * @return {String} Icon's name
	 */
	get iconName () {
		return this._iconName;
	}

}

export default Icon;
