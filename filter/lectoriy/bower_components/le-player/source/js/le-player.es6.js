'use strict';

import Control from './components/Control';
import Component from './components/Component';
import Icon from './components/Icon';
import controlFactory, { C_KEYBINDING_INFO } from './ControlFactory';
import Cookie from './utils/cookie';

(function ($) {

	/**
	 * @class Player
	 * @param {jQuery} element Element when player will init
	 * @param {Object} [options]
	 * @param {Boolean} [options.autoplay=false]
	 * When present, the video will automatically start playing as soon as it can do so without stopping.
	 * @param {String|Number} [options.height='auto'] Height of video container
	 * @param {String} [options.width] Width of video container
	 * @param {Boolean} [options.loop=false]
	 * When present, it specifies that the video will start over again, every time it is finished.
	 * @param {Boolean} [options.muted=false]
	 * When present, it specifies that the audio output of the video should be muted.
	 * @param {String} [options.preload='metadata'] Can be ('auto'|'metadata'|'none')
	 * @param {String} [options.poster] Path to poster of video
	 * @param {String} [options.svgPath] Path to svg sprite for icons
	 * @param {Number} [options.fullscreen] Fullscreen options
	 * @param {Number} [options.fullscreen.hideTimelineTime=7000] Delay before hide timeline in fullscreen view
	 * @param {Object} [options.rate] Rate options
	 * @param {Number} [options.rate.step=0.25] Step of increase/decrease by rate control
	 * @param {Number} [options.rate.min=0.5] Min of rate
	 * @param {Number} [options.rate.max=4.0] Max of rate
	 * @param {Number} [options.rate.default=1]
	 * @param {Object} [options.playback] Playback options
	 * @param {Object} [options.playback.step]
	 * @param {Nubmer} [options.playback.step.short=5]
	 * @param {Nubmer} [options.playback.step.medium=30]
	 * @param {Nubmer} [options.playback.step.long=60]
	 * @param {Obejct} [options.controls] Object of controls
	 * @param {String[]} [options.controls.common] Array of controls for default view
	 * @param {String[]} [options.controls.fullscreen] Array of control for fullsreen view
	 * @param {Object} [options.volume] Volume's options
	 * @param {Number} [options.volume.default=0.4] Default volume
	 * @param {Number} [options.volume.mutelimit=0.05] Delta when volume is muted
	 * @param {Number} [options.volume.step=0.05]
	 * @param {Object[]} [options.keybinding]
	 * Object with keybinding options, when key it's name of key binding, and value it's key binding settings
	 * @param {Number} [options.keybinding[].key] Code of key binding (for example 32 it's space)
	 * @param {String[]} [options.keybinding[].info] Array of keystrokes order
	 * @param {String} options.keybinding[].description] Description of key binding
	 * @param {Function} options.keybinding[].fn] Callback
	 * @param {Object|Boolean} [options.miniplayer=false]
	 * @param {String} [options.miniplayer.width] MiniPlayer's width
	 */
	let Player = function (element, opts) {
		const C_BACKWARD = 'backward';
		const C_DIVIDER = 'divider';
		const C_DOWNLOAD = 'download';
		const C_FORWARD = 'forward';
		const C_FULLSCREEN = 'fullscreen';
		const C_PLAY = 'play';
		const C_RATE = 'rate';
		const C_SOURCE = 'source';
		const C_SUBTITLE = 'subtitle';
		const C_TIMELINE = 'timeline';
		const C_VOLUME = 'volume';
		const C_SECTION = "section"

		var player = this;
		var options = this.options = $.extend(true, {}, {
			miniplayer : false,
			autoplay : false,
			height : 'auto',
			loop : false,
			muted : false,
			preload : 'metadata',
			poster : null,
			svgPath : '../dist/svg/svg-defs.svg',
			fullscreen : {
				hideTimelineTime : 7000
			},
			rate : {
				step : 0.25,
				min : 0.5,
				max : 4.0,
				'default' : 1
			},
			playback : {
				step : {
					short : 5,
					medium : 30,
					long : 60
				}
			},
			controls : {
				common : [
					[ 'play', 'volume', 'divider', 'timeline', 'divider', 'section', 'divider', 'fullscreen' ],
					[ 'rate', 'divider', 'backward', 'divider', 'source', 'divider', 'subtitle', 'divider', 'download', 'divider', C_KEYBINDING_INFO ]
				],
				fullscreen : [
					[ 'play', 'volume', 'divider', 'timeline', 'divider', 'rate', 'divider', C_KEYBINDING_INFO,  'divider', 'backward', 'divider', 'source', 'divider', 'subtitle', 'divider', 'download', 'divider', 'fullscreen' ]
				],
				mini : [
					[ 'play', 'volume', 'divider', 'fullscreen', 'divider', 'timeinfo']
				]
			},
			volume : {
				default : 0.4,
				mutelimit : 0.05,
				step : 0.1
			},
			keyBinding : [
				{
					key : 32,
					info : ['Space'],
					description : 'Начать проигрывание / поставить на паузу',
					fn : (video) => {
						video.togglePlay();
					}
				},
				{
					key : 37,
					info : ['←'],
					description : 'Перемотать на 30 секунд назад',
					fn : (video) => {
						video.currentTime -= options.playback.step.medium;
					}
				},
				{
					key : 39,
					info : ['→'],
					description : 'Перемотать на 30 секунд вперёд',
					fn : (video) => {
						video.currentTime += options.playback.step.medium;
					}
				},
				{
					shiftKey : true,
					info : ['Shift', '←'],
					description : 'Перемотать на 5 секунд назад',
					key : 37,
					fn : (video) => {
						video.currentTime -= options.playback.step.short;
					}
				},
				{
					shiftKey : true,
					key : 39,
					info : ['Shift', '→'],
					description : 'Перемотать на 5 секунд вперед',
					fn : (video) => {
						video.currentTime += options.playback.step.short;
					}
				},

				{
					key : 38,
					info : ['↑'],
					description : 'Увеличить громкость',
					fn : (video) => {
						video.volume += options.volume.step;
					}
				},

				{
					key : 40,
					info : ['↓'],
					description : 'Уменьшить громкость',
					fn : (video) => {
						video.volume -= options.volume.step;
					}
				},
			]
		}, opts);

		this.getData = () => {
			return $.ajax({
				url: options.dataUrl,
				method: 'GET'
			}).promise()
		}

		this.trigger = (eventName, ...args) => {
			$(element).trigger.call($(element), `leplayer_${eventName}`, ...args);
		}

		this.on = (eventName, ...args) => {
			$(element).on.call($(element), `leplayer_${eventName}`, ...args);
		}

		/**
		 * This class manages FullScreen API.
		 * @TODO: add fullscreenerror handler.
		 */
		class Fullscreen {

			constructor () {
				this.player = player;
				this._collection = controls.fullscreen;
				this._hideTimeout = null;
				this.fullscreenEnabled = false;
			}

			/**
			 * @returns {boolean} Whether browser supports fullscreen mode.
			 */
			enabled () {
				return !!(document.fullscreenEnabled
					|| document.mozFullScreenEnabled
					|| document.msFullscreenEnabled
					|| document.webkitSupportsFullscreen
					|| document.webkitFullscreenEnabled
					|| document.createElement('video').webkitRequestFullScreen);
			}

			init () {
				if (!this.enabled()) {
					return null;
				}
					// Fullscreen change handlers.
				$(document).on({

					'fullscreenchange' : (e) => {
						this.toggleElements(!!(document.fullScreen || document.fullscreenElement));
					},

					'webkitfullscreenchange' : (e) => {
						this.toggleElements(!!document.webkitIsFullScreen);
					},

					'mozfullscreenchange' : (e) => {
						this.toggleElements(!!document.mozFullScreen);
					},

					'msfullscreenchange' : (e) => {
						this.toggleElements(!!document.msFullscreenElement);
					},

					'webkitbeginfullscreen' : (e) => {
						this.toggleElements(true)
					},

					'webkitendfullscreen' : (e) => {
						this.toggleElements(false)
					}
				});
			}

			/**
			 * @returns {boolean} Whether browser is in fullscreen mode.
			 */
			is () {
				return !!(document.fullScreen
					|| document.webkitIsFullScreen
					|| document.mozFullScreen
					|| document.msFullscreenElement
					|| document.fullscreenElement
					|| this.fullscreenEnabled);
			}

			showElements () {
				this.player.trigger('fullscreenchange');
				container.addClass('fullscreen');
				controls.fullscreen.show();
				contorls.common.hide();

				clearTimeout(this._hideTimeout);
				this._hideTimeout = setTimeout(() => {
					this._collection.element.hide();
				}, options.fullscreen.hideTimelineTime);

				$(container).on({
					'mousemove.leplayer.fullscreen-hide-timeline' : (e) => {
						if (!$(e.currentTarget).hasClass('fullscreen')) return false;
						clearTimeout(this._hideTimeout);
						this._collection.element.show();
						this._hideTimeout = setTimeout(() => {
							this._collection.element.hide();
						}, options.fullscreen.hideTimelineTime);
					}
				})
			}

			hideElements () {
				this.player.trigger('fullscreenchange');
				container.removeClass('fullscreen');
				controls.fullscreen.hide();
				controls.common.show();
				clearTimeout(this._hideTimeout);
				$(container).off('.leplayer.fullscreen-hide-timeline');
			}

			toggle () {
				let containerEl = container[ 0 ];
				if (this.is()) {
					if (document.exitFullscreen)				document.exitFullscreen();
					else if (document.mozCancelFullScreen)	  document.mozCancelFullScreen();
					else if (document.webkitCancelFullScreen)   document.webkitCancelFullScreen();
					else if (document.msExitFullscreen)		 document.msExitFullscreen();
					else if (document.webkitExitFullscreen)	 document.webkitExitFullscreen();
					this.hideElements(); // @TODO: make this only if fullscreen fired.
					this.fullscreenEnabled = false;
				}
				else {
					if (containerEl.requestFullScreen)			containerEl.requestFullScreen();
					else if (containerEl.webkitRequestFullScreen) containerEl.webkitRequestFullScreen();
					else if (containerEl.mozRequestFullScreen)	containerEl.mozRequestFullScreen();
					else if (containerEl.msExitFullscreen)		containerEl.msRequestFullscreen();
					this.showElements(); // @TODO: make this only if fullscreen fired.
					this.fullscreEnabled = true;
				}
			}

			/**
			 * Update DOM structure according to current state.
			 */
			toggleElements (show) {
				if (!!show) {
					this.showElements();
				}
				else {
					this.hideElements();
				}
			}
		}

		class Video {
			constructor (ctx) {
				this.player = player;
				this._ctx = ctx;
				this._video = ctx[ 0 ];
				this.subtitles = [];
				this.bufferRanges = [];
				this.playbackRate = this._video.playbackRate;
			}

			get currentTime () {
				return this._video.currentTime;
			}

			set currentTime (value) {
				console.log(value, this._video);
				if (value > this.duration) {
					this._video.currentTime = this.duration
				} else if (value < 0 ) {
					this._video.currentTime = 0
				} else {
					this._video.currentTime = value;
				}
			}

			get duration () {
				return this._video.duration;
			}

			get height () {
				return this._video.clientHeight;
			}

			get width () {
				return this._video.clientWidth;
			}

			get rate () {
				return this._video.playbackRate;
			}

			get defaultRate() {
				return Cookie.get('rate') || options.rate.default
			}


			set rate (value) {
				if ( value <= options.rate.max && value >= options.rate.min ) {
					this._video.playbackRate = value;
					Cookie.set('rate', value);
				}
				/** TODO: Chanche controls.rate in event handler */
				//controls.rate = this._video.playbackRate;
			}


			set source (value) {
				let time = this._video.currentTime;
				let rate = this._video.playbackRate;
				let stop = (!this._video.played || this._video.paused);
				this._ctx.attr('src', value);
				this._video = this._ctx[ 0 ];
				this._video.playbackRate = rate;
				this._video.currentTime = time;
				if (stop) {
					this.pause();
				} else {
					this.play();
				}

				// @TODO make this right way
				//setTimeout(() => {
					//controls.totalTime = secondsToTime(this._video.duration);
				//}, 100);

			}

			set track (value) {
				for (var i = 0; i < this._video.textTracks.length; i++) {
					if (this._video.textTracks[ i ].language == value)
						this._video.textTracks[ i ].mode = 'showing';
					else
						this._video.textTracks[ i ].mode = 'hidden';
				}
			}

			get volume () {
				return this._video.volume;
			}


			get defaultVolume () {
				return Cookie.get('volume') || options.volume.default;
			}

			set volume (value) {
				if (value > 1) {
					this._video.volume = 1;
				} else if (value < options.volume.mutelimit) {
					this._video.volume = 0;
				} else {
					this._video.volume = value;
					Cookie.set('volume', value);
				}
				this._video.mute = (value < options.volume.mutelimit);
			}


			get buffered () {
				return this._video.buffered;
			}

			get loaded () {
				let loaded = [];
				let media = this._video;
				/** FF4+, Chrome */
				if (
					media.buffered &&
					media.buffered.end &&
					media.duration > 0
				) {
					for (let i = 0; i < media.buffered.length; i++) {
						let start = media.buffered.start(i) / media.duration;
						let end = media.buffered.end(i) / media.duration;
						let segment = [start, end];
						loaded.push(segment);
					}
				}
				/** Safari 5, Webkit head, FF3.6, Chrome 6, IE 7/8 */
				else if (
					media.bytesTotal != null &&
					media.bytesTotal > 0 &&
					media.bufferedBytes != null
				) {
					loaded.push([0, media.bufferedBytes / media.bytesTotal]);
				}
				return loaded;
			}

			get loadedSize () {
				const START = 0;
				const END = 1;
				let sum = 0
				this.loaded.forEach(item => {
					sum += item[END] - item[START];
				});
				return sum;
			}

			init () {
				let dfd = $.Deferred();
				this._initSubtitles();
				this._initVideo()
					.done(() => {
						this.fullscreen = new Fullscreen();
						this.fullscreen.init();
						controls.init();
						this._initRate();
						this._initVolume();
						this.startBuffering();
						dfd.resolve();
					});
				this._initCustomEvents();
				this._initHtmlEvents();

				dfd.notify();
				return dfd.promise();
			}

			startBuffering() {
				return this.play().done( () => {
					this.pause()
				})
			}

			togglePlay () {
				/** In safari it doesn't work */
				// if (this._video.readyState < 2) {
				// 	overlay.hide();
				// 	_showNotification('Error!');
				// 	return;
				// }
				if (!this._video.played || this._video.paused) {
					this.play();
				} else {
					this.pause();
				}
			}

			seek (time) {
				this._video.currentTime = time;
			}

			play () {
				let dfd = $.Deferred();
				const playPromise = this._video.play();

				if( playPromise != null) {
					playPromise.then(function() {
						dfd.resolve();
					})
				} else {
					dfd.resolve();
				}
				overlay.hide();
				return dfd.promise();
			}

			pause () {
				let dfd = $.Deferred();
				const pausePromise = this._video.pause();

				if( pausePromise != null) {
					pausePromise.then(function() {
						dfd.resolve();
					})
				} else {
					dfd.resolve();
				}
				overlay.show();
				return dfd.promise();
			}

			trigger (eventName, ...args) {
				this.player.trigger.call($(this._video), `leplayer_${eventName}`, ...args);
				return this;
			}

			on (eventName, ...args) {
				$(this._video).on.call($(this._video), `leplayer_${eventName}`, ...args);
				return this;
			}

			_initRate () {
				this.rate = this.defaultRate;
			}

			_initVolume () {
				this.volume = this.defaultVolume;
			}

			_initSubtitles () {
				let _self = this;
				this._ctx.children('track[kind="subtitles"]').each(function () {
					let language = $(this).attr('srclang');
					let title = $(this).attr('label');
					let src = $(this).attr('src');
					if (title.length > 0 && src.length > 0) {
						_self.subtitles.push({
							title : title,
							src : src,
							language : language
						});
					}
				});
			}

			_initVideo () {
				let dfd = $.Deferred();
				if (this._video.readyState > HTMLMediaElement.HAVE_NOTHING) {
					dfd.resolve()
					this._onLoadedMetaData();
					this._textTracksHack();
				} else {
					$(this._video).one('loadedmetadata', (e) => {
						dfd.resolve()
						this._textTracksHack();
					});
				}
				dfd.notify();
				return dfd.promise();
			}

			_textTracksHack () {

				// This is generally for Firefox only
				// because it somehow resets track list
				// for video element after DOM manipulation.

				if (this._video.textTracks.length == 0 && this.subtitles.length > 0) {
					this._ctx.children('track[kind="subtitles"]').remove();
					for (var i in this.subtitles) {
						if (this.subtitles.hasOwnProperty(i)) {
							this._ctx
								.append($('<track/>')
									.attr('label', this.subtitles[ i ].title)
									.attr('src', this.subtitles[ i ].src)
									.attr('srclang', this.subtitles[ i ].language)
									.attr('id', this.subtitles[ i ].language)
									.attr('kind', 'subtitles'));
						}
					}
				}
			}

			_onLoadedMetaData (e) {
				container
					.css('width', '100%')
					.css('max-width', (options.width || this.width) + 'px');
				this.player.trigger('loadedmetadata', { video : this._video });
			}

			_initHtmlEvents () {
				let mediaElement = $(this._video);
				let timerId = null;

				mediaElement.on({

					'timeupdate' : (e) => {
						//controls.moveTimeMarker();
						this.player.trigger('timeupdate', { time : video.currentTime, duration : video.duration });
					},

					'loadedmetadata' : this._onLoadedMetaData.bind(this),

					'ended' : () => {
						this.pause();
						this.player.trigger('ended');

					},

					'dblclick' : () => {
						clearTimeout(timerId);
						this.fullscreen.toggle();
					},

					'click' : () => {
						clearTimeout(timerId);
						timerId = setTimeout(() => {
							container.focus()
							this.togglePlay();
						}, 300);
					},

					'volumechange' : (e) => {
						this.player.trigger('volumechange', { volume : this.volume });
					},

					'play' : (e) => {
						this.player.trigger('play');
					},

					'pause' : (e) => {
						this.player.trigger('pause');
					},

					'ratechange' : (e) => {
						this.player.trigger('ratechange', { volume : this.rate });
					},

					'canplay' : (e) => {
						loader.hide();
						this.player.trigger('canplay');
					},

					'waiting' : (e) => {
						loader.show();
						this.player.trigger('waiting');
					}

				});
			}

			_initCustomEvents () {
				let mediaElement = $(this._video);
			}
		}

		class ControlCollection  extends Component {
			constructor (player, options) {
				options = $.extend({}, {
					controls : player.options.controls[options.name] || [],
				}, options);
				super(player, options);
				this.items = {};
				this.active = options.active || false;
				this.name = options.name;
				this.controls = player.options.controls[this.name];
			}


			/**
			 * @override
			 */
			createElement() {
				const { name, controls } = this.options;

				this.element = $('<div/>').addClass(`leplayer-control-collection leplayer-control-collection-${name}`);

				controls.forEach( row => {
					let elemRow = $('<div/>').addClass(`leplayer-controls controls-${name}`);
					let hasTimeline = false;
					row.forEach(controlName => {
						if(controlName == C_TIMELINE) {
							hasTimeline = true
						}
						const control = controlFactory(this.player, controlName);
						elemRow.append(control.element);
					});
					if (!hasTimeline) {
						elemRow.css('width', '1px');
					}
					this.element.append(elemRow);
				})
				return this.element;

			}

			set download (value) {
				if (this.has(C_DOWNLOAD)) {
					this.items.download.link = value;
				}
			}

			set rate (value) {
				if (this.has(C_RATE)) {
					this.items.rate.value = value;
				}
			}

			set source (value) {
				if (this.has(C_SOURCE)) {
					this.items.source.set(value);
				}
			}

			set totalTime (value) {
				if (this.has(C_TIMELINE))
					this.items.timeline.totalTime.text = value;
			}

			set volume (value) {
				if (this.has(C_VOLUME))
					this.items.volume.value = value;
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


			init () {
				for (let i in this.items) {
					if (!this.items.hasOwnProperty(i)) continue;
					$.isFunction(this.items[i].init) && this.items[i].init();
				}
				this.initTimeline();
				this.download = sources[ 0 ].src;
			}

			initTimeline () {
				if (this.has(C_TIMELINE)) {
					if (this.items.timeline.element.width() < 20)
						this.items.timeline.element.hide();
				}
			}

			moveTimeMarker () {
				if (this.has(C_TIMELINE))
					this.items.timeline.move();
			}

			pause () {
				if (this.has(C_PLAY))
					this.items.play.pause();
			}

			play () {
				if (this.has(C_PLAY))
					this.items.play.play();
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

		class Controls {
			constructor (player) {
				this.collections = {
					common : new ControlCollection(player, { name : 'common' }),
					fullscreen : new ControlCollection(player, { name : 'fullscreen' })
				};
				this.collections.common.active = true;
			}

			get common () {
				console.log(this.collections.common);
				return this.collections.common;
			}

			get fullscreen () {
				return this.collections.fullscreen;
			}

			get mini () {
				return this.collections.mini;
			}

			set download (value) {
				for (var i in this.collections) {
					this.collections[ i ].download = value;
				}
			}

			set rate (value) {
				Cookie.set('rate', value);
				for (var i in this.collections) {
					this.collections[ i ].rate = value;
				}
			}

			set source (value) {
				for (var i in this.collections) {
					this.collections[ i ].source = value;
				}
			}

			set totalTime (value) {
				for (var i in this.collections) {
					this.collections[ i ].totalTime = value;
				}
			}

			set volume (value) {
				for (var i in this.collections) {
					this.collections[ i ].volume = value;
				}
				Cookie.set('volume', value);
			}

			set disable (value) {
				for (var i in this.collections) {
					this.collections[ i ].disable = value;
				}
			}

			has (name) {
				return (typeof this.collections[ name ] == 'object');
			}

			init () {
				for (var i in this.collections) {
					this.collections[ i ].init();
				}
				this.collections.common.show();
				//this.collections.mini.hide();
				this.collections.fullscreen.hide();

			}

			moveTimeMarker () {
				for (var i in this.collections)
					this.collections[ i ].moveTimeMarker();
			}

			pause () {
				for (var i in this.collections)
					this.collections[ i ].pause();
			}

			play () {
				for (var i in this.collections)
					this.collections[ i ].play();
			}
		}

		class Sections {
			constructor(items) {
				this.player = player;

				this.items = items;
				for ( let i = 0; i < this.items.length; i++) {
					let endSection;
					if (i < (this.items.length - 1)) {
						endSection = this.items[i+1].begin
					} else {
						endSection = video.duration;
					}
					this.items[i].end = endSection;
				}

				this.element = $('<div />').addClass('leplayer-sections');
				this.element.append(this._createSections(items));
				this.element.find('.leplayer-section').on('click', this.onSectionClick.bind(this));

				this._activeSection = this.getSectionByIndex(0);
				this.setActiveByIndex(0);

				this.player.trigger('sectionsinit', { items : this.items });

				this.player.on('section_toggle', (e) => {
					if (this.element.hasClass('leplayer-sections--hidden')) {
						this.element.removeClass('leplayer-sections--hidden');
					} else {
						this.element.addClass('leplayer-sections--hidden');
					}
				})

				this.player.on('timeupdate', this.onTimeUpdate.bind(this));
			}



			_createSections(items) {
				let result = '';
				items.forEach((section, index) => {
					let item = `
						<div class="leplayer-section ${!index ? 'leplayer-section--active' : ''}"
							data-time="${section.begin}" data-index="${index}">
							<div class="leplayer-section-time">${secondsToTime(section.begin)}</div>
							<div class="leplayer-section-info">
								<div class="leplayer-section-title">${section.title}</div>
								<div class="leplayer-section-description">${section.description}</div>
							</div>
						</div>
					`
					result += item;
				});
				return result;
			}

			onSectionClick(e) {
				let section = $(e.target).closest('.leplayer-section');
				console.log(secondsToTime(section.attr('data-time')));
				video.currentTime = section.attr('data-time');
			}

			setActiveByIndex(index) {
				if (this._activeSection.attr('data-index') == index) {
					return
				}
				this._activeSection.removeClass('leplayer-section--active');

				this._activeSection = this.getSectionByIndex(index);
				this._activeSection.addClass('leplayer-section--active');
				this.element.animate({
					scrollTop : this._activeSection.position().top
				}, 1000)
			}

			getSectionByIndex(index) {
				return this.element.find(`.leplayer-section[data-index="${index}"]`);
			}

			onTimeUpdate(e, data) {
				let currentTime = data.time;

				for (let i = 0; i < this.items.length; i++) {
					let section = this.items[i];
					if (currentTime < section.end) {
						this.setActiveByIndex(i);
						break;
					}
				}
			}
		}

		/**
		 * @class MiniPlayer
		 * @param {Player} player Main player
		 * @param {Object} [options]
		 * @extends Control
		 */
		class MiniPlayer extends Component {
			constructor (player, options ) {
				let width;
				if (player.options.miniplayer) {
					width = player.options.miniplayer.width;
				}
				options = $.extend({}, {
					visible : false,
					width
				}, options);

				super(player, options);
				if (!options.visible) {
					this.hide();
				}

				container.append(this.element);

				const self = this;
				$(window).scroll(function(e) {
					const scrollTop = $(this).scrollTop();
					const centerVideo = container.offset().top + videoContainer.height() / 2;

					if(scrollTop > centerVideo) {
						if(!miniPlayer.visible) {
							self.show();

						}
					} else {
						self.hide();
					}
				})

				$(window).resize(() => {
					if(this.visible) {
						this.updateVideoContainer();
					}
				})
			};

			/**
			 * Reset jquery CSS for container and video-container
			 *
			 * @private
			 */
			_resetCSS() {
				container.css({
					'padding-top' : ''
				})

				videoContainer.css({
					'left' : '',
					'transform' : '',
					'margin' : ''
				})
			}

			get height() {
				return this._height || (this._height = videoContainer.height);
			}

			/**
			 * Move video container under the miniplayer
			 */
			updateVideoContainer() {
				container.css({
					'padding-top' : videoContainer.height() + 'px'
				})
				container.addClass('leplayer-container--mini');

				const height = videoContainer.height();

				this.element.css({
					height
				});

				const videoWidth = videoContainer.width()
				videoContainer.css({
					'transform': `translateX(${(videoWidth / 2) - this.element.width() / 2}px)`
				})
			}

			/**
			 * Show mini player
			 *
			 * @public
			 */
			show() {
				this.visible = true;
				this.element.show()
				this.updateVideoContainer()
			}

			/**
			 * Hide mini player
			 *
			 * @public
			 */
			hide() {
				this.visible = false;
				this.element.hide();
				this._resetCSS()
				container.removeClass('leplayer-container--mini');
				this.element.css({
					height : ''
				})
			}

			/**
			 * @override
			 */
			createElement() {
				const { title = '', videoInfo = '' } = this.player.options;
				const controls = new ControlCollection(player, { name : 'mini' });
				const html = `
					<div class="leplayer-miniplayer">
						<div class="leplayer-miniplyaer__container">
						</div>
						<div class="leplayer-miniplayer__info">
							<div class="leplayer-miniplayer__title">${title}</div>
							<div class="leplayer-miniplayer__video-info">${videoInfo}</div>

							<div class="leplayer-miniplayer__controls">
							</div>
						</div>
						<div class="leplayer-miniplayer__section">
						</div>
					</div>
				`.trim();

				this.element = $('<div/>').html(html).contents();
				this.element.find('.leplayer-miniplayer__controls').append(controls.element);
				this.element.css({
					'max-width' : this.options.width
				})
				return this.element;
			}
		}

		var sources = this.sources =[];
		var subtitles = [];
		var volume = options.volume.default;
		var controls = this.controls;
		var video = null;
		this.video = video

		/**
		 * DOM container to hold video and all other stuff.
		 * @type object
		 */
		var container = null;
		var overlay = null;
		var loader = null;
		var sectionContainer = null;
		let miniPlayer = null;
		let videoContainer = null;

		let _createNotification = (opt) => {
			let notification, closeButton;
			notification = $('<div />')
				.addClass('leplayer-notification')
				.append(opt.text);
			return notification;
		}

		var _showNotification = (msg) => {
			let notification = _createNotification({ text: msg });
			notification = $('<div />')
				.addClass('leplayer-notification')
				.append(msg);
			container.append(notification);

		}

		var init = function () {
			// Check if element is correctly selected.
			if (element.prop('tagName').toLowerCase() != 'video') {
				console.warn('Incorrect element selected.');
				return this;
			}

			initOptions();
			// Set source.
			// @TODO move this to Video class
			element.children('source').each(function () {
				var src = $(this).attr('src');
				if (src) {
					sources.push({
						src : src,
						title : $(this).attr('title') || 'default'
					});
				}
			});
			if (sources.length == 0) {
				var src = element.attr('src');
				if (src) {
					sources.push({
						src : src,
						title : $(this).attr('title') || 'default'
					});
				}
			}
			if (sources.length == 0) {
				console.warn('No sources found.');
				return this;
			}

			video = player.video = new Video(element);

			/** TODO: Use promise to async run this */
			initDom();
			initControls();
			initHotKeys();
			video.init().done(() => {
				if(options.miniplayer) {
					miniPlayer = new MiniPlayer(player);
				}
				initSections();
				player.trigger('inited');
				console.log('inited');
			});


		};

		this.controls = controls;
		var initControls = function () {
			controls = new Controls(player);
			for (const name of ['common', 'fullscreen']) {
				if (!options.controls.hasOwnProperty(name)) return;
				const controlCollection = new ControlCollection(player, { name });
				controls.collections[name] = controlCollection;
				container.append(controlCollection.element);
			}
			if (controls.collections.common != null) {
				controls.collections.common.active = true;
			}
			//for (let name in options.controls) {
				//if (!controls.has(name)) continue;
				//for (let rowIndex in options.controls[ name ]) {
					//let row = options.controls[ name ][ rowIndex ],
						//hasTimeline = false,
						//rowElement = $('<div />').addClass('leplayer-controls controls-' + name);

					//for (let i in row) {
						//let controlName = row[ i ];

						//if (controlName == C_DIVIDER || !controls.collections[ name ].has(controlName)) {
							//// Create control only if divider or does not exist yet.
							//var c = controls.collections[ name ].add(controlName);
							//if (c != null) {
								//rowElement.append(c);
								//if (controlName == C_TIMELINE)
									//hasTimeline = true;
							//} else {
								//console.warn('Cannot create ' + controlName + ' control for collection ' + name + '.');
							//}
						//}
					//}
					//if (!hasTimeline)
						//rowElement.css('width', '1px');

					//rowElement.find('.divider + .divider').remove();

					//container.append(rowElement);
				//}
			//}
		};

		var initSections = function() {
			options.dataUrl && player.getData().done((data) => {
				let section = new Sections(data.sections);

				if (sectionContainer) {
					sectionContainer.append(section.element);
				} else {
					videoContainer.append(section.element);
				}
			});
		}


		var initDom = function () {
			overlay = $('<div />')
				.addClass('play-overlay')
				.append(new Icon(player, { iconName : 'play' }).element)
				.on({
					'click'	: (e) => { element.trigger('click'); },
					'dblclick' : (e) => { element.trigger('dblclick'); }
				});

			loader = $('<div />')
				.addClass('leplayer-loader-container')
				.append(new Icon(player, {
					iconName : 'refresh',
					className : 'leplayer-icon-spin'
					}).element)
				.hide();

			videoContainer = $('<div />')
				.addClass('leplayer-video')
				.append(overlay)
				.append(loader);

			container = $('<div />')
				.addClass('leplayer-container')
				.append(videoContainer)
				.attr('tabindex', 0)
				//.css('width', element.width() + 'px');
				.css('width', '100%')
				.css('max-width', (options.width || video.width) + 'px')


			if(options.sectionContainer) {
				sectionContainer = $(options.sectionContainer).addClass('leplayer-section-container');
			}

			element.before(container);
			videoContainer.append(element);
		};

		var initHotKeys = function () {

			let isKeyBinding = (e, binding) => {
				return ((e.which === binding.key) || (e.key === binding.key)) &&
						(!!binding.shiftKey == e.shiftKey) &&
						(!!binding.ctrlKey == e.ctrlKey)
			}

			$(container).bind('keydown.leplayer.hotkey', (e) => {
				let _isFocused = isFocused();
				if (_isFocused) {
					options.keyBinding.forEach(binding => {
						if( isKeyBinding(e, binding) ) {
							e.preventDefault();
							binding.fn(video);
							return false;
						}
					})
				}
			})
		};

		var initOptions = function () {
			let height, width, poster, attrs, preload;
			element.removeAttr('controls');

			height = element.attr('height');
			if (height) {
				options.height = height + 'px';
				element.removeAttr('height');
			}
			//element.css('height', options.height);

			width = element.attr('width');
			if (width) {
				options.width = width + 'px';
				element.removeAttr('width');
			}
			//element.css('width', options.width);

			poster = element.attr('poster');
			if (poster)
				options.poster = poster;
			else if (options.poster)
				element.attr('poster', options.poster);

			attrs = [ 'autoplay', 'loop', 'muted' ];
			attrs.forEach((item) => {
				var a = element.attr(item);
				if (a) {
					options[ item ] = true;
				} else if (options[ item ]) {
					element.attr(item, '');
				} else {
					element.removeAttr(item);
				}
				element.prop(item, options[ item ]);
			})

			preload = element.attr('preload');
			if (preload) {
				preload = preload.toLowerCase();
				if (preload == 'none' || preload == 'metadata')
					options.preload = preload;
				else
					options.preload = 'auto';
			}

			if (options.sources) {
				if (Array.isArray(options.sources)) {
					options.sources.forEach((item) => {
						let source = $('<source />');
						if (typeof item === 'string') {
							source.attr('src', item)
						} else {
							source.attr('src', item.src)
						}
						source.attr('title', item.title || 'default');
						element.append(source);
					})
				} else if (typeof options.sources === 'string') {
					element.attr('src', options.sources)
				}
			}
			element.attr('preload', options.preload);
		};

		var secondsToTime = function (seconds) {
			var h = Math.floor(seconds / 3600);
			var m = Math.floor(seconds % 3600 / 60);
			var s = Math.floor(seconds % 3600 % 60);
			var out = '';
			if (h > 0)
				out = h + ':';
			if (m < 10)
				out += '0';
			out += m + ':';
			if (s < 10)
				out += '0';
			out += s;
			return out;
		};


		var isFocused = function () {
			let focused = $(container).find(':focus');
			return (focused.length > 0) || $(container).is(':focus');
		}

		init();

		return this;
	};


	window.$.fn.lePlayer = function (options) {
		return this.each(function () {
			return new Player($(this), options);
		});
	};
}(jQuery));
