'use strict';
/**
 * @file Control.js
 */

import $ from 'jquery';
import Component from './Component';
import Icon from './Icon';

/**
 * @class Control
 * @param {Player} player Main player
 * @param {Object} [options] Control's options
 * @param {String} [options.iconName] Name of control's icon. If empty, control will not have a icon
 * @param {String} [options.className]
 * @param {String} [options.name]
 * @param {String} [options.collection]
 * @param {String} [options.title] Contorl's tooltip, title attr
 * @param {Boolean} [options.disable=false]
 * @property {Icon} icon Icon in control, if it is exist
 * @extends Component
 */
class Control extends Component {

	constructor(player, options) {
		super(player, options);
		this.disable = true

		this.player.on('inited', (e) => {
			this.disable = this.options.disable || false;
		})

		this.element.on({
			'click' : this._onClick.bind(this),
			'leplayer_control_click' : this.onClick.bind(this)
		});

		this.player.on('inited', this.onPlayerInited.bind(this))
	}

	/**
	 * @override
	 */
	createElement() {
		if (this.options.iconName) {
			this.icon = new Icon(this.player, {
				iconName : this.options.iconName
			});
		}
		let attrs = {
			role : 'button',
			title : this.options.title
		}
		this.element = $('<div />')
			.addClass(this.buildCSSClass())
			.append(this.icon && this.icon.element)
			.attr(attrs);

		return this.element;
	}

	/**
	 * @override
	 */
	buildCSSClass() {
		return `control ${this.options.className} ${super.buildCSSClass()}`
	}

	set disable(value) {
		this._disable = value;
		this.element.toggleClass('disabled', value);
	}

	get disable() {
		return this._disable
	}

	_onClick (e) {
		if (this.disable) {
			return false;
		}
		this.element.trigger('leplayer_control_click');
		this.player.trigger('controlclick', { control : this });
	}

	/**
	 *
	 * On click event handler
	 * @abstact
	 */
	onClick (e) {
		e.preventDefault();
		if (typeof this.options.onClick == 'function') {
			this.options.onClick.call(this, arguments);
		}
	}


	onPlayerInited (e, data) {

	}

}

export default Control;

