'use strict';
/**
 * @file BufferedRanges.js
 */

import $ from 'jquery';
import { percentify, createEl } from '../../utils';
import Component from '../Component';

/**
 * @param {Player} player Main player
 * @class BufferedRanges
 * @extends Control
 */

class BufferedRanges extends Component {

	constructor(player, options) {
		super(player, options);

		this.player.on('progress', this.update.bind(this));
	}

	/**
	 * @override
	 */
	createElement() {
		this.range = createEl('div', {
			className : 'leplayer-timeline-buffered__range'
		});

		return this.element = createEl('div', {
			className : 'leplayer-timeline-buffered'
		}).append(this.range);
	}


	update() {
		const buffered = this.player.video.buffered;
		const duration = this.player.video.duration;
		let end = 0;
		if (buffered.length > 0) {
			end = buffered.end(buffered.length - 1);
		}

		if (duration > 0) {

			this.range.css({
				width : percentify(end, duration) * 100 + '%'
			})

		}
	}
}

export default BufferedRanges;
