'use strict';
/**
 * @file Sections.js
 */

import $ from 'jquery';
import Component from './Component';

import { secondsToTime } from '../utils';

/**
 * @class Sections
 * @param {Player} player Main player
 * @param {Object} [options]
 * @param {Array} [options.items=[]} Data for sections
 * @param {Boolean} [options.fullscreenOnly] Show section only in fullscreen
 * @param {Boolean} [options.main=true] Main sections of player
 * @extends Component
 */
class Sections extends Component {
	constructor(player, options) {
		let { items = [], main = true } = options;
		items = [].concat(items);

		//options.items = items;

		super(player, options)
		this.activeSection = this.getSectionByIndex(0);

		this.items = items;
		this.length = this.items.length


		this.setActiveByIndex(0);

		this.element.find('.leplayer-section').on('click', this.onSectionClick.bind(this));

		this.player.on('sectionstoggle', this._onSectionsToggle.bind(this));

		this.player.on('timeupdate', this.onTimeUpdate.bind(this));

		//this.player.trigger('sectionsinit', { items : this.items, sections : this });
		this.player.on('inited', this.onPlayerInited.bind(this));

		return this;
	}

	next() {
		const sectionIndex = parseInt(this.activeSection.attr('data-index'));
		const newIndex = sectionIndex >= this.length ? this.length : sectionIndex + 1;

		this.setActiveByIndex(newIndex);

		this.player.video.currentTime = this.items[sectionIndex].end;
	}

	prev() {
		const sectionIndex = parseInt(this.activeSection.attr('data-index'));
		const newIndex = sectionIndex <= 0 ? 0 : sectionIndex - 1;

		this.setActiveByIndex(newIndex);
		this.player.video.currentTime = this.items[newIndex].begin;
	}

	/**
	 * @override
	 */
	createElement() {
		this.element = $('<div />').addClass('leplayer-sections');
		if(this.options.fullscreenOnly) {
			this.element.addClass('leplayer-sections--fsonly');
		}
		this.element.append(this._createSections(this.options.items));
		return this.element;
	}

	/**
	 * @override
	 */
	onPlayerInited() {

		if(this.items != null && this.items.length > 0 ) {
			this.items[this.items.length - 1].end = this.player.video.duration;
		}
	}



	onSectionClick(e) {
		const video = this.player.video;
		const section = $(e.target).closest('.leplayer-section');
		video.currentTime = section.attr('data-begin');
		this.player.trigger('sectionsclick', { section : this.items[section.attr('data-index')]});
	}

	setActiveByIndex(index) {
		if (this.activeSection.length == 0) {
			return
		}
		if (this.activeSection.attr('data-index') == index) {
			return
		}

		if (this.getSectionByIndex(index).length == 0) {
			return
		}

		this.activeSection.removeClass('leplayer-section--active');

		this.activeSection = this.getSectionByIndex(index);

		this.activeSection.addClass('leplayer-section--active');
		if(this.player.getView() !== 'mini') {
			this.element
				.stop()
				.animate({
				scrollTop : this.activeSection.position().top
			}, 800)
		}
	}

	getSectionByIndex(index) {
		return this.element.find(`.leplayer-section[data-index="${index}"]`);
	}


	onTimeUpdate(e, data) {
		if (this.activeSection.length == 0) {
			return
		}
		const currentTime = data.time;

		const endSectionTime = this.activeSection.attr('data-end');

		// Update span with end section time
		if(this.player.getView() === 'mini' ) {
			this.activeSection
				.next()
				.find('.time')
				.text(secondsToTime(endSectionTime - currentTime));
		}

		for (let i = 0; i < this.items.length; i++) {
			const section = this.items[i];
			if (currentTime < section.end) {
				this.setActiveByIndex(i);
				break;
			}
		}
	}

	_onSectionsToggle(e, data) {
		if (this.element.hasClass('leplayer-sections--hidden') && data.checked) {
			this.element.removeClass('leplayer-sections--hidden');
		} else if (!data.checked) {
			this.element.addClass('leplayer-sections--hidden');
		}
	}

	_createSections(items) {
		let result = '';
		items.forEach((section, index) => {
			const item = `
				<div class="leplayer-section ${!index ? 'leplayer-section--active' : ''}"
					data-begin="${section.begin}"
					data-index="${index.toString()}"
					data-end="${section.end}">
					<div class="leplayer-section-time">${secondsToTime(section.begin)}</div>
					<div class="leplayer-section-info">
						<div class="leplayer-section-next-info">
							Следующая секция начнется через
							<span class="time">${secondsToTime(items[0].end)}</span>
						</div>
						${
							section.title != null ?
								`<div class="leplayer-section-title">${section.title}</div>`
							: ''
						}
						${
							section.description != null ?
								`<div class="leplayer-section-description">${section.description}</div>`
							: ''
						}
					</div>
				</div>
			`.trim()
			result += item;
		});
		return result;
	}
}

export default Sections;
