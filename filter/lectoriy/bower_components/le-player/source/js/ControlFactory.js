'use strict';
/**
 * @file control-factory.js
 *
 */

import PlayControl from './components/PlayControl';
import VolumeControl from './components/VolumeControl';
import TimelineControl from './components/Timeline/TimelineControl';
import SectionControl from './components/SectionControl';
import FullscreenControl from './components/FullscreenControl';
import RateControl from './components/RateControl';
import BackwardControl from './components/BackwardControl';
import SourceControl from './components/SourceControl';
import SubtitleControl from './components/SubtitleControl';
import DownloadControl from './components/DownloadControl';
import KeyBindingInfoControl from './components/KeybindingInfoControl';
import TimeInfoControl from './components/TimeInfoControl';

export const C_BACKWARD = 'backward';
export const C_DIVIDER = 'divider';
export const C_DOWNLOAD = 'download';
export const C_FORWARD = 'forward';
export const C_FULLSCREEN = 'fullscreen';
export const C_PLAY = 'play';
export const C_RATE = 'rate';
export const C_SOURCE = 'source';
export const C_SUBTITLE = 'subtitle';
export const C_TIMELINE = 'timeline';
export const C_VOLUME = 'volume';
export const C_SECTION = 'section';
export const C_KEYBINDING_INFO = 'keybinding info';
export const C_TIME_INFO = 'timeinfo'

export default function controlFactory(player, name, options) {
	switch (name) {
		case C_BACKWARD:
			return new BackwardControl(player, options);

		case C_DIVIDER:
			return {
				element : $('<div/>').addClass('divider')
			}

		case C_DOWNLOAD:
			return new DownloadControl(player, options);

		case C_FORWARD:
			return new ForwardControl(player, options);

		case C_FULLSCREEN:
			return new FullscreenControl(player, options);

		case C_PLAY:
			return new PlayControl(player, options);

		case C_RATE:
			return new RateControl(player, options);

		case C_SOURCE:
			return new SourceControl(player, options);

		case C_SUBTITLE:
			return new SubtitleControl(player, options);

		case C_TIMELINE:
			return new TimelineControl(player, options);

		case C_VOLUME:
			return new VolumeControl(player, options);

		case C_SECTION:
			return new SectionControl(player, options);

		case C_KEYBINDING_INFO:
			return new KeyBindingInfoControl(player, options);

		case C_TIME_INFO:
			return new TimeInfoControl(player, options)

		default:
			console.error(`Control ${name} doesn't exist`);
			return null;
	}
}
