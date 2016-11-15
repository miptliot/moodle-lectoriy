'use strict';
/**
 * @file ControlCollection.js
 */

import $ from 'jquery';
import Component from './Component';

import controlFactory, { C_TIMELINE } from '../ControlFactory';
import { createEl } from '../utils';


class ControlCollection extends Component {
	constructor (player, options) {
		options = $.extend({}, {
			controls : player.options.controls[options.name] || [],
		}, options);
		super(player, options);
		this.items = {};
		this.active = options.active || false;
		this.name = options.name;
		this.controls = this.player.options.controls[this.name];
	}


	/**
	 * @override
	 */
	createElement() {
		const { name, controls } = this.options;

		this.element = createEl('div', {
			className: `leplayer-control-collection leplayer-control-collection--${name}`
		})

		controls.forEach( row => {
			let elemRow = createEl('div', {
				className : `leplayer-controls controls-${name}`
			})
			let hasTimeline = false;
			row.forEach(controlName => {
				if(controlName == C_TIMELINE) {
					hasTimeline = true
				}
				const control = controlFactory(this.player, controlName, {
					collection : this.options.name
				});
				elemRow.append(control.element);
			});
			if (!hasTimeline) {
				elemRow.css('width', '1px');
			}
			elemRow.find('.divider + .divider').remove();
			this.element.append(elemRow);
		})
		return this.element;

	}

	set disable (value) {
		for (let i in this.items) {
			if (!this.items.hasOwnProperty(i)) continue;
			this.items[ i ].disable = value;
		}
	}

	add (name) {
		if (name == C_DIVIDER) {
			return controlFactory(player, name);
		} else {
			this.items[ name ] = controlFactory(player, name);
			return this.items[ name ].element;
		}
	}

	has (name) {
		return (typeof this.items[ name ] == 'object');
	}

	hide () {
		this.element.hide();
		this.element.find('.leplayer-controls').hide()
	}

	show () {
		this.element.show()
		this.element.find('.leplayer-controls').show()
	}
}

export default ControlCollection;
