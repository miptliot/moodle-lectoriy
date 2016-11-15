'use strict';
/**
 * @file SectionControl.js
 */

import $ from 'jquery';
import ControlCheckbox from './ControlCheckbox';

/**
 * @class SectionControl
 * @param {Player} player Main player
 * @param {Object} [options]
 * @param {Boolean} [options.checked=true]
 * @extends ControlCheckbox
 */
class SectionControl extends ControlCheckbox {
	constructor (player, options={}) {
		options = $.extend({}, {
			iconName : 'list-ul',
			className : 'section',
			name : 'section',
			title : 'Показать/скрыть секции',
			disable : true
		}, options);
		super(player, options);

		this.player.on('sectionsinit', this._onSectionsInit.bind(this));
	}

	onChecked(e, data) {
		super.onChecked(e);
		this.player.trigger('sectionstoggle', {
			checked : data.checked,
			view : this.player.getView()
		});
	}

	_onSectionsInit(e) {
		this.options.disable = this.disable = false;
		this.checked = true;
	}
}

export default SectionControl;
