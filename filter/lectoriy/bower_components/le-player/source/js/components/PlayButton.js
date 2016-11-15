'use strict';
/**
 * @file PlayButton.js
 */

import $ from 'jquery';
import Control from './Control';
import Icon from './Icon';
import { createEl } from '../utils';

/**
 * @param {Player} player Main player
 */
class PlayButton extends Control {

	constructor(player, options) {
		super(player, options)

		this.element.on('dblclick', this._onDbclick.bind(this));
	}

	createElement() {
		const inner = createEl('div', {
			className : 'leplayer-play-button__button'
		})
		.append(new Icon(this.player, { iconName : 'play' }).element);

		this.element = createEl('div', {
			className : this.buildCSSClass
		})
		.append(inner);

		return this.element;
	}

	onClick(e) {
		super.onClick(e);
		this.player.trigger('click');
	}

	_onDbclick() {
		this.player.trigger('dblclick');
	}

	/**
	 * @override
	 */
	buildCSSClass() {
		return `leplayer-play-button`
	}

}

export default PlayButton;
