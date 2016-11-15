/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _defaultOptions;

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _ControlCollection = __webpack_require__(2);

	var _ControlCollection2 = _interopRequireDefault(_ControlCollection);

	var _Control = __webpack_require__(6);

	var _Control2 = _interopRequireDefault(_Control);

	var _Component = __webpack_require__(3);

	var _Component2 = _interopRequireDefault(_Component);

	var _MiniPlayer = __webpack_require__(26);

	var _MiniPlayer2 = _interopRequireDefault(_MiniPlayer);

	var _PlayButton = __webpack_require__(27);

	var _PlayButton2 = _interopRequireDefault(_PlayButton);

	var _Icon = __webpack_require__(7);

	var _Icon2 = _interopRequireDefault(_Icon);

	var _Sections = __webpack_require__(28);

	var _Sections2 = _interopRequireDefault(_Sections);

	var _ErrorDisplay = __webpack_require__(29);

	var _ErrorDisplay2 = _interopRequireDefault(_ErrorDisplay);

	var _Poster = __webpack_require__(30);

	var _Poster2 = _interopRequireDefault(_Poster);

	var _FullscreenApi = __webpack_require__(31);

	var _FullscreenApi2 = _interopRequireDefault(_FullscreenApi);

	var _ControlFactory = __webpack_require__(4);

	var _cookie = __webpack_require__(10);

	var _cookie2 = _interopRequireDefault(_cookie);

	var _utils = __webpack_require__(14);

	var _MediaError = __webpack_require__(32);

	var _MediaError2 = _interopRequireDefault(_MediaError);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	/**
	 * Return array with excluded dist's items from source array
	 *
	 * @param {Array} source
	 * @param {Array} dist
	 * @return {Array}
	 */
	function excludeArray(source, dist) {
		var result = [].concat(source);
		dist.forEach(function (item) {
			var index = result.indexOf(item);
			if (index > -1) {
				result.splice(index, 1);
				return;
			}
		});

		return result;
	}

	var defaultOptions = (_defaultOptions = {
		miniplayer: false,
		autoplay: false,
		height: 'auto',
		loop: false,
		muted: false,
		preload: 'metadata',
		poster: null,
		svgPath: '../dist/svg/svg-defs.svg',
		innactivityTimeout: 10000,
		fullscreen: {
			hideTimelineTime: 10000
		},
		rate: {
			step: 0.25,
			min: 0.5,
			max: 4.0,
			'default': 1
		},
		playback: {
			step: {
				short: 5,
				medium: 10,
				long: 30
			}
		},
		controls: {
			common: [['play', 'volume', 'divider', 'timeline', 'divider', 'section', 'divider', 'fullscreen'], ['rate', 'divider', 'backward', 'divider', 'source', 'divider', 'subtitle', 'divider', 'download', 'divider', _ControlFactory.C_KEYBINDING_INFO]],
			fullscreen: [['play', 'volume', 'divider', 'timeline', 'divider', 'rate', 'divider', _ControlFactory.C_KEYBINDING_INFO, 'divider', 'backward', 'divider', 'source', 'divider', 'subtitle', 'divider', 'download', 'divider', 'section', 'divider', 'fullscreen']],
			mini: [['play', 'volume', 'divider', 'fullscreen', 'divider', 'timeinfo']]
		},
		volume: {
			default: 0.4,
			mutelimit: 0.05,
			step: 0.1
		},
		keyBinding: [{
			key: 32,
			info: ['Space'],
			description: 'Начать проигрывание / поставить на паузу',
			fn: function fn(player) {
				player.video.togglePlay();
			}
		}, {
			key: 37,
			info: ['←'],
			description: '\u041F\u0435\u0440\u0435\u043C\u043E\u0442\u0430\u0442\u044C \u043D\u0430 10 \u0441\u0435\u043A\u0443\u043D\u0434 \u043D\u0430\u0437\u0430\u0434',
			fn: function fn(player) {
				player.video.currentTime -= player.options.playback.step.medium;
			}
		}, {
			key: 39,
			info: ['→'],
			description: '\u041F\u0435\u0440\u0435\u043C\u043E\u0442\u0430\u0442\u044C \u043D\u0430 10 \u0441\u0435\u043A\u0443\u043D\u0434 \u0432\u043F\u0435\u0440\u0451\u0434',
			fn: function fn(player) {
				player.video.currentTime += player.options.playback.step.medium;
			}
		}, {
			shiftKey: true,
			info: ['Shift', '←'],
			description: 'Перейти на предыдущую секцию',
			key: 37,
			fn: function fn(player) {
				if (player.sections == null) {
					return;
				}
				player.sections.prev();
			}
		}, {
			shiftKey: true,
			key: 39,
			info: ['Shift', '→'],
			description: 'Перейти на следующую секцию',
			fn: function fn(player) {
				if (player.sections == null) {
					return;
				}
				player.sections.next();
			}
		}, {
			key: 38,
			info: ['↑'],
			description: 'Увеличить громкость',
			fn: function fn(player) {
				player.video.volume += player.options.volume.step;
			}
		}, {
			key: 40,
			info: ['↓'],
			description: 'Уменьшить громкость',
			fn: function fn(player) {
				player.video.volume -= player.options.volume.step;
			}
		}, {
			key: 70,
			info: ['f'],
			description: 'Открыть/закрыть полноэкраный режим',
			fn: function fn(player) {
				player.toggleFullscreen();
			}
		}]
	}, _defineProperty(_defaultOptions, 'miniplayer', {
		width: '100%',
		offsetShow: function offsetShow(player) {
			// 80px - it's height of common controls container
			var offset = player.element.offset().top + player.element.outerHeight() - 80;

			return offset;
		}
	}), _defineProperty(_defaultOptions, 'onPlayerInited', function onPlayerInited() {}), _defaultOptions);

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
	 * @param {Number} [options.fullscreen.hideTimelineTime=10000] Delay before hide timeline in fullscreen view
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
	 * @param {String[]} [options.controls.mini] Array of control for miniplayer
	 * @param {Object} [options.excludeControls] Object of exclude controls. Structure is the same as that of options.controls
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
	 * @param {String} [options.miniplayer.width] Width of miniplayer container
	 * @param {String} [options.miniplayer.width] MiniPlayer's width
	 * @param {String} [options.sectionContainer] Selector for sections
	 * @param {Object} [options.plugins] Keys of objects are name of plugin, value - plugin options
	 * @param {String|Object} [options.data] Url or JSON with data for player
	 * @param {Array} [options.data.sections] Sections array
	 */
	var Player = function Player(element, options) {
		var _this10 = this;

		var self = this;
		var player = this;
		var subtitles = [];

		var fsApi = _FullscreenApi2.default;
		// key -> contol collection name, valuy -> ControlCollection
		this.controls = {};

		// Entity component
		this.video = null;

		this.sections = null;

		/**
	  * DOM container to hold video and all other stuff.
	  * @type object
	  */

		this.element = (0, _utils.createEl)('div');
		var loader = null;
		var sectionContainer = null;
		var videoContainer = this.videoContainer = null;
		this._userActivity = false;

		this.innerElement = (0, _utils.createEl)('div');

		var Video = function () {
			function Video(player, ctx) {
				_classCallCheck(this, Video);

				this.player = player;
				this._ctx = ctx;
				this._video = ctx[0];
				this.element = (0, _jquery2.default)(this._video);
				this.subtitles = [];
				this.bufferRanges = [];
				this.playbackRate = this._video.playbackRate;
				this._initHtmlEvents();

				if ((0, _jquery2.default)(this._video).attr('src') == null) {
					this.source = this.player.options.src;
				}
			}

			_createClass(Video, [{
				key: 'init',
				value: function init() {
					var _this = this;

					var dfd = _jquery2.default.Deferred();
					this._initSubtitles();
					this._initVideo().done(function () {
						//this.fullscreen = new Fullscreen(this.player);
						//this.fullscreen.init();
						_this._initRate();
						_this._initVolume();

						// temporary solution for poster usage
						// this.startBuffering();


						dfd.resolve();
					});
					return dfd.promise();
				}
			}, {
				key: 'startBuffering',
				value: function startBuffering() {
					var _this2 = this;

					var volume = this.volume;
					this.volume = 0;
					return this.play().then(function () {
						return _this2.pause();
					}).then(function () {
						_this2.currentTime = 0;
						_this2.volume = volume;
					});
				}
			}, {
				key: 'togglePlay',
				value: function togglePlay() {
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
			}, {
				key: 'seek',
				value: function seek(time) {
					this._video.currentTime = time;
				}
			}, {
				key: 'play',
				value: function play() {
					var dfd = _jquery2.default.Deferred();
					var playPromise = this._video.play();

					if (playPromise != null) {
						playPromise.then(function () {
							dfd.resolve();
						});
					} else {
						dfd.resolve();
					}
					return dfd.promise();
				}
			}, {
				key: 'pause',
				value: function pause() {
					var dfd = _jquery2.default.Deferred();
					var pausePromise = this._video.pause();

					if (pausePromise != null) {
						pausePromise.then(function () {
							dfd.resolve();
						});
					} else {
						dfd.resolve();
					}
					return dfd.promise();
				}
			}, {
				key: 'trigger',
				value: function trigger(eventName) {
					var _player$trigger;

					for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
						args[_key - 1] = arguments[_key];
					}

					(_player$trigger = this.player.trigger).call.apply(_player$trigger, [(0, _jquery2.default)(this._video), 'leplayer_' + eventName].concat(args));
					return this;
				}
			}, {
				key: 'on',
				value: function on(eventName) {
					var _$$on;

					for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
						args[_key2 - 1] = arguments[_key2];
					}

					(_$$on = (0, _jquery2.default)(this._video).on).call.apply(_$$on, [(0, _jquery2.default)(this._video), 'leplayer_' + eventName].concat(args));
					return this;
				}
			}, {
				key: '_initRate',
				value: function _initRate() {
					this.rate = this.defaultRate;
				}
			}, {
				key: '_initVolume',
				value: function _initVolume() {
					this.volume = this.defaultVolume;
				}
			}, {
				key: '_initSubtitles',
				value: function _initSubtitles() {
					var _self = this;
					this._ctx.children('track[kind="subtitles"]').each(function () {
						var language = (0, _jquery2.default)(this).attr('srclang');
						var title = (0, _jquery2.default)(this).attr('label');
						var src = (0, _jquery2.default)(this).attr('src');
						if (title.length > 0 && src.length > 0) {
							_self.subtitles.push({
								title: title,
								src: src,
								language: language
							});
						}
					});
				}
			}, {
				key: '_initVideo',
				value: function _initVideo() {
					var _this3 = this;

					var dfd = _jquery2.default.Deferred();
					if (this._video.readyState > HTMLMediaElement.HAVE_NOTHING) {
						dfd.resolve();
						this._textTracksHack();
					} else {
						(0, _jquery2.default)(this._video).one('loadedmetadata', function (e) {
							dfd.resolve();
							_this3._textTracksHack();
						});
					}
					dfd.notify();
					return dfd.promise();
				}
			}, {
				key: '_textTracksHack',
				value: function _textTracksHack() {

					// This is generally for Firefox only
					// because it somehow resets track list
					// for video element after DOM manipulation.

					if (this._video.textTracks.length == 0 && this.subtitles.length > 0) {
						this._ctx.children('track[kind="subtitles"]').remove();
						for (var i in this.subtitles) {
							if (this.subtitles.hasOwnProperty(i)) {
								this._ctx.append((0, _jquery2.default)('<track/>').attr('label', this.subtitles[i].title).attr('src', this.subtitles[i].src).attr('srclang', this.subtitles[i].language).attr('id', this.subtitles[i].language).attr('kind', 'subtitles'));
							}
						}
					}
				}
			}, {
				key: '_initHtmlEvents',
				value: function _initHtmlEvents() {
					var _this4 = this,
					    _mediaElement$on;

					var mediaElement = (0, _jquery2.default)(this._video);

					mediaElement.one({
						'play': function play(e) {
							_this4.player.trigger('firstplay');
							_this4.player.removeClass('leplayer--virgin');
						}
					});

					mediaElement.on((_mediaElement$on = {

						'loadstart': function loadstart(e) {
							_this4.player.setError(null);
							_this4.player.removeClass('leplayer--ended');
							_this4.player.trigger('loadstart');
						},

						'durationchange': function durationchange(e) {
							_this4.player.trigger('durationchange');
						},

						'timeupdate': function timeupdate(e) {
							//controls.moveTimeMarker();
							if (_this4.currentTime > 0) {
								_this4.player.removeClass('leplayer--virgin');
							};
							_this4.player.trigger('timeupdate', { time: _this4.currentTime, duration: _this4.duration });
						},

						'ended': function ended() {
							_this4.pause();
							_this4.player.trigger('ended');
						},

						'progress': function progress() {
							_this4.player.trigger('progress');
						},

						'dblclick': function dblclick() {
							_this4.player.trigger('dblclick');
						},

						'click': function click() {
							_this4.player.trigger('click');
						},

						'volumechange': function volumechange(e) {
							_this4.player.trigger('volumechange', { volume: _this4.volume });
						},

						'play': function play(e) {
							_this4.player.removeClass('leplayer--ended');
							_this4.player.removeClass('leplayer--paused');
							_this4.player.addClass('leplayer--playing');

							_this4.player.trigger('play');
						},

						'pause': function pause(e) {
							_this4.player.removeClass('leplayer--playing');
							_this4.player.addClass('leplayer--paused');
							_this4.player.trigger('pause');
							//overlay.show()
						},

						'playing': function playing(e) {
							_this4.player.removeClass('leplayer--waiting');
							_this4.player.trigger('playing');
						},

						'ratechange': function ratechange(e) {
							_this4.player.trigger('ratechange', { rate: _this4.rate });
						},

						'canplay': function canplay(e) {
							//loader.hide();
							_this4.player.trigger('canplay');
						}

					}, _defineProperty(_mediaElement$on, 'ended', function ended(e) {
						_this4.player.addClass('leplayer--ended');
						if (_this4.player.options.loop) {
							_this4.currentTime(0);
							_this4.play();
						} else if (!_this4._video.paused) {
							_this4.pause();
						}
						_this4.player.trigger('ended');
					}), _defineProperty(_mediaElement$on, 'canplaythrough', function canplaythrough(e) {
						_this4.player.removeClass('leplayer--waiting');
						_this4.player.trigger('canplaythrough');
					}), _defineProperty(_mediaElement$on, 'waiting', function waiting(e) {
						//loader.show();
						_this4.player.addClass('leplayer--waiting');
						_this4.player.trigger('waiting');
						_this4.player.one('timeupdate', function () {
							return _this4.player.removeClass('leplayer--waiting');
						});
					}), _defineProperty(_mediaElement$on, 'error', function error(e) {
						_this4.player.setError(new _MediaError2.default(e.target.error.code));
					}), _mediaElement$on));
				}
			}, {
				key: 'currentTime',
				get: function get() {
					return this._video.currentTime;
				},
				set: function set(value) {
					if (value > this.duration) {
						this._video.currentTime = this.duration;
					} else if (value < 0) {
						this._video.currentTime = 0;
					} else {
						this._video.currentTime = value;
					}
				}
			}, {
				key: 'duration',
				get: function get() {
					return this._video.duration;
				}
			}, {
				key: 'height',
				get: function get() {
					return this._video.clientHeight;
				}
			}, {
				key: 'width',
				get: function get() {
					return this._video.clientWidth;
				}
			}, {
				key: 'rate',
				get: function get() {
					return this._video.playbackRate;
				},
				set: function set(value) {
					var player = this.player;
					if (value <= player.options.rate.max && value >= player.options.rate.min) {
						this._video.playbackRate = value;
						_cookie2.default.set('rate', value);
					}
					/** TODO: Chanche controls.rate in event handler */
					//controls.rate = this._video.playbackRate;
				}
			}, {
				key: 'defaultRate',
				get: function get() {
					return _cookie2.default.get('rate') || player.options.rate.default;
				}
			}, {
				key: 'source',
				set: function set(src) {
					if (this.source && this.source.url === src.url) return;
					var time = this._video.currentTime;
					var rate = this._video.playbackRate;
					var stop = this._video.paused;

					(0, _jquery2.default)(this._video).attr('src', src.url);

					this._video = this._ctx[0];

					this._video.playbackRate = rate;

					this._video.currentTime = time;

					this._source = src;

					if (stop) {
						this.pause();
					} else {
						this.play();
					}
				},
				get: function get() {
					return this._source;
				}
			}, {
				key: 'track',
				set: function set(value) {
					for (var i = 0; i < this._video.textTracks.length; i++) {
						if (this._video.textTracks[i].language == value) this._video.textTracks[i].mode = 'showing';else this._video.textTracks[i].mode = 'hidden';
					}
				}
			}, {
				key: 'volume',
				get: function get() {
					return this._video.volume;
				},
				set: function set(value) {
					var player = this.player;
					if (value > 1) {
						this._video.volume = 1;
					} else if (value < player.options.volume.mutelimit) {
						this._video.volume = 0;
					} else {
						this._video.volume = value;
						_cookie2.default.set('volume', value);
					}
					this._video.mute = value < player.options.volume.mutelimit;
				}
			}, {
				key: 'defaultVolume',
				get: function get() {
					return _cookie2.default.get('volume') || player.options.volume.default;
				}
			}, {
				key: 'buffered',
				get: function get() {
					return this._video.buffered;
				}

				/**
	    * @return {TimeRanges}
	    */

			}, {
				key: 'seekable',
				get: function get() {
					return this._video.seekable;
				}

				/**
	    * @return {TimeRanges}
	    */

			}, {
				key: 'played',
				get: function get() {
					return this._video.played;
				}
			}, {
				key: 'playedPercentage',
				get: function get() {
					var result = 0;
					for (var i = 0; i < this.played.length; i++) {
						result += this.played.end(i) - this.played.start(i);
					}

					return result / this.duration * 100;
				}
			}]);

			return Video;
		}();

		/* TODO: Вынести все методы в прототип */


		this.init = function () {
			var _this5 = this;

			// Check if element is correctly selected.
			if (element.prop('tagName').toLowerCase() != 'video') {
				console.warn('Incorrect element selected.');
				return this;
			}

			this.initOptions();

			/** TODO: Use promise to async run this */
			this.initDom();
			this.video = new Video(this, element);
			this.initControls();
			this.initHotKeys();
			this.initSections().then(function (data) {
				_this5.sections = data.sectionsComponent;
				_this5.trigger('sectionsinit', data);
			});
			this.video.init().then(function () {
				_this5.trigger('inited');
				_this5._initPlugins();
			});
		};

		this.initControls = function () {
			//controls = new Controls(player);
			var _arr = ['common', 'fullscreen'];
			for (var _i = 0; _i < _arr.length; _i++) {
				var name = _arr[_i];
				if (!this.options.controls.hasOwnProperty(name)) return;
				var controlCollection = new _ControlCollection2.default(this, { name: name });
				this.controls[name] = controlCollection;
				this.element.append(controlCollection.element);
			}
			if (this.controls.common != null) {
				this.controls.common.active = true;
			}
		};

		this.initSections = function () {
			var _this6 = this;

			var dfd = _jquery2.default.Deferred();
			if (this.options.data == null) {
				dfd.reject(null);
			} else {
				this.getSectionData().done(function (sections) {
					sections = [].concat(_toConsumableArray(sections));

					var isSectionOutside = sectionContainer && sectionContainer.length > 0;

					if (sections == null || sections.length == 0) {
						dfd.reject(null);
						return;
					}

					for (var i = 0; i < sections.length; i++) {
						var endSection = void 0;
						if (i < sections.length - 1) {
							endSection = sections[i + 1].begin;
						} else {
							endSection = _this6.video.duration;
						}
						sections[i].end = endSection;
					}

					var sectionsComponent = new _Sections2.default(_this6, {

						items: sections,
						fullscreenOnly: isSectionOutside
					});

					_this6.innerElement.append(sectionsComponent.element);

					if (isSectionOutside) {
						var outsideSections = new _Sections2.default(player, {
							items: sections,
							main: false
						});
						sectionContainer.append(outsideSections.element);
					}
					dfd.resolve({ sectionsComponent: sectionsComponent, items: sections });
				});
			}

			return dfd.promise();
		};

		this.initDom = function () {
			var _this7 = this;

			var options = this.options;
			this.errorDisplay = new _ErrorDisplay2.default(this);
			this.playButton = new _PlayButton2.default(this);

			[

			// Remove controls because we dont not support native controls yet
			'controls', 'poster',

			// It is unnecessary attrs, this functionality solve CSS
			'height', 'width'].forEach(function (item) {
				element.removeAttr(item);
			});

			// Set attrs from options
			['preload', 'autoplay', 'loop', 'muted'].forEach(function (item) {
				if (_this7.options[item]) {
					element.attr(item, _this7.options[item]);
					element.prop(item, _this7.options[item]);
				}
			});

			element.find('source[data-quality]').each(function (i, item) {
				(0, _jquery2.default)(item).remove();
			});

			// TODO: Вынести это в отдельнеый компонент

			loader = (0, _jquery2.default)('<div />').addClass('leplayer-loader-container').append(new _Icon2.default(this, {
				iconName: 'refresh',
				className: 'leplayer-icon-spin'
			}).element);

			this.videoContainer = (0, _utils.createEl)('div', {
				className: 'leplayer-video'
			}).append(this.playButton.element).append(loader);

			if (options.poster) {
				this.poster = new _Poster2.default(this);
				this.videoContainer.append(this.poster.element);
			}

			if (options.miniplayer) {
				this.miniPlayer = new _MiniPlayer2.default(this);
			}

			this.innerElement = (0, _jquery2.default)('<div />').addClass('leplayer__inner').append(this.videoContainer).append((0, _utils.createEl)('div', {
				className: 'leplayer__info'
			}).append((0, _utils.createEl)('div', {
				className: 'leplayer__title',
				html: this.options.title || ""
			})).append((0, _utils.createEl)('div', {
				className: 'leplayer__video-info',
				html: this.options.videoInfo || ""
			})).append(this.miniPlayer && this.miniPlayer.element));
			//.append($('leplayer__video-info')
			//.text(this.options.videoInfo || ""))

			this.element = this.element.addClass('leplayer').append(this.innerElement).append(this.errorDisplay.element).attr('tabindex', 0).css('width', '100%').css('max-width', (options.width || this.video.width) + 'px');

			this.addClass('leplayer--paused');
			this.addClass('leplayer--virgin');

			if (options.sectionContainer) {
				sectionContainer = (0, _jquery2.default)(options.sectionContainer);
			}

			element.before(this.element);
			this.videoContainer.append(element);
		};

		this.initHotKeys = function () {
			var _this8 = this;

			var isKeyBinding = function isKeyBinding(e, binding) {
				return (e.which === binding.key || e.key === binding.key) && !!binding.shiftKey == e.shiftKey && !!binding.ctrlKey == e.ctrlKey;
			};

			(0, _jquery2.default)(this.element).bind('keydown.leplayer.hotkey', function (e) {
				var _isFocused = isFocused();
				if (_isFocused) {

					_this8.options.keyBinding.forEach(function (binding) {

						if (isKeyBinding(e, binding)) {
							e.preventDefault();
							binding.fn(_this8);
							return false;
						}
					});
				}
			});
		};

		this.optionsFromElement = function () {
			// Copy video attrs to the opitons
			var attrOptions = ['height', 'width', 'poster', 'autoplay', 'loop', 'muted', 'preload'].reduce(function (obj, item) {
				var val = element.attr(item);
				if (val != null) {
					obj[item] = element.attr(item);
				}
				return obj;
			}, {});

			attrOptions.sources = [];

			// Src it is main source, that will be load
			if (element.attr('src')) {
				attrOptions.src = {
					url: element.attr('src'),
					title: element.attr('data-quality') || element.attr('title') || 'default'
				};
			}

			// Copy sources from HTML5 source element with data-quality attr
			// If data-quality attr does not exist - no
			element.find('source').each(function (i, item) {
				item = (0, _jquery2.default)(item);
				if (!item.attr('data-quality')) {
					return;
				}
				attrOptions.sources = attrOptions.sources.concat({
					url: item.attr('src'),
					title: item.attr('data-quality') || item.attr('title') || 'default'
				});
			});

			if (attrOptions.src == null && attrOptions.sources.length > 0) {
				attrOptions.src = attrOptions.sources[0];
			}

			return attrOptions;
		};

		this.initOptions = function () {
			var _this9 = this;

			var attrOptions = this.optionsFromElement();
			// Merge default options + video attributts + user options
			this.options = _jquery2.default.extend(true, defaultOptions, attrOptions, options);

			if (this.options.src == null) {
				this.setError(new _MediaError2.default('No sources found'));
			}

			// exclude controls option

			var _loop = function _loop(name) {
				if (!_this9.options.excludeControls.hasOwnProperty(name)) return {
						v: void 0
					};
				var controlCollection = _this9.options.excludeControls[name];
				controlCollection.forEach(function (row, index) {
					if (_this9.options.controls[name] && _this9.options.controls[name][index]) {
						_this9.options.controls[name][index] = excludeArray(_this9.options.controls[name][index], row);
					}
				});
			};

			for (var name in this.options.excludeControls) {
				var _ret = _loop(name);

				if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
			}
		};

		var isFocused = function isFocused() {
			var focused = (0, _jquery2.default)(_this10.element).find(':focus');
			return focused.length > 0 || (0, _jquery2.default)(_this10.element).is(':focus');
		};

		this.init();

		this._listenUserActivity();

		(0, _jquery2.default)(document).on(fsApi.fullscreenchange, this._onEntityFullscrenChange.bind(this));

		this.on('fullscreenchange', this.onFullscreenChange.bind(this));
		this.on('click', this.onClick.bind(this));
		this.on('dblclick', this.onDbclick.bind(this));
		this.on('inited', this.options.onPlayerInited.bind(this));

		return this;
	};

	/**
	 * @access private
	 *
	 * Function, than init all plugins from player options.
	 * If plugin doesn't exist throw an error
	 * @returns {Player} this
	 *
	 */
	Player.prototype._initPlugins = function () {
		if (this.options.plugins) {
			for (var name in this.options.plugins) {
				if (!this.options.plugins.hasOwnProperty(name)) return;
				var pluginOptions = this.options.plugins[name];
				if (this[name]) {
					this[name](pluginOptions);
				} else {
					console.error('Plugin \'' + name + '\' doesn\'t exist');
				}
			}
		}

		return this;
	};

	/**
	 * Static helper for creating a plugins for leplayer
	 *
	 * @access public
	 * @static
	 * @param {String} name The name of plugin
	 * @param {Function} fn Plugin init function
	 *
	 * @example
	 * Player.plugin('helloWorld', function(pluginOptions) {
	 *    const player = this;
	 *    player.on('click', () => console.log('Hello world'));
	 * })
	 *
	 */
	Player.plugin = function (name, fn) {
		;
		Player.prototype[name] = fn;
	};

	/**
	 * @access private
	 */
	Player.prototype._view = 'common';

	/**
	 * Emit a player event (the name of event would be a leplayer_smth)
	 *
	 * @access public
	 * @param {String} eventName
	 * @param {Arguments} ...args jQuery.fn.on other arguments
	 * @returns {Player} this
	 */
	Player.prototype.trigger = function (eventName) {
		var _element$trigger;

		var event = _jquery2.default.Event('leplayer_' + eventName, { player: this });

		for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
			args[_key3 - 1] = arguments[_key3];
		}

		(_element$trigger = this.element.trigger).call.apply(_element$trigger, [this.element, event].concat(args));
		return this;
	};

	/**
	 * Listen a player event with leplayer_ suffix
	 *
	 * @access public
	 * @param {String} eventName
	 * @param {Arguments} ...args jQuery.fn.on other arguments
	 * @returns {Player} this
	 */
	Player.prototype.on = function (eventName) {
		var _element$on;

		for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
			args[_key4 - 1] = arguments[_key4];
		}

		(_element$on = this.element.on).call.apply(_element$on, [this.element, 'leplayer_' + eventName].concat(args));
		return this;
	};

	Player.prototype.one = function (eventName) {
		var _element$one;

		for (var _len5 = arguments.length, args = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
			args[_key5 - 1] = arguments[_key5];
		}

		(_element$one = this.element.one).call.apply(_element$one, [this.element, 'leplayer_' + eventName].concat(args));
	};

	/**
	 * Add the CSS class for general leplayer DOM element
	 *
	 * @access public
	 * @param {String} className Name of class (not a selector, it's mean, that string sould be without point at the start)
	 * @returns {Player} this
	 */
	Player.prototype.addClass = function (className) {
		this.element.addClass(className);
		return this;
	};

	/**
	 * Remove the CSS class from general leplayer DOM element
	 *
	 * @access public
	 * @param {String} className Name of class
	 * @returns {Player} this
	 */
	Player.prototype.removeClass = function (className) {
		this.element.removeClass(className);
		return this;
	};

	/**
	 * Toggle the CSS class from general leplayer DOM element
	 *
	 * @access public
	 * @param {String} className
	 * @param {Boolean} flag
	 * @returns {Player} this
	 */
	Player.prototype.toggleClass = function (className, flag) {
		this.element.toggleClass(className, flag);
		return this;
	};

	/**
	 * Set player view
	 *
	 * @access public
	 * @param {String} view Can be 'common', 'fullscreen', 'mini'
	 * @returns {Player} this
	 */
	Player.prototype.setView = function (view) {
		this.element.removeClass('leplayer--' + this._view).addClass('leplayer--' + view);
		this._view = view;
		return this;
	};

	/**
	 * Return the view of player
	 *
	 * @access public
	 * @returns {String}
	 */
	Player.prototype.getView = function () {
		return this._view;
	};

	/**
	 * Show player error if param value not null. Also trigger player event 'error'
	 *
	 * @param {String|MediaError} value
	 * @returns {Player} this
	 */
	Player.prototype.setError = function (value) {
		if (value === null) {
			this._error = null;
			this.removeClass('leplayer--error');
			if (this.errorDisplay) {
				this.errorDisplay.element.hide();
			}
			return this;
		}
		this._error = new _MediaError2.default(value);

		this.addClass('leplayer--error');
		this.trigger('error', { error: this._error });

		return this;
	};

	/**
	 * @access private
	 */
	Player.prototype._listenUserActivity = function () {
		var _this11 = this;

		var mouseInProgress = void 0;
		var lastMoveX = void 0;
		var lastMoveY = void 0;

		var onMouseMove = function onMouseMove(e) {
			if (e.screenX !== lastMoveX || e.screenY !== lastMoveY) {
				lastMoveX = e.screenX;
				lastMoveY = e.screenY;
				_this11._userActivity = true;
			}
		};

		var onMouseDown = function onMouseDown(e) {
			_this11._userActivity = true;

			// While user is pressing mouse or touch, dispatch user activity
			clearInterval(mouseInProgress);

			mouseInProgress = setInterval(function () {
				_this11._userActivity = true;
			}, 250);
		};

		var onMouseUp = function onMouseUp(e) {
			_this11._userActivity = true;
			clearInterval(mouseInProgress);
		};

		this.element.on('mousemove', onMouseMove);

		this.element.on('mousedown', onMouseDown);

		this.element.on('mouseup', onMouseUp);

		this.element.on('keydown', function (e) {
			return _this11._userActivity = true;
		});
		this.element.on('keyup', function (e) {
			return _this11._userActivity = true;
		});

		// See http://ejohn.org/blog/learning-from-twitter/
		var inactivityTimeout = void 0;
		var delay = this.options.innactivityTimeout;
		setInterval(function () {
			if (_this11._userActivity) {

				// Reset user activuty tracker
				_this11._userActivity = false;

				_this11.setUserActive(true);

				clearTimeout(inactivityTimeout);

				if (delay > 0) {

					inactivityTimeout = setTimeout(function () {
						if (!_this11._userActivity) {
							_this11.setUserActive(false);
						}
					}, delay);
				}
			}
		}, 250);
	};

	/**
	 * @access private
	 */
	Player.prototype._dblclickTimerId = null;

	Player.prototype.onClick = function (e) {
		var _this12 = this;

		clearTimeout(this._dblclickTimerId);
		this._dblclickTimerId = setTimeout(function () {
			_this12.element.focus();
			_this12.togglePlay();
		}, 300);
	};

	/**
	 * On dblclick on the video player event handler
	 *
	 * @access public
	 * @param {Event} e
	 */
	Player.prototype.onDbclick = function (e) {
		clearTimeout(this._dblclickTimerId);
		this.toggleFullscreen();
	};

	/**
	 * @access public
	 * @params {Boolean} value
	 */
	Player.prototype.setUserActive = function (value) {
		if (value !== this.getUserActive) {
			this._userActive = value;
			this.toggleClass('leplayer--user-active', value);
			this.trigger('useractive');
		}
	};

	Player.prototype.getUserActive = function () {
		return this._userActive || false;
	};

	Player.prototype.play = function () {
		return this.video.play();
	};

	Player.prototype.pause = function () {
		return this.video.pause();
	};

	Player.prototype.togglePlay = function () {
		return this.video.togglePlay();
	};

	// TODO: Сделать плеер классов и реализовать эти методы через get и set
	Player.prototype.getError = function () {
		return this._error || null;
	};

	/**
	 * Get some data for player
	 *
	 * @access public
	 * @returns {jQuery.promise} Promise
	 */
	Player.prototype.getData = function () {
		var dfd = new _jquery2.default.Deferred();

		if (this._data !== undefined) {
			dfd.resolve(this._data);
			return dfd.promise();
		}

		if (typeof this.options.data === 'string') {
			return _jquery2.default.ajax({
				url: this.options.data,
				method: 'GET',
				dataType: 'json'
			}).promise();
		} else if (_typeof(this.options.data) === 'object') {
			dfd.resolve(this.options.data);
			return dfd.promise();
		}
	};

	Player.prototype.getSectionData = function () {
		return this.getData().then(function (data) {
			return data.sections;
		});
	};

	Player.prototype.requestFullscreen = function () {
		var fsApi = _FullscreenApi2.default;

		if (fsApi.requestFullscreen) {
			// Call HTML5 Video api requestFullscreen
			this.element[0][fsApi.requestFullscreen]();

			this.trigger('fullscreenchange', true);
		}
	};

	Player.prototype.exitFullscreen = function () {
		var fsApi = _FullscreenApi2.default;

		if (fsApi.exitFullscreen) {
			document[fsApi.exitFullscreen]();
		}

		this.trigger('fullscreenchange', false);
	};

	Player.prototype.toggleFullscreen = function () {
		if (this.getView() === 'fullscreen') {
			this.exitFullscreen();
		} else {
			this.requestFullscreen();
		}
	};

	Player.prototype._onEntityFullscrenChange = function () {
		var fsApi = _FullscreenApi2.default;
		var isFs = !!document[fsApi.fullscreenElement];
		this.trigger('fullscreenchange', isFs);
	};

	Player.prototype.onFullscreenChange = function (e, isFs) {
		var fsApi = _FullscreenApi2.default;
		if (isFs) {
			this.setView('fullscreen');
		} else {
			this.setView('common');
		}
	};

	window.$.fn.lePlayer = function (options) {
		return this.each(function () {
			return new Player((0, _jquery2.default)(this), options);
		});
	};
	window.$.lePlayer = Player;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = $;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * @file ControlCollection.js
	 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _Component2 = __webpack_require__(3);

	var _Component3 = _interopRequireDefault(_Component2);

	var _ControlFactory = __webpack_require__(4);

	var _ControlFactory2 = _interopRequireDefault(_ControlFactory);

	var _utils = __webpack_require__(14);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ControlCollection = function (_Component) {
		_inherits(ControlCollection, _Component);

		function ControlCollection(player, options) {
			_classCallCheck(this, ControlCollection);

			options = _jquery2.default.extend({}, {
				controls: player.options.controls[options.name] || []
			}, options);

			var _this = _possibleConstructorReturn(this, (ControlCollection.__proto__ || Object.getPrototypeOf(ControlCollection)).call(this, player, options));

			_this.items = {};
			_this.active = options.active || false;
			_this.name = options.name;
			_this.controls = _this.player.options.controls[_this.name];
			return _this;
		}

		/**
	  * @override
	  */


		_createClass(ControlCollection, [{
			key: 'createElement',
			value: function createElement() {
				var _this2 = this;

				var _options = this.options;
				var name = _options.name;
				var controls = _options.controls;


				this.element = (0, _utils.createEl)('div', {
					className: 'leplayer-control-collection leplayer-control-collection--' + name
				});

				controls.forEach(function (row) {
					var elemRow = (0, _utils.createEl)('div', {
						className: 'leplayer-controls controls-' + name
					});
					var hasTimeline = false;
					row.forEach(function (controlName) {
						if (controlName == _ControlFactory.C_TIMELINE) {
							hasTimeline = true;
						}
						var control = (0, _ControlFactory2.default)(_this2.player, controlName, {
							collection: _this2.options.name
						});
						elemRow.append(control.element);
					});
					if (!hasTimeline) {
						elemRow.css('width', '1px');
					}
					elemRow.find('.divider + .divider').remove();
					_this2.element.append(elemRow);
				});
				return this.element;
			}
		}, {
			key: 'add',
			value: function add(name) {
				if (name == C_DIVIDER) {
					return (0, _ControlFactory2.default)(player, name);
				} else {
					this.items[name] = (0, _ControlFactory2.default)(player, name);
					return this.items[name].element;
				}
			}
		}, {
			key: 'has',
			value: function has(name) {
				return _typeof(this.items[name]) == 'object';
			}
		}, {
			key: 'hide',
			value: function hide() {
				this.element.hide();
				this.element.find('.leplayer-controls').hide();
			}
		}, {
			key: 'show',
			value: function show() {
				this.element.show();
				this.element.find('.leplayer-controls').show();
			}
		}, {
			key: 'disable',
			set: function set(value) {
				for (var i in this.items) {
					if (!this.items.hasOwnProperty(i)) continue;
					this.items[i].disable = value;
				}
			}
		}]);

		return ControlCollection;
	}(_Component3.default);

	exports.default = ControlCollection;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * @file Component.js
	 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Player component - Base class for all UI
	 *
	 * @param {Player} player Main player
	 * @param {Object} [options] Options of component
	 * @param {jQuery} [options.element] Элемент на котором можно иницилизовать класс.
	 * @property {Object} options
	 * @property {jQuery} element
	 * @class Component
	 */
	var Component = function () {
		function Component(player, options) {
			_classCallCheck(this, Component);

			/** TODO(adinvadim): Add options.component, for clone component instance */
			options = this.options = _jquery2.default.extend({}, this.options, options);
			this.player = player;

			if (options.element) {
				this.element = options.element;
			} else {
				this.createElement();
			}
			if (this.element.length != 1) {
				console.error('Component.prototype.element.length must equal 1, not ' + this.element.length + '\n', this.element);
			}
			this.element[0].__node = this;
		}

		/**
	  * @abstract
	  */


		_createClass(Component, [{
			key: 'createElement',
			value: function createElement() {

				return '';
			}

			/**
	   * @abstract
	   */

		}, {
			key: 'buildCSSClass',
			value: function buildCSSClass() {
				return '';
			}
		}]);

		return Component;
	}();

	exports.default = Component;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * @file control-factory.js
	 *
	 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.C_TIME_INFO = exports.C_KEYBINDING_INFO = exports.C_SECTION = exports.C_VOLUME = exports.C_TIMELINE = exports.C_SUBTITLE = exports.C_SOURCE = exports.C_RATE = exports.C_PLAY = exports.C_FULLSCREEN = exports.C_FORWARD = exports.C_DOWNLOAD = exports.C_DIVIDER = exports.C_BACKWARD = undefined;
	exports.default = controlFactory;

	var _PlayControl = __webpack_require__(5);

	var _PlayControl2 = _interopRequireDefault(_PlayControl);

	var _VolumeControl = __webpack_require__(8);

	var _VolumeControl2 = _interopRequireDefault(_VolumeControl);

	var _TimelineControl = __webpack_require__(11);

	var _TimelineControl2 = _interopRequireDefault(_TimelineControl);

	var _SectionControl = __webpack_require__(15);

	var _SectionControl2 = _interopRequireDefault(_SectionControl);

	var _FullscreenControl = __webpack_require__(17);

	var _FullscreenControl2 = _interopRequireDefault(_FullscreenControl);

	var _RateControl = __webpack_require__(18);

	var _RateControl2 = _interopRequireDefault(_RateControl);

	var _BackwardControl = __webpack_require__(19);

	var _BackwardControl2 = _interopRequireDefault(_BackwardControl);

	var _SourceControl = __webpack_require__(20);

	var _SourceControl2 = _interopRequireDefault(_SourceControl);

	var _SubtitleControl = __webpack_require__(22);

	var _SubtitleControl2 = _interopRequireDefault(_SubtitleControl);

	var _DownloadControl = __webpack_require__(23);

	var _DownloadControl2 = _interopRequireDefault(_DownloadControl);

	var _KeybindingInfoControl = __webpack_require__(24);

	var _KeybindingInfoControl2 = _interopRequireDefault(_KeybindingInfoControl);

	var _TimeInfoControl = __webpack_require__(25);

	var _TimeInfoControl2 = _interopRequireDefault(_TimeInfoControl);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var C_BACKWARD = exports.C_BACKWARD = 'backward';
	var C_DIVIDER = exports.C_DIVIDER = 'divider';
	var C_DOWNLOAD = exports.C_DOWNLOAD = 'download';
	var C_FORWARD = exports.C_FORWARD = 'forward';
	var C_FULLSCREEN = exports.C_FULLSCREEN = 'fullscreen';
	var C_PLAY = exports.C_PLAY = 'play';
	var C_RATE = exports.C_RATE = 'rate';
	var C_SOURCE = exports.C_SOURCE = 'source';
	var C_SUBTITLE = exports.C_SUBTITLE = 'subtitle';
	var C_TIMELINE = exports.C_TIMELINE = 'timeline';
	var C_VOLUME = exports.C_VOLUME = 'volume';
	var C_SECTION = exports.C_SECTION = 'section';
	var C_KEYBINDING_INFO = exports.C_KEYBINDING_INFO = 'keybinding info';
	var C_TIME_INFO = exports.C_TIME_INFO = 'timeinfo';

	function controlFactory(player, name, options) {
		switch (name) {
			case C_BACKWARD:
				return new _BackwardControl2.default(player, options);

			case C_DIVIDER:
				return {
					element: $('<div/>').addClass('divider')
				};

			case C_DOWNLOAD:
				return new _DownloadControl2.default(player, options);

			case C_FORWARD:
				return new ForwardControl(player, options);

			case C_FULLSCREEN:
				return new _FullscreenControl2.default(player, options);

			case C_PLAY:
				return new _PlayControl2.default(player, options);

			case C_RATE:
				return new _RateControl2.default(player, options);

			case C_SOURCE:
				return new _SourceControl2.default(player, options);

			case C_SUBTITLE:
				return new _SubtitleControl2.default(player, options);

			case C_TIMELINE:
				return new _TimelineControl2.default(player, options);

			case C_VOLUME:
				return new _VolumeControl2.default(player, options);

			case C_SECTION:
				return new _SectionControl2.default(player, options);

			case C_KEYBINDING_INFO:
				return new _KeybindingInfoControl2.default(player, options);

			case C_TIME_INFO:
				return new _TimeInfoControl2.default(player, options);

			default:
				console.error('Control ' + name + ' doesn\'t exist');
				return null;
		}
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * @file PlayControl.js
	 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _Control2 = __webpack_require__(6);

	var _Control3 = _interopRequireDefault(_Control2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * @class PlayControl
	 * @param {Player} player Main player
	 * @extends Control
	 */
	var PlayControl = function (_Control) {
		_inherits(PlayControl, _Control);

		function PlayControl(player) {
			var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			_classCallCheck(this, PlayControl);

			options = _jquery2.default.extend({}, {
				iconName: 'play',
				title: 'Воспроизвести видео',
				className: 'play',
				name: 'play'
			}, options);

			var _this = _possibleConstructorReturn(this, (PlayControl.__proto__ || Object.getPrototypeOf(PlayControl)).call(this, player, options));

			_this.player.on('play', function (e) {
				_this.play();
			});

			_this.player.on('pause', function (e) {
				_this.pause();
			});
			return _this;
		}

		/**
	  * Pause the video
	  */


		_createClass(PlayControl, [{
			key: 'pause',
			value: function pause() {
				this.icon.iconName = 'play';
				this.element.attr('title', this.options.title);
			}

			/**
	   * Play the video
	   */

		}, {
			key: 'play',
			value: function play() {
				this.icon.iconName = 'pause';
				this.element.attr('title', 'Поставить на паузу');
			}

			/**
	   * @override
	   */

		}, {
			key: 'onClick',
			value: function onClick(e) {
				//super.onClick(e);
				this.player.video.togglePlay();
			}
		}]);

		return PlayControl;
	}(_Control3.default);

	exports.default = PlayControl;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * @file Control.js
	 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _Component2 = __webpack_require__(3);

	var _Component3 = _interopRequireDefault(_Component2);

	var _Icon = __webpack_require__(7);

	var _Icon2 = _interopRequireDefault(_Icon);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
	var Control = function (_Component) {
		_inherits(Control, _Component);

		function Control(player, options) {
			_classCallCheck(this, Control);

			var _this = _possibleConstructorReturn(this, (Control.__proto__ || Object.getPrototypeOf(Control)).call(this, player, options));

			_this.disable = true;

			_this.player.on('inited', function (e) {
				_this.disable = _this.options.disable || false;
			});

			_this.element.on({
				'click': _this._onClick.bind(_this),
				'leplayer_control_click': _this.onClick.bind(_this)
			});

			_this.player.on('inited', _this.onPlayerInited.bind(_this));
			return _this;
		}

		/**
	  * @override
	  */


		_createClass(Control, [{
			key: 'createElement',
			value: function createElement() {
				if (this.options.iconName) {
					this.icon = new _Icon2.default(this.player, {
						iconName: this.options.iconName
					});
				}
				var attrs = {
					role: 'button',
					title: this.options.title
				};
				this.element = (0, _jquery2.default)('<div />').addClass(this.buildCSSClass()).append(this.icon && this.icon.element).attr(attrs);

				return this.element;
			}

			/**
	   * @override
	   */

		}, {
			key: 'buildCSSClass',
			value: function buildCSSClass() {
				return 'control ' + this.options.className + ' ' + _get(Control.prototype.__proto__ || Object.getPrototypeOf(Control.prototype), 'buildCSSClass', this).call(this);
			}
		}, {
			key: '_onClick',
			value: function _onClick(e) {
				if (this.disable) {
					return false;
				}
				this.element.trigger('leplayer_control_click');
				this.player.trigger('controlclick', { control: this });
			}

			/**
	   *
	   * On click event handler
	   * @abstact
	   */

		}, {
			key: 'onClick',
			value: function onClick(e) {
				e.preventDefault();
				if (typeof this.options.onClick == 'function') {
					this.options.onClick.call(this, arguments);
				}
			}
		}, {
			key: 'onPlayerInited',
			value: function onPlayerInited(e, data) {}
		}, {
			key: 'disable',
			set: function set(value) {
				this._disable = value;
				this.element.toggleClass('disabled', value);
			},
			get: function get() {
				return this._disable;
			}
		}]);

		return Control;
	}(_Component3.default);

	exports.default = Control;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * @file Icon.js
	 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _Component2 = __webpack_require__(3);

	var _Component3 = _interopRequireDefault(_Component2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * @param {Player} player Main player
	 * @param {Object} [options] Icon's options
	 * @param {String} [options.iconName=''] Icon's name. If use svgsprite icons, iconName it's id in sprite
	 * @class Icon
	 * @extends Component
	 */
	var Icon = function (_Component) {
		_inherits(Icon, _Component);

		function Icon(player) {
			var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			_classCallCheck(this, Icon);

			options = _jquery2.default.extend({}, {
				className: '',
				iconName: ''
			}, options);
			return _possibleConstructorReturn(this, (Icon.__proto__ || Object.getPrototypeOf(Icon)).call(this, player, options));
		}

		/**
	  * @override
	  */


		_createClass(Icon, [{
			key: 'createElement',
			value: function createElement() {
				this._useTag = document.createElementNS('http://www.w3.org/2000/svg', 'use');
				this._svgTag = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

				this.iconName = this._iconName = this.options.iconName;
				this._svgTag.appendChild(this._useTag);
				this.element = (0, _jquery2.default)('<div />').addClass(this.buildCSSClass()).attr('title', this.options.title).append((0, _jquery2.default)(this._svgTag));
				return this.element;
			}

			/**
	   * @override
	   */

		}, {
			key: 'buildCSSClass',
			value: function buildCSSClass() {
				return _get(Icon.prototype.__proto__ || Object.getPrototypeOf(Icon.prototype), 'buildCSSClass', this).call(this) + ' leplayer-icon ' + this.options.className;
			}

			/**
	   * Setter of iconName field
	   * @param {String} iconName
	   */

		}, {
			key: 'iconName',
			set: function set(iconName) {
				var _useTag, _useTag2;

				var attrNS = ['http://www.w3.org/1999/xlink', 'href'];
				(_useTag = this._useTag).removeAttributeNS.apply(_useTag, attrNS.concat([this.player.options.svgPath + '#leplayer-icon-' + this.iconName]));
				(_useTag2 = this._useTag).setAttributeNS.apply(_useTag2, attrNS.concat([this.player.options.svgPath + '#leplayer-icon-' + iconName]));
				this._iconName = iconName;
			}

			/**
	   * Getter of iconName field
	   * @return {String} Icon's name
	   */
			,
			get: function get() {
				return this._iconName;
			}
		}]);

		return Icon;
	}(_Component3.default);

	exports.default = Icon;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * @file VolumeControl.js
	 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _ControlDropdown2 = __webpack_require__(9);

	var _ControlDropdown3 = _interopRequireDefault(_ControlDropdown2);

	var _Icon = __webpack_require__(7);

	var _Icon2 = _interopRequireDefault(_Icon);

	var _cookie = __webpack_require__(10);

	var _cookie2 = _interopRequireDefault(_cookie);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * @param {Player} player Main player
	 * @class VolumeControl
	 * @extends ControlDropdown
	 */
	var VolumeControl = function (_ControlDropdown) {
		_inherits(VolumeControl, _ControlDropdown);

		function VolumeControl(player) {
			var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			_classCallCheck(this, VolumeControl);

			options = _jquery2.default.extend({}, {
				iconName: 'volume-down',
				className: 'volume-control',
				name: 'volume'
			}, options);

			var _this = _possibleConstructorReturn(this, (VolumeControl.__proto__ || Object.getPrototypeOf(VolumeControl)).call(this, player, options));

			_this.player.on('volumechange', function (e, data) {
				_this.value = data.volume;
			});
			return _this;
		}

		_createClass(VolumeControl, [{
			key: 'createElement',
			value: function createElement() {
				var _this2 = this;

				_get(VolumeControl.prototype.__proto__ || Object.getPrototypeOf(VolumeControl.prototype), 'createElement', this).call(this);
				var drag = false;

				this.marker = (0, _jquery2.default)('<div/>').addClass('volume-marker');

				this.active = (0, _jquery2.default)('<div/>').addClass('volume-active');

				this.line = (0, _jquery2.default)('<div/>').addClass('volume-line').append(this.active).append(this.marker).on('click', function (e) {
					if (drag) return;
					var p = _this2.getPosition(e.pageY);
					if (p >= 0 && p <= 1) {
						_this2.player.video.volume = 1 - p;
					}
				});

				this.dropdownContent.addClass('volume-slider').append(this.line);

				this.icon.element.attr('title', 'Отключить звук');

				this.marker.on('mousedown', function (e) {
					if (e.which != 1) return;
					drag = true;
				});

				(0, _jquery2.default)(document).on({
					'mousemove': function mousemove(e) {
						if (!drag) return;
						var p = _this2.getPosition(e.pageY);
						if (p >= 0 && p <= 1) {
							_this2.player.video.volume = 1 - p;
						}
					},

					'mouseup': function mouseup(e) {
						drag = false;
					}
				});
				return this.element;
			}
		}, {
			key: 'toggleMuted',
			value: function toggleMuted() {
				var _player = this.player;
				var video = _player.video;
				var options = _player.options;


				if (video.volume == 0) {
					video.volume = video.defaultVolume;
				} else {
					video.volume = 0;
				}
			}
		}, {
			key: 'getPosition',
			value: function getPosition(y) {
				return (y - this.line.offset().top) / this.line.height();
			}
		}, {
			key: 'onClick',
			value: function onClick(e) {
				_get(VolumeControl.prototype.__proto__ || Object.getPrototypeOf(VolumeControl.prototype), 'onClick', this).call(this, e);
				this.toggleMuted();
			}
		}, {
			key: 'onPlayerInited',
			value: function onPlayerInited() {
				this.value = this.player.video.defaultVolume;
			}
		}, {
			key: 'value',
			set: function set(value) {
				if (value < this.player.options.volume.mutelimit) {
					this.icon.iconName = 'volume-off';
				} else if (value < 0.5) {
					this.icon.iconName = 'volume-down';
				} else {
					this.icon.iconName = 'volume-up';
				}

				var p = Math.round(value * 100).toString() + '%';
				this.active.css('height', p);
				this.marker.css('bottom', p);
			}
		}]);

		return VolumeControl;
	}(_ControlDropdown3.default);

	exports.default = VolumeControl;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * @file ControlDropdown.js
	 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _Control2 = __webpack_require__(6);

	var _Control3 = _interopRequireDefault(_Control2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * @class ControlDropdown
	 * @param {Player} player Main player
	 * @param {Object} [options]
	 * @property {jQuery} dropdownContent Content of popup
	 * @extends Control
	 */
	var ControlDropdown = function (_Control) {
		_inherits(ControlDropdown, _Control);

		function ControlDropdown(player) {
			var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			_classCallCheck(this, ControlDropdown);

			return _possibleConstructorReturn(this, (ControlDropdown.__proto__ || Object.getPrototypeOf(ControlDropdown)).call(this, player, options));
		}

		/**
	  * @override
	  */


		_createClass(ControlDropdown, [{
			key: 'createElement',
			value: function createElement() {
				_get(ControlDropdown.prototype.__proto__ || Object.getPrototypeOf(ControlDropdown.prototype), 'createElement', this).call(this);
				this.dropdownContent = (0, _jquery2.default)('<div />').addClass('control-dropdown__content');
				this.element.append(this.dropdownContent);
			}

			/**
	   * @override
	   */

		}, {
			key: 'buildCSSClass',
			value: function buildCSSClass() {
				return 'control-dropdown ' + _get(ControlDropdown.prototype.__proto__ || Object.getPrototypeOf(ControlDropdown.prototype), 'buildCSSClass', this).call(this);
			}
		}, {
			key: '_onClick',
			value: function _onClick(e) {
				if ((0, _jquery2.default)(e.target).closest(this.dropdownContent).length > 0) {
					return;
				}

				_get(ControlDropdown.prototype.__proto__ || Object.getPrototypeOf(ControlDropdown.prototype), '_onClick', this).call(this, e);
			}
		}]);

		return ControlDropdown;
	}(_Control3.default);

	exports.default = ControlDropdown;

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';
	/**
	 * @file cookie-control.js
	 *
	 * @clas Cookie
	 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Cookie = function () {
		function Cookie() {
			_classCallCheck(this, Cookie);
		}

		_createClass(Cookie, null, [{
			key: 'get',

			/**
	   * @public
	   *
	   * @param {String} name Name of cookie
	   * @param {String} [dflt] Return default value if this field is empty
	   *
	   */
			value: function get(name, dflt) {
				var cookies = document.cookie.split(';');
				for (var i in cookies) {
					var d = cookies[i].trim().split('=');
					if (d[0] == 'leplayer_' + name) return d[1];
				}
				return dflt;
			}
		}, {
			key: 'set',


			/**
	   * @public
	   *
	   * @param {String} name Key
	   * @param {String} value Value
	   */
			value: function set(name, value) {
				var d = new Date();
				d.setDate(d.year + 1);
				document.cookie = 'leplayer_' + name + '=' + value + ';expires=' + d.toString();
			}
		}]);

		return Cookie;
	}();

	exports.default = Cookie;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * @file TimelineControl.js
	 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _Control2 = __webpack_require__(6);

	var _Control3 = _interopRequireDefault(_Control2);

	var _ControlText = __webpack_require__(12);

	var _ControlText2 = _interopRequireDefault(_ControlText);

	var _BufferedRanges = __webpack_require__(13);

	var _BufferedRanges2 = _interopRequireDefault(_BufferedRanges);

	var _utils = __webpack_require__(14);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * @param {Player} player Main player
	 * @class TimelineControl
	 * @property {ControlText} currentTime Current time's text
	 * @property {ControlText} totalTime Total time
	 * @property {jQuery} line
	 * @extends Control
	 */
	var TimelineControl = function (_Control) {
		_inherits(TimelineControl, _Control);

		function TimelineControl(player) {
			var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			_classCallCheck(this, TimelineControl);

			options = _jquery2.default.extend({}, {
				name: 'timeline',
				className: 'timeline timeline-container'
			}, options);

			var _this = _possibleConstructorReturn(this, (TimelineControl.__proto__ || Object.getPrototypeOf(TimelineControl)).call(this, player, options));

			_this.player.on('sectionsinit', _this.onSectionsInit.bind(_this));

			_this.player.on('timeupdate', function (e, data) {
				var time = data.time;
				var duration = data.duration;

				_this.hardMove(time / duration);
			});

			_this.player.on('durationchange', _this._onDurationChange.bind(_this));
			return _this;
		}

		/**
	  * @override
	  */


		_createClass(TimelineControl, [{
			key: 'createElement',
			value: function createElement() {
				var _this2 = this;

				_get(TimelineControl.prototype.__proto__ || Object.getPrototypeOf(TimelineControl.prototype), 'createElement', this).call(this);
				var video = this.player.video;
				var duration = video.duration;

				this.drag = false;

				// Create labels
				this.currentTime = new _ControlText2.default(this.player, { className: 'time-current' });
				this.currentTime.text = '00:00';
				this.totalTime = new _ControlText2.default(this.player, { className: 'time-total' });

				// Create line with markers and played range

				// Marker of current time on timeline
				this.markerTime = (0, _jquery2.default)('<div />').addClass('time').hide();

				this.marker = (0, _jquery2.default)('<div />').addClass('time-marker').append(this.markerTime).on('mousedown', function (e) {
					if (e.which !== 1) return;
					e.preventDefault();
					_this2.markerShadow.hide();
					_this2.drag = true;
				});

				// Shadow marker, show on timeline's mousemove
				this.markerShadowTime = (0, _jquery2.default)('<div />').addClass('time');

				this.markerShadow = (0, _jquery2.default)('<div />').addClass('time-marker shadow').append(this.markerShadowTime).hide();

				// Played ranges
				this.playedRanges = (0, _jquery2.default)('<div />').addClass('time-played');

				// Buffered ranges
				this.bufferedRanges = new _BufferedRanges2.default(this.player).element;

				this.line = (0, _jquery2.default)('<div />').addClass('timeline').append(this.marker).append(this.markerShadow).append(this.playedRanges).append(this.bufferedRanges).on({
					'mousemove': function mousemove(e) {
						if (_this2.drag) return;

						var p = _this2.getPosition(e.pageX);
						if (p > 0 && p < 1) {
							_this2.markerShadow.show();
							_this2.markerShadow.css('left', p * 100 + '%');
							_this2.markerShadowTime.html((0, _utils.secondsToTime)(video.duration * p));
						} else _this2.markerShadow.hide();
					},

					'mouseleave': function mouseleave(e) {
						if (_this2.drag) return;
						_this2.markerShadow.hide();
					},

					'mousedown': function mousedown(e) {},

					'click': function click(e) {
						if (e.which !== 1) return;
						if (_this2.drag) return;
						_this2.hardMove(_this2.getPosition(e.pageX));
						video.currentTime = video.duration * _this2.getPosition(e.pageX);
					},

					'touchmove': function touchmove(e) {}
				});

				this.element.addClass('timeline-container').append((0, _jquery2.default)('<div />').addClass('timeline-subcontainer').append(this.currentTime.element).append(this.line).append(this.totalTime.element));

				(0, _jquery2.default)(document).on({

					'mousemove': function mousemove(e) {
						if (!_this2.drag) return;
						var p = _this2.getPosition(e.pageX);
						if (p > 0 && p < 1) {
							_this2.markerTime.show().html((0, _utils.secondsToTime)(video.duration * p));
							video.seek(video.duration * p);
						}
					},

					'mouseup': function mouseup(e) {
						_this2.markerTime.hide();
						_this2.drag = false;
					}
				});
			}

			/**
	   * @override
	   */

		}, {
			key: '_onClick',
			value: function _onClick(e) {
				e.preventDefault();
			}
		}, {
			key: 'onSectionsInit',
			value: function onSectionsInit(e) {
				var duration = this.player.video.duration;
				if (isNaN(duration)) {
					return;
				}
				if (this.player.sections) {
					this.updateSectionRanges(this.player.sections.items);
				}
			}
		}, {
			key: 'updateSectionRanges',
			value: function updateSectionRanges(items) {
				if (this.sections == null || this.sections.length == 0) {
					this.sections = this.createSectionRanges(items);
					this.line.append(this.sections);
				} else {
					this.sections.html(this.createSectionRanges(items));
				}
			}
		}, {
			key: 'createSectionRanges',
			value: function createSectionRanges(items) {
				var duration = this.player.video.duration;
				var result = (0, _jquery2.default)('<div />').addClass('leplayer-timeline-sections');
				items.forEach(function (section) {
					var length = section.end - section.begin;
					var item = (0, _jquery2.default)('<div />').addClass('leplayer-timeline-section').css({
						width: length / duration * 99 + '%',
						left: section.begin / duration * 99 + '%'
					});
					result.append(item);
				});
				return result;
			}
		}, {
			key: 'getPosition',
			value: function getPosition(x) {
				return (x - this.line.offset().left) / this.line.width();
			}

			/**
	   * Move marker on timeline on percent from argument, not from video.currentTime
	   * @param {Number} percent The percent which you want to move marker on timeline
	   */

		}, {
			key: 'hardMove',
			value: function hardMove(percent) {
				var currentTime = this.player.video.duration * percent;
				if (isNaN(currentTime)) return;
				percent = percent * 100;
				this.marker.css('left', percent + '%');
				this.playedRanges.css('width', percent + '%');
				this.currentTime.text = (0, _utils.secondsToTime)(currentTime);
			}

			/**
	   * @deprecated
	   */

		}, {
			key: 'move',
			value: function move() {
				var video = this.player.video;
				var percent = (video.currentTime / video.duration * 100).toFixed(2);
				var currentTime = video.currentTime;
				if (isNaN(currentTime)) return;
				this.marker.css('left', percent + '%');
				this.playedRanges.css('width', percent + '%');
				this.currentTime.text = (0, _utils.secondsToTime)(currentTime);
			}
		}, {
			key: 'updateLabels',
			value: function updateLabels() {
				var video = this.player.video;
				this.totalTime.text = (0, _utils.secondsToTime)(0, Math.floor(video.duration / 3600) > 0);
				var width = this.totalTime.element.width();
				this.totalTime.text = (0, _utils.secondsToTime)(video.duration);
				this.currentTime.text = (0, _utils.secondsToTime)(video.currentTime || 0);
				this.currentTime.element.css({
					width: width
				});
			}

			/**
	   * @override
	   */

		}, {
			key: 'onPlayerInited',
			value: function onPlayerInited(e) {
				var video = this.player.video;
				this.updateLabels();
				if (this.player.sections) {
					this.updateSectionRanges(this.player.sections.items);
				}
			}
		}, {
			key: '_initWatchBuffer',
			value: function _initWatchBuffer() {
				var _this3 = this;

				clearInterval(this.watchBufferInterval);
				var arr = [];
				var video = this.player.video;
				var updateProgressBar = function updateProgressBar() {
					var END = 1;
					var START = 0;
					var result = (0, _jquery2.default)('');
					video.loaded.forEach(function (item) {
						var domItem = (0, _jquery2.default)('<div />').addClass('time-buffered');
						domItem.css({
							'left': item[START] * 100 + '%',
							'width': (item[END] - item[START]) * 100 + '%'
						});
						result = result.add(domItem);
					});
					_this3.buffered.html(result);
					if (video.loaded.length && 1 - video.loadedSize <= 0.05) {
						clearInterval(_this3.watchBufferInterval);
					}
				};
				this.watchBufferInterval = setInterval(updateProgressBar, 500);
			}

			/**
	   * On durationchange event handler
	   */

		}, {
			key: '_onDurationChange',
			value: function _onDurationChange() {
				this.updateLabels();
				if (this.player.sections) {
					this.updateSectionRanges(this.player.sections.items);
				}
			}
		}]);

		return TimelineControl;
	}(_Control3.default);

	exports.default = TimelineControl;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * @file ControlText.js
	 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _Control2 = __webpack_require__(6);

	var _Control3 = _interopRequireDefault(_Control2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * @param {Player} player Main player
	 * @class ControlText
	 * @exnteds Control
	 */
	var ControlText = function (_Control) {
		_inherits(ControlText, _Control);

		function ControlText(player) {
			var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			_classCallCheck(this, ControlText);

			options = _jquery2.default.extend({}, {
				className: ''
			}, options);
			return _possibleConstructorReturn(this, (ControlText.__proto__ || Object.getPrototypeOf(ControlText)).call(this, player, options));
		}

		/**
	  * @override
	  */


		_createClass(ControlText, [{
			key: 'createElement',
			value: function createElement() {
				_get(ControlText.prototype.__proto__ || Object.getPrototypeOf(ControlText.prototype), 'createElement', this).call(this);
			}

			/**
	   * @override
	   */

		}, {
			key: 'buildCSSClass',
			value: function buildCSSClass() {
				return 'control-text ' + this.options.className;
			}

			/**
	   * Setter of text field
	   * @public
	   * @param {String} value
	   */

		}, {
			key: 'text',
			set: function set(value) {
				this._text = value;
				this.element.html(value);
			},
			get: function get() {
				return this._text;
			}
		}]);

		return ControlText;
	}(_Control3.default);

	exports.default = ControlText;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * @file BufferedRanges.js
	 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _utils = __webpack_require__(14);

	var _Component2 = __webpack_require__(3);

	var _Component3 = _interopRequireDefault(_Component2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * @param {Player} player Main player
	 * @class BufferedRanges
	 * @extends Control
	 */

	var BufferedRanges = function (_Component) {
		_inherits(BufferedRanges, _Component);

		function BufferedRanges(player, options) {
			_classCallCheck(this, BufferedRanges);

			var _this = _possibleConstructorReturn(this, (BufferedRanges.__proto__ || Object.getPrototypeOf(BufferedRanges)).call(this, player, options));

			_this.player.on('progress', _this.update.bind(_this));
			return _this;
		}

		/**
	  * @override
	  */


		_createClass(BufferedRanges, [{
			key: 'createElement',
			value: function createElement() {
				this.range = (0, _utils.createEl)('div', {
					className: 'leplayer-timeline-buffered__range'
				});

				return this.element = (0, _utils.createEl)('div', {
					className: 'leplayer-timeline-buffered'
				}).append(this.range);
			}
		}, {
			key: 'update',
			value: function update() {
				var buffered = this.player.video.buffered;
				var duration = this.player.video.duration;
				var end = 0;
				if (buffered.length > 0) {
					end = buffered.end(buffered.length - 1);
				}

				if (duration > 0) {

					this.range.css({
						width: (0, _utils.percentify)(end, duration) * 100 + '%'
					});
				}
			}
		}]);

		return BufferedRanges;
	}(_Component3.default);

	exports.default = BufferedRanges;

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';
	/**
	 * @file time.js
	 *
	 * @module time
	 */

	/**
	 * Convert seconds to format string 'hh?:mm:ss'
	 *
	 * @access public
	 * @param {Number} seconds Seconds
	 * @param {Boolean} showHours convert to format 'hh:mm:ss'
	 * @returns {String}
	 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.secondsToTime = secondsToTime;
	exports.percentify = percentify;
	exports.createEl = createEl;
	function secondsToTime(seconds, showHours) {
		var h = Math.floor(seconds / 3600);
		var m = Math.floor(seconds % 3600 / 60);
		var s = Math.floor(seconds % 3600 % 60);
		var out = '';
		if (m < 10) {
			m = '0' + m;
		}
		if (s < 10) {
			s = '0' + s;
		}
		out = m + ':' + s;

		if (h > 0 || showHours) {
			out = h + ':' + out;
		}
		return out;
	};

	/**
	 * Return length / end
	 *
	 * @access public
	 * @param {Number} length
	 * @param {Nubmer} end
	 */
	function percentify(length, end) {
		// or zero beacase NaN
		var percent = length / end || 0;
		return percent >= 1 ? 1 : percent;
	}

	function createEl() {
		var tag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'div';
		var props = arguments[1];

		if (props && props.className) {
			props["class"] = props.className;
			delete props.className;
		}
		return $('<' + tag + '/>', props);
	}

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * @file SectionControl.js
	 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _ControlCheckbox2 = __webpack_require__(16);

	var _ControlCheckbox3 = _interopRequireDefault(_ControlCheckbox2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * @class SectionControl
	 * @param {Player} player Main player
	 * @param {Object} [options]
	 * @param {Boolean} [options.checked=true]
	 * @extends ControlCheckbox
	 */
	var SectionControl = function (_ControlCheckbox) {
		_inherits(SectionControl, _ControlCheckbox);

		function SectionControl(player) {
			var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			_classCallCheck(this, SectionControl);

			options = _jquery2.default.extend({}, {
				iconName: 'list-ul',
				className: 'section',
				name: 'section',
				title: 'Показать/скрыть секции',
				disable: true
			}, options);

			var _this = _possibleConstructorReturn(this, (SectionControl.__proto__ || Object.getPrototypeOf(SectionControl)).call(this, player, options));

			_this.player.on('sectionsinit', _this._onSectionsInit.bind(_this));
			return _this;
		}

		_createClass(SectionControl, [{
			key: 'onChecked',
			value: function onChecked(e, data) {
				_get(SectionControl.prototype.__proto__ || Object.getPrototypeOf(SectionControl.prototype), 'onChecked', this).call(this, e);
				this.player.trigger('sectionstoggle', {
					checked: data.checked,
					view: this.player.getView()
				});
			}
		}, {
			key: '_onSectionsInit',
			value: function _onSectionsInit(e) {
				this.options.disable = this.disable = false;
				this.checked = true;
			}
		}]);

		return SectionControl;
	}(_ControlCheckbox3.default);

	exports.default = SectionControl;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * @file control-checkbox.js
	 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _Control2 = __webpack_require__(6);

	var _Control3 = _interopRequireDefault(_Control2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * @param {Player} player Main player
	 * @param {Object} [options]
	 * @param {boolean} [options.checked=false]
	 * @class ControlCheckbox Toggable control
	 */
	var ControlCheckbox = function (_Control) {
		_inherits(ControlCheckbox, _Control);

		function ControlCheckbox(player) {
			var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			_classCallCheck(this, ControlCheckbox);

			var _this = _possibleConstructorReturn(this, (ControlCheckbox.__proto__ || Object.getPrototypeOf(ControlCheckbox)).call(this, player, options));

			_this.checked = _this.options.checked || false;
			_this.element.on('leplayer_checked', _this.onChecked.bind(_this));
			return _this;
		}

		/**
	  * Setter for checked property
	  * @public
	  * @param {boolean} val
	  */


		_createClass(ControlCheckbox, [{
			key: 'onClick',


			/**
	   * @override
	   */
			value: function onClick(e) {
				_get(ControlCheckbox.prototype.__proto__ || Object.getPrototypeOf(ControlCheckbox.prototype), 'onClick', this).call(this, e);
				this.checked = !this.checked;
			}

			/**
	   * On checked event handler
	   *
	   * @param {Event} e
	   * @param {Object} data
	   */

		}, {
			key: 'onChecked',
			value: function onChecked(e, data) {}

			/**
	   * @override
	   */

		}, {
			key: 'buildCSSClass',
			value: function buildCSSClass() {
				return 'control-checkbox ' + _get(ControlCheckbox.prototype.__proto__ || Object.getPrototypeOf(ControlCheckbox.prototype), 'buildCSSClass', this).call(this);
			}
		}, {
			key: 'checked',
			set: function set(val) {
				if (this.disable) {
					return;
				}
				val = !!val;
				this._checked = val;
				this.element.toggleClass('control-checkbox--checked', val);
				this.element.trigger('leplayer_checked', { checked: val });
			}

			/**
	   * Getter for checked propery
	   * @public
	   * @return {boolean}
	   */
			,
			get: function get() {
				return this._checked;
			}
		}]);

		return ControlCheckbox;
	}(_Control3.default);

	exports.default = ControlCheckbox;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * @file FullscreenControl.js
	 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _Control2 = __webpack_require__(6);

	var _Control3 = _interopRequireDefault(_Control2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * @param {Player} player Main player
	 * @class FullscreenControl
	 * @extends Control
	 */
	var FullscreenControl = function (_Control) {
		_inherits(FullscreenControl, _Control);

		function FullscreenControl(player) {
			var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			_classCallCheck(this, FullscreenControl);

			options = _jquery2.default.extend({}, {
				iconName: 'arrows-alt',
				className: 'fullscreen',
				title: 'Развернуть/свернуть на полный экран',
				name: 'fullscreen'
			}, options);
			return _possibleConstructorReturn(this, (FullscreenControl.__proto__ || Object.getPrototypeOf(FullscreenControl)).call(this, player, options));
		}

		/**
	  * @override
	  */


		_createClass(FullscreenControl, [{
			key: 'onClick',
			value: function onClick(e) {
				_get(FullscreenControl.prototype.__proto__ || Object.getPrototypeOf(FullscreenControl.prototype), 'onClick', this).call(this, e);
				this.player.toggleFullscreen();
			}
		}]);

		return FullscreenControl;
	}(_Control3.default);

	exports.default = FullscreenControl;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * @file RateControl.js
	 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _Control2 = __webpack_require__(6);

	var _Control3 = _interopRequireDefault(_Control2);

	var _ControlText = __webpack_require__(12);

	var _ControlText2 = _interopRequireDefault(_ControlText);

	var _cookie = __webpack_require__(10);

	var _cookie2 = _interopRequireDefault(_cookie);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * @class RateControl
	 * @param {Player} player Main player
	 * @param {Object} [options]
	 * @property {Control} downControl  Down rate control
	 * @property {Control} upControl  Up rate control
	 * @property {ControlText} currentRate Control of cuurent rate
	 * @extends Control
	 */
	var RateControl = function (_Control) {
		_inherits(RateControl, _Control);

		function RateControl(player) {
			var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			_classCallCheck(this, RateControl);

			options = _jquery2.default.extend({}, {
				className: 'control-container'
			}, options);

			var _this = _possibleConstructorReturn(this, (RateControl.__proto__ || Object.getPrototypeOf(RateControl)).call(this, player, options));

			var video = _this.player.video;

			_this.player.on('ratechange', function (e, data) {
				_this.value = data.rate;
			});
			return _this;
		}

		/**
	  * @override
	  */


		_createClass(RateControl, [{
			key: 'createElement',
			value: function createElement() {
				_get(RateControl.prototype.__proto__ || Object.getPrototypeOf(RateControl.prototype), 'createElement', this).call(this);
				var video = this.player.video;

				this.downControl = new _Control3.default(this.player, {
					className: 'rate-down',
					name: 'rate-down',
					iconName: 'backward',
					collection: this.options.collection,
					title: 'Уменьшить скорость проигрывания',
					onClick: function onClick(e) {
						video.rate -= this.player.options.rate.step;
					}
				});

				this.upControl = new _Control3.default(this.player, {
					className: 'rate-up',
					name: 'rate-up',
					iconName: 'forward',
					collection: this.options.collection,
					title: 'Увеличить скорость проигрывания',
					onClick: function onClick(e) {
						video.rate += this.player.options.rate.step;
					}
				});

				this.currentRate = new _ControlText2.default(this.player, { className: 'rate-current' });

				this.element.append(this.downControl.element).append(this.currentRate.element).append(this.upControl.element);
			}

			/**
	   * @override
	   */

		}, {
			key: 'buildCSSClass',
			value: function buildCSSClass() {
				return this.options.className;
			}

			/**
	   * @override
	   */

		}, {
			key: 'onPlayerInited',
			value: function onPlayerInited() {
				this.value = this.player.video.defaultRate;
			}

			/**
	   *
	   */

		}, {
			key: '_onClick',
			value: function _onClick(e) {
				e.preventDefault();
			}
		}, {
			key: 'init',
			value: function init() {
				var rate = _cookie2.default.get('rate', this.player.options.rate.default);
				this.show(rate);
			}
		}, {
			key: 'show',
			value: function show(value) {
				var video = this.player.video;
				value = value || video.rate;
				value = parseFloat(value).toFixed(2).toString().replace(/,/g, '.');
				this.currentRate.text = '×' + value;
			}
		}, {
			key: 'value',
			set: function set(value) {
				var video = this.player.video;
				var options = this.player.options;
				if (this.disable) {
					return false;
				}
				this.upControl.disable = false;
				this.downControl.disable = false;
				if (video.rate <= options.rate.min) {
					this.downControl.disable = true;
				} else if (video.rate >= options.rate.max) {
					this.upControl.disable = true;
				}
				this.show();
			}
		}, {
			key: 'disable',
			set: function set(value) {
				this._disable = value;
				this.downControl.disable = value;
				this.upControl.disable = value;
			}
		}]);

		return RateControl;
	}(_Control3.default);

	exports.default = RateControl;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * @file BackwardControl.js
	 *
	 * Backward control
	 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _Control2 = __webpack_require__(6);

	var _Control3 = _interopRequireDefault(_Control2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * @param {Player} player Main player
	 * @param {Object} [options={}] Options
	 * @class BackwardControl
	 * @extends Control
	 */
	var BackwardControl = function (_Control) {
		_inherits(BackwardControl, _Control);

		function BackwardControl(player) {
			var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			_classCallCheck(this, BackwardControl);

			options = _jquery2.default.extend({}, {
				iconName: 'undo',
				className: 'backward',
				name: 'backward',
				title: '\u041E\u0442\u043C\u043E\u0442\u0430\u0442\u044C \u043D\u0430\u0437\u0430\u0434 \u043D\u0430 ' + player.options.playback.step.medium + ' \u0441\u0435\u043A\u0443\u043D\u0434'
			}, options);
			return _possibleConstructorReturn(this, (BackwardControl.__proto__ || Object.getPrototypeOf(BackwardControl)).call(this, player, options));
		}

		/**
	  * @override
	  */


		_createClass(BackwardControl, [{
			key: 'onClick',
			value: function onClick(e) {
				_get(BackwardControl.prototype.__proto__ || Object.getPrototypeOf(BackwardControl.prototype), 'onClick', this).call(this, e);
				this.player.video.currentTime -= this.player.options.playback.step.medium;
			}
		}]);

		return BackwardControl;
	}(_Control3.default);

	exports.default = BackwardControl;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * @file SourceControl.js
	 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _ControlContainer2 = __webpack_require__(21);

	var _ControlContainer3 = _interopRequireDefault(_ControlContainer2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * @class SourceControl
	 * @param {Player} player Main player
	 * @extends ControlConainer
	 */
	var SourceControl = function (_ControlContainer) {
		_inherits(SourceControl, _ControlContainer);

		// TODO: Делать disable/enable после options init
		function SourceControl(player) {
			var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			_classCallCheck(this, SourceControl);

			options = _jquery2.default.extend({}, {
				name: 'source',
				iconName: 'bullseye',
				title: 'Качество',
				className: 'source-control',
				disable: true
			}, options);
			return _possibleConstructorReturn(this, (SourceControl.__proto__ || Object.getPrototypeOf(SourceControl)).call(this, player, options));
		}

		/**
	  * @override
	  */


		_createClass(SourceControl, [{
			key: 'onClick',
			value: function onClick(e) {
				_get(SourceControl.prototype.__proto__ || Object.getPrototypeOf(SourceControl.prototype), 'onClick', this).call(this, e);
				var item = (0, _jquery2.default)(e.target);
				var defaultItem = this.getByIndex(0);

				this.player.video.source = {
					url: defaultItem.data('url'),
					title: defaultItem.data('title')
				};
				this.active = defaultItem;
			}
		}, {
			key: 'onItemClick',
			value: function onItemClick(e) {
				_get(SourceControl.prototype.__proto__ || Object.getPrototypeOf(SourceControl.prototype), 'onItemClick', this).call(this, e);
				var item = (0, _jquery2.default)(e.target);
				this.player.video.source = {
					url: item.data('url'),
					title: item.data('title')
				};
			}
		}, {
			key: 'onPlayerInited',
			value: function onPlayerInited(e, data) {
				var _this2 = this;

				var sources = this.player.options.sources;
				if (sources.length > 1) {
					sources.forEach(function (item) {
						_this2.addItem(item.title, {
							url: item.url,
							title: item.title
						});
					});
					this.setActiveByIndex(0);
					this.disable = false;
				}
			}
		}]);

		return SourceControl;
	}(_ControlContainer3.default);

	exports.default = SourceControl;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * @file ControlContainer.js
	 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _ControlDropdown2 = __webpack_require__(9);

	var _ControlDropdown3 = _interopRequireDefault(_ControlDropdown2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * @param {Player} player Main player
	 * @class ControlContainer
	 * @extends ControlDropdown
	 */
	var ControlContainer = function (_ControlDropdown) {
		_inherits(ControlContainer, _ControlDropdown);

		function ControlContainer(player, options) {
			_classCallCheck(this, ControlContainer);

			var _this = _possibleConstructorReturn(this, (ControlContainer.__proto__ || Object.getPrototypeOf(ControlContainer)).call(this, player, options));

			_this._active = null;
			/**
	   * List of items
	   *
	   * @public
	   * @type {Array}
	   */
			_this.list = [];
			return _this;
		}

		/**
	  * Get item of container by index
	  *
	  * @public
	  * @param {number} index
	  */


		_createClass(ControlContainer, [{
			key: 'getByIndex',
			value: function getByIndex(index) {
				return this.list[index];
			}

			/**
	   * Set item active by index
	   *
	   * @public
	   * @param {number} index
	   */

		}, {
			key: 'setActiveByIndex',
			value: function setActiveByIndex(index) {
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

		}, {
			key: 'addItem',


			/**
	   * @public
	   * @param {String|jQuery} Content of item
	   * @param {Object} Data of item
	   */
			value: function addItem(content, data) {
				var item = (0, _jquery2.default)('<div />').addClass('control-container__item').data(data).on('click', this.onItemClick.bind(this)).append(content);
				this.list.push(item);

				this.dropdownContent.append(item);

				return item;
			}

			/**
	   * On item click event handler
	   * @public
	   * @param {Event} e
	   */

		}, {
			key: 'onItemClick',
			value: function onItemClick(e) {
				this.active = e.currentTarget;
			}

			/**
	   * @override
	   */

		}, {
			key: 'buildCSSClass',
			value: function buildCSSClass() {
				return _get(ControlContainer.prototype.__proto__ || Object.getPrototypeOf(ControlContainer.prototype), 'buildCSSClass', this).call(this) + ' control-container';
			}
		}, {
			key: 'active',
			get: function get() {
				var _this2 = this;

				if (this._active && this._active.length > 0) {
					return this._active;
				}
				this.list.forEach(function (item) {
					if (item.hasClass('control-container__item--active')) {
						_this2._active = item;
					}
				});
				return this._active;
			}

			/**
	   * Setter of active field
	   *
	   * @public
	   * @param {jQuery} Item of container
	   */
			,
			set: function set(element) {
				if (this.active) {
					this.active.removeClass('control-container__item--active');
				}
				if (element) {
					(0, _jquery2.default)(element).addClass('control-container__item--active');
				}
				this._active = element;
				return this._active;
			}
		}]);

		return ControlContainer;
	}(_ControlDropdown3.default);

	exports.default = ControlContainer;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * @file SubtitleControl.js
	 *
	 * Subtitle control
	 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _ControlContainer2 = __webpack_require__(21);

	var _ControlContainer3 = _interopRequireDefault(_ControlContainer2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * @param {Player} player Main player
	 * @class SubtitleControl
	 * @extends ControlContainer
	 */
	var SubtitleControl = function (_ControlContainer) {
		_inherits(SubtitleControl, _ControlContainer);

		function SubtitleControl(player) {
			var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			_classCallCheck(this, SubtitleControl);

			options = _jquery2.default.extend({}, {
				iconName: 'commenting-o',
				title: 'Субтитры',
				name: 'subtitle',
				className: 'subtitle-control',
				disable: true
			}, options);
			return _possibleConstructorReturn(this, (SubtitleControl.__proto__ || Object.getPrototypeOf(SubtitleControl)).call(this, player, options));
		}

		_createClass(SubtitleControl, [{
			key: 'onClick',
			value: function onClick(e) {
				_get(SubtitleControl.prototype.__proto__ || Object.getPrototypeOf(SubtitleControl.prototype), 'onClick', this).call(this, e);
				var video = this.player.video;
				this.active = null;
				video.track = -1;
			}
		}, {
			key: 'onItemClick',
			value: function onItemClick(e) {
				_get(SubtitleControl.prototype.__proto__ || Object.getPrototypeOf(SubtitleControl.prototype), 'onItemClick', this).call(this, e);
				var item = (0, _jquery2.default)(e.target);
				var video = this.player.video;
				if (item.data('language')) {
					video.track = item.data('language');
				}
			}
		}, {
			key: 'onPlayerInited',
			value: function onPlayerInited(e, data) {
				var video = this.player.video;
				if (video.subtitles.length > 0) {
					for (var i in video.subtitles) {
						if (!video.subtitles.hasOwnProperty(i)) continue;
						var item = video.subtitles[i];
						this.addItem(item.title, {
							src: item.src,
							language: item.language
						});
					}
					this.disable = false;
				}
			}
		}]);

		return SubtitleControl;
	}(_ControlContainer3.default);

	exports.default = SubtitleControl;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * @file DownloadControl.js
	 *
	 * Download control
	 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _Control2 = __webpack_require__(6);

	var _Control3 = _interopRequireDefault(_Control2);

	var _Icon = __webpack_require__(7);

	var _Icon2 = _interopRequireDefault(_Icon);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * @param {Player} player Main player
	 * @param {Object} [options]
	 * @class DownloadControl
	 * @exnteds Control
	 */
	var DownloadControl = function (_Control) {
		_inherits(DownloadControl, _Control);

		function DownloadControl(player) {
			var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			_classCallCheck(this, DownloadControl);

			options = _jquery2.default.extend({
				title: 'Скачать видео',
				className: 'download',
				name: 'download'
			}, options);

			var _this = _possibleConstructorReturn(this, (DownloadControl.__proto__ || Object.getPrototypeOf(DownloadControl)).call(this, player, options));

			_this.player.on('loadstart', _this.onLoadStart.bind(_this));
			return _this;
		}

		/**
	  * @override
	  */


		_createClass(DownloadControl, [{
			key: 'createElement',
			value: function createElement() {
				// TODO: Доопределить этот метод, а не переопредлеить
				this.element = (0, _jquery2.default)('<a />').attr({
					href: '',
					target: '_blank',
					download: true,
					title: this.options.title
				}).addClass(this.buildCSSClass()).append(new _Icon2.default(this.player, { iconName: 'download' }).element);
			}

			/**
	   * @override
	   */

		}, {
			key: 'buildCSSClass',
			value: function buildCSSClass() {
				return '' + _get(DownloadControl.prototype.__proto__ || Object.getPrototypeOf(DownloadControl.prototype), 'buildCSSClass', this).call(this);
			}

			/**
	   * Setter of link field
	   * @public
	   * @param {String} value Path for video
	   */

		}, {
			key: 'onLoadStart',
			value: function onLoadStart(e, data) {
				this.link = this.player.video.source.url;
			}
		}, {
			key: 'link',
			set: function set(value) {
				var parser = document.createElement('a');
				parser.href = value;
				var fileName = parser.pathname.split('/');
				fileName = fileName[fileName.length - 1];
				this.element.attr({
					'href': value,
					download: fileName
				});
			}
		}]);

		return DownloadControl;
	}(_Control3.default);

	exports.default = DownloadControl;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	
	'use strict';
	/**
	 * @file KeybindingInfoControl.js
	 *
	 * Info control
	 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _ControlDropdown2 = __webpack_require__(9);

	var _ControlDropdown3 = _interopRequireDefault(_ControlDropdown2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * @param {Player} player Main player
	 * @class KeyBindingInfoControl
	 * @extends ControlDropdown
	 */
	var KeyBindingInfoControl = function (_ControlDropdown) {
		_inherits(KeyBindingInfoControl, _ControlDropdown);

		function KeyBindingInfoControl(player, options) {
			_classCallCheck(this, KeyBindingInfoControl);

			options = _jquery2.default.extend({}, {
				iconName: 'info',
				title: 'Инфо',
				className: 'info-control',
				name: 'info'
			}, options);
			return _possibleConstructorReturn(this, (KeyBindingInfoControl.__proto__ || Object.getPrototypeOf(KeyBindingInfoControl)).call(this, player, options));
		}

		_createClass(KeyBindingInfoControl, [{
			key: 'createElement',
			value: function createElement() {
				_get(KeyBindingInfoControl.prototype.__proto__ || Object.getPrototypeOf(KeyBindingInfoControl.prototype), 'createElement', this).call(this);
				var keyBinding = this.player.options.keyBinding;
				var infoContent = '';
				for (var _key in keyBinding) {
					if (!keyBinding.hasOwnProperty(_key)) continue;

					var hotkey = keyBinding[_key];
					var item = '';
					var keyString = '';

					hotkey.info.forEach(function (key, index) {
						if (index != 0) {
							keyString += ' + ';
						}
						keyString += '<kbd class="leplayer-key">' + key + '</kbd>';
					});

					item = '\n\t\t\t\t<div class="info-control__item">\n\t\t\t\t\t' + keyString + ' - ' + hotkey.description + '\n\t\t\t\t</div>\n\t\t\t';

					infoContent += item;
				}
				this.dropdownContent.addClass('info-control__content').append(infoContent);
			}
		}]);

		return KeyBindingInfoControl;
	}(_ControlDropdown3.default);

	exports.default = KeyBindingInfoControl;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * @file TimeInfoControl.js
	 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _Control2 = __webpack_require__(6);

	var _Control3 = _interopRequireDefault(_Control2);

	var _ControlText = __webpack_require__(12);

	var _ControlText2 = _interopRequireDefault(_ControlText);

	var _utils = __webpack_require__(14);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * @param {Player} player Main player
	 * @class TimeInfoControl
	 * @property {ControlText} currentTime Current time's text
	 * @property {ControlText} totalTime Total time
	 * @property {jQuery} line
	 * @extends Control
	 */
	var TimeInfoControl = function (_Control) {
		_inherits(TimeInfoControl, _Control);

		function TimeInfoControl(player) {
			var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			_classCallCheck(this, TimeInfoControl);

			options = _jquery2.default.extend({}, {
				className: 'timeline timeline-container',
				name: 'time-info'
			}, options);

			var _this = _possibleConstructorReturn(this, (TimeInfoControl.__proto__ || Object.getPrototypeOf(TimeInfoControl)).call(this, player, options));

			_this.player.on('timeupdate', function (e, data) {
				var time = data.time;

				_this._currentTimeControl.text = (0, _utils.secondsToTime)(time);
			});
			return _this;
		}

		/**
	  * @override
	  */


		_createClass(TimeInfoControl, [{
			key: 'createElement',
			value: function createElement() {
				this._currentTimeControl = new _ControlText2.default(this.player, { className: 'control-time__current' });
				this._totalTimeControl = new _ControlText2.default(this.player, { className: 'control-time__total' });

				this.element = (0, _jquery2.default)('<div/>').addClass('control-time');
				this.element.append(this._currentTimeControl.element).append(this._totalTimeControl.element);

				return this.element;
			}

			/**
	   * @override
	   */

		}, {
			key: 'onPlayerInited',
			value: function onPlayerInited(e) {
				var video = this.player.video;
				this._currentTimeControl.text = (0, _utils.secondsToTime)(video.currentTime);
				this._totalTimeControl.text = (0, _utils.secondsToTime)(video.duration);
			}
		}, {
			key: '_onClick',
			value: function _onClick(e) {
				e.preventDefault();
			}
		}, {
			key: 'currentTime',
			set: function set(value) {}
		}]);

		return TimeInfoControl;
	}(_Control3.default);

	exports.default = TimeInfoControl;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * @file MiniPlayer.js
	 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _Component2 = __webpack_require__(3);

	var _Component3 = _interopRequireDefault(_Component2);

	var _ControlCollection = __webpack_require__(2);

	var _ControlCollection2 = _interopRequireDefault(_ControlCollection);

	var _utils = __webpack_require__(14);

	var _Icon = __webpack_require__(7);

	var _Icon2 = _interopRequireDefault(_Icon);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * @class MiniPlayer
	 * @param {Player} player Main player
	 * @param {Object} [options]
	 * @extends Control
	 */
	var MiniPlayer = function (_Component) {
		_inherits(MiniPlayer, _Component);

		function MiniPlayer(player, options) {
			_classCallCheck(this, MiniPlayer);

			// Merge options
			options = _jquery2.default.extend({}, {
				visible: false
			}, player.options.miniplayer, options);

			var _this = _possibleConstructorReturn(this, (MiniPlayer.__proto__ || Object.getPrototypeOf(MiniPlayer)).call(this, player, options));

			if (_this.options.width != null) {
				console.warn('miniplayer.width is deprecated option. Now uses CSS for this');
			}

			if (!options.visible) {
				_this.hide();
			}

			_this.listenScroll();
			_this.player.on('fullscreenchange', _this._onFullscreenChange.bind(_this));
			return _this;
		}

		_createClass(MiniPlayer, [{
			key: 'listenScroll',
			value: function listenScroll() {
				var _this2 = this;

				var didScroll = false;

				(0, _jquery2.default)(window).scroll(function () {
					didScroll = true;
				});

				setInterval(function () {
					if (didScroll) {
						didScroll = false;

						var scrollTop = (0, _jquery2.default)(window).scrollTop();

						if (scrollTop > _this2.offsetShow) {
							_this2.show();
						} else {
							_this2.hide();
						}
					}
				}, 250);
			}
		}, {
			key: '_onFullscreenChange',
			value: function _onFullscreenChange(e, data) {
				if (data == true) {
					this.hide();
				}
			}
		}, {
			key: 'show',


			/**
	   * Show mini player
	   *
	   * @public
	   */
			value: function show() {
				if (this.visible == true) {
					return;
				}
				this.visible = true;
				this.player.innerElement.css('max-width', this.width);
				this.player.element.css('padding-top', this.player.videoContainer.height());
				this.player.setView('mini');
			}

			/**
	   * Hide mini player
	   *
	   * @public
	   */

		}, {
			key: 'hide',
			value: function hide() {
				if (this.visible == false) {
					return;
				}
				this.player.setView('common');

				this.player.innerElement.css('max-width', '');
				// Added empty space
				this.player.element.css('padding-top', '');
				this.visible = false;
			}

			/**
	   * @override
	   */

		}, {
			key: 'createElement',
			value: function createElement() {
				var controls = new _ControlCollection2.default(this.player, { name: 'mini' });
				return this.element = (0, _utils.createEl)('div', {
					className: 'leplayer-miniplayer'
				}).append(controls.element);
			}
		}, {
			key: 'offsetShow',
			get: function get() {
				if (_jquery2.default.isFunction(this.options.offsetShow)) {
					return this.options.offsetShow(this.player);
				}

				return this.options.offsetShow;
			}
		}, {
			key: 'height',
			get: function get() {
				return this.player.element.height();
			}
		}, {
			key: 'width',
			get: function get() {
				return this.options.width || this.player.element.width();
			}
		}]);

		return MiniPlayer;
	}(_Component3.default);

	exports.default = MiniPlayer;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * @file PlayButton.js
	 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _Control2 = __webpack_require__(6);

	var _Control3 = _interopRequireDefault(_Control2);

	var _Icon = __webpack_require__(7);

	var _Icon2 = _interopRequireDefault(_Icon);

	var _utils = __webpack_require__(14);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * @param {Player} player Main player
	 */
	var PlayButton = function (_Control) {
		_inherits(PlayButton, _Control);

		function PlayButton(player, options) {
			_classCallCheck(this, PlayButton);

			var _this = _possibleConstructorReturn(this, (PlayButton.__proto__ || Object.getPrototypeOf(PlayButton)).call(this, player, options));

			_this.element.on('dblclick', _this._onDbclick.bind(_this));
			return _this;
		}

		_createClass(PlayButton, [{
			key: 'createElement',
			value: function createElement() {
				var inner = (0, _utils.createEl)('div', {
					className: 'leplayer-play-button__button'
				}).append(new _Icon2.default(this.player, { iconName: 'play' }).element);

				this.element = (0, _utils.createEl)('div', {
					className: this.buildCSSClass
				}).append(inner);

				return this.element;
			}
		}, {
			key: 'onClick',
			value: function onClick(e) {
				_get(PlayButton.prototype.__proto__ || Object.getPrototypeOf(PlayButton.prototype), 'onClick', this).call(this, e);
				this.player.trigger('click');
			}
		}, {
			key: '_onDbclick',
			value: function _onDbclick() {
				this.player.trigger('dblclick');
			}

			/**
	   * @override
	   */

		}, {
			key: 'buildCSSClass',
			value: function buildCSSClass() {
				return 'leplayer-play-button';
			}
		}]);

		return PlayButton;
	}(_Control3.default);

	exports.default = PlayButton;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * @file Sections.js
	 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _Component2 = __webpack_require__(3);

	var _Component3 = _interopRequireDefault(_Component2);

	var _utils = __webpack_require__(14);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * @class Sections
	 * @param {Player} player Main player
	 * @param {Object} [options]
	 * @param {Array} [options.items=[]} Data for sections
	 * @param {Boolean} [options.fullscreenOnly] Show section only in fullscreen
	 * @param {Boolean} [options.main=true] Main sections of player
	 * @extends Component
	 */
	var Sections = function (_Component) {
		_inherits(Sections, _Component);

		function Sections(player, options) {
			var _ret;

			_classCallCheck(this, Sections);

			var _options$items = options.items;
			var items = _options$items === undefined ? [] : _options$items;
			var _options$main = options.main;
			var main = _options$main === undefined ? true : _options$main;

			items = [].concat(items);

			//options.items = items;

			var _this = _possibleConstructorReturn(this, (Sections.__proto__ || Object.getPrototypeOf(Sections)).call(this, player, options));

			_this.activeSection = _this.getSectionByIndex(0);

			_this.items = items;
			_this.length = _this.items.length;

			_this.setActiveByIndex(0);

			_this.element.find('.leplayer-section').on('click', _this.onSectionClick.bind(_this));

			_this.player.on('sectionstoggle', _this._onSectionsToggle.bind(_this));

			_this.player.on('timeupdate', _this.onTimeUpdate.bind(_this));

			//this.player.trigger('sectionsinit', { items : this.items, sections : this });
			_this.player.on('inited', _this.onPlayerInited.bind(_this));

			return _ret = _this, _possibleConstructorReturn(_this, _ret);
		}

		_createClass(Sections, [{
			key: 'next',
			value: function next() {
				var sectionIndex = parseInt(this.activeSection.attr('data-index'));
				var newIndex = sectionIndex >= this.length ? this.length : sectionIndex + 1;

				this.setActiveByIndex(newIndex);

				this.player.video.currentTime = this.items[sectionIndex].end;
			}
		}, {
			key: 'prev',
			value: function prev() {
				var sectionIndex = parseInt(this.activeSection.attr('data-index'));
				var newIndex = sectionIndex <= 0 ? 0 : sectionIndex - 1;

				this.setActiveByIndex(newIndex);
				this.player.video.currentTime = this.items[newIndex].begin;
			}

			/**
	   * @override
	   */

		}, {
			key: 'createElement',
			value: function createElement() {
				this.element = (0, _jquery2.default)('<div />').addClass('leplayer-sections');
				if (this.options.fullscreenOnly) {
					this.element.addClass('leplayer-sections--fsonly');
				}
				this.element.append(this._createSections(this.options.items));
				return this.element;
			}

			/**
	   * @override
	   */

		}, {
			key: 'onPlayerInited',
			value: function onPlayerInited() {

				if (this.items != null && this.items.length > 0) {
					this.items[this.items.length - 1].end = this.player.video.duration;
				}
			}
		}, {
			key: 'onSectionClick',
			value: function onSectionClick(e) {
				var video = this.player.video;
				var section = (0, _jquery2.default)(e.target).closest('.leplayer-section');
				video.currentTime = section.attr('data-begin');
				this.player.trigger('sectionsclick', { section: this.items[section.attr('data-index')] });
			}
		}, {
			key: 'setActiveByIndex',
			value: function setActiveByIndex(index) {
				if (this.activeSection.length == 0) {
					return;
				}
				if (this.activeSection.attr('data-index') == index) {
					return;
				}

				if (this.getSectionByIndex(index).length == 0) {
					return;
				}

				this.activeSection.removeClass('leplayer-section--active');

				this.activeSection = this.getSectionByIndex(index);

				this.activeSection.addClass('leplayer-section--active');
				if (this.player.getView() !== 'mini') {
					this.element.stop().animate({
						scrollTop: this.activeSection.position().top
					}, 800);
				}
			}
		}, {
			key: 'getSectionByIndex',
			value: function getSectionByIndex(index) {
				return this.element.find('.leplayer-section[data-index="' + index + '"]');
			}
		}, {
			key: 'onTimeUpdate',
			value: function onTimeUpdate(e, data) {
				if (this.activeSection.length == 0) {
					return;
				}
				var currentTime = data.time;

				var endSectionTime = this.activeSection.attr('data-end');

				// Update span with end section time
				if (this.player.getView() === 'mini') {
					this.activeSection.next().find('.time').text((0, _utils.secondsToTime)(endSectionTime - currentTime));
				}

				for (var i = 0; i < this.items.length; i++) {
					var section = this.items[i];
					if (currentTime < section.end) {
						this.setActiveByIndex(i);
						break;
					}
				}
			}
		}, {
			key: '_onSectionsToggle',
			value: function _onSectionsToggle(e, data) {
				if (this.element.hasClass('leplayer-sections--hidden') && data.checked) {
					this.element.removeClass('leplayer-sections--hidden');
				} else if (!data.checked) {
					this.element.addClass('leplayer-sections--hidden');
				}
			}
		}, {
			key: '_createSections',
			value: function _createSections(items) {
				var result = '';
				items.forEach(function (section, index) {
					var item = ('\n\t\t\t\t<div class="leplayer-section ' + (!index ? 'leplayer-section--active' : '') + '"\n\t\t\t\t\tdata-begin="' + section.begin + '"\n\t\t\t\t\tdata-index="' + index.toString() + '"\n\t\t\t\t\tdata-end="' + section.end + '">\n\t\t\t\t\t<div class="leplayer-section-time">' + (0, _utils.secondsToTime)(section.begin) + '</div>\n\t\t\t\t\t<div class="leplayer-section-info">\n\t\t\t\t\t\t<div class="leplayer-section-next-info">\n\t\t\t\t\t\t\t\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0430\u044F \u0441\u0435\u043A\u0446\u0438\u044F \u043D\u0430\u0447\u043D\u0435\u0442\u0441\u044F \u0447\u0435\u0440\u0435\u0437\n\t\t\t\t\t\t\t<span class="time">' + (0, _utils.secondsToTime)(items[0].end) + '</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t' + (section.title != null ? '<div class="leplayer-section-title">' + section.title + '</div>' : '') + '\n\t\t\t\t\t\t' + (section.description != null ? '<div class="leplayer-section-description">' + section.description + '</div>' : '') + '\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t').trim();
					result += item;
				});
				return result;
			}
		}]);

		return Sections;
	}(_Component3.default);

	exports.default = Sections;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * @file ErrorDisplay.js
	 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _Component2 = __webpack_require__(3);

	var _Component3 = _interopRequireDefault(_Component2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * @param {Player} player Main player
	 * @param {Object} [options]
	 * @class ErrorDisplay
	 * @extends Component
	 */
	var ErrorDisplay = function (_Component) {
		_inherits(ErrorDisplay, _Component);

		function ErrorDisplay(player) {
			var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			_classCallCheck(this, ErrorDisplay);

			var _this = _possibleConstructorReturn(this, (ErrorDisplay.__proto__ || Object.getPrototypeOf(ErrorDisplay)).call(this, player, options));

			if (_this.player._error != null) {
				_this.message = _this.player._error.message;
				_this.element.show();
			}
			_this.player.on('error', _this.onPlayerError.bind(_this));
			return _this;
		}

		/**
	  * @override
	  */


		_createClass(ErrorDisplay, [{
			key: 'createElement',
			value: function createElement() {
				this.element = (0, _jquery2.default)('<div />').addClass('leplayer-error-display');
			}
		}, {
			key: 'onPlayerError',
			value: function onPlayerError(e, data) {
				var error = data.error;
				this.message = error.message;
				this.element.show();
			}
		}, {
			key: 'message',
			set: function set(value) {
				this.element.html(value);
			}
		}]);

		return ErrorDisplay;
	}(_Component3.default);

	exports.default = ErrorDisplay;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * @file ErrorDisplay.js
	 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _Component2 = __webpack_require__(3);

	var _Component3 = _interopRequireDefault(_Component2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * @param {Player} player Main player
	 * @param {Object} [options]
	 * @param {String} [options.imgUrl] path to poster image
	 * @class Poster
	 * @extends Component
	 */
	var Poster = function (_Component) {
		_inherits(Poster, _Component);

		function Poster(player) {
			var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			_classCallCheck(this, Poster);

			options = _jquery2.default.extend({}, {
				imgUrl: player.options.poster
			}, options);

			return _possibleConstructorReturn(this, (Poster.__proto__ || Object.getPrototypeOf(Poster)).call(this, player, options));
		}

		/**
	  * @override
	  */


		_createClass(Poster, [{
			key: 'createElement',
			value: function createElement() {
				this.element = (0, _jquery2.default)('<div />').css('background-image', 'url("' + this.options.imgUrl + '")').addClass('leplayer-poster');
			}
		}]);

		return Poster;
	}(_Component3.default);

	exports.default = Poster;

/***/ },
/* 31 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	/**
	 * @file fullscreen-api.js
	 */

	/*
	 * Store the browser-specific methods for the fullscreen API
	 * @type {Object|undefined}
	 * @private
	 */
	var FullscreenApi = {};

	// browser API methods
	// map approach from Screenful.js - https://github.com/sindresorhus/screenfull.js
	var apiMap = [
	// Spec: https://dvcs.w3.org/hg/fullscreen/raw-file/tip/Overview.html
	['requestFullscreen', 'exitFullscreen', 'fullscreenElement', 'fullscreenEnabled', 'fullscreenchange', 'fullscreenerror'],
	// WebKit
	['webkitRequestFullscreen', 'webkitExitFullscreen', 'webkitFullscreenElement', 'webkitFullscreenEnabled', 'webkitfullscreenchange', 'webkitfullscreenerror'],
	// Old WebKit (Safari 5.1)
	['webkitRequestFullScreen', 'webkitCancelFullScreen', 'webkitCurrentFullScreenElement', 'webkitCancelFullScreen', 'webkitfullscreenchange', 'webkitfullscreenerror'],
	// Mozilla
	['mozRequestFullScreen', 'mozCancelFullScreen', 'mozFullScreenElement', 'mozFullScreenEnabled', 'mozfullscreenchange', 'mozfullscreenerror'],
	// Microsoft
	['msRequestFullscreen', 'msExitFullscreen', 'msFullscreenElement', 'msFullscreenEnabled', 'MSFullscreenChange', 'MSFullscreenError']];

	var specApi = apiMap[0];

	var browserApi = void 0;

	// determine the supported set of functions
	for (var i = 0; i < apiMap.length; i++) {
		// check for exitFullscreen function
		if (apiMap[i][1] in document) {
			browserApi = apiMap[i];
			break;
		}
	}

	// map the browser API names to the spec API names
	if (browserApi) {
		for (var _i = 0; _i < browserApi.length; _i++) {
			FullscreenApi[specApi[_i]] = browserApi[_i];
		}
	}

	exports.default = FullscreenApi;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var MediaError = function MediaError(value) {
		_classCallCheck(this, MediaError);

		if (value instanceof MediaError) {
			return value;
		}
		if (typeof value === 'number') {
			this.code = value;
		} else if (typeof value === 'string') {
			// default code is zero, so this is a custom error
			this.message = value;
		} else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {

			// We assign the `code` property manually because native MediaError objects
			// do not expose it as an own/enumerable property of the object.
			if (typeof value.code === 'number') {
				this.code = value.code;
			}

			_jquery2.default.extend(this, value);
		}

		if (!this.message) {
			this.message = MediaError.defaultMessages[this.code] || '';
		}
	};

	MediaError.prototype.code = 0;

	MediaError.prototype.message = '';

	MediaError.errorTypes = ['MEDIA_ERR_CUSTOM', 'MEDIA_ERR_ABORTED', 'MEDIA_ERR_NETWORK', 'MEDIA_ERR_DECODE', 'MEDIA_ERR_SRC_NOT_SUPPORTED', 'MEDIA_ERR_ENCRYPTED'];

	MediaError.defaultMessages = {
		1: 'Вы прервали загрузку видео.',
		2: 'Загрузка видео прервана из-за потери соединения.',
		3: 'Загрузка видео остановлена из-за проблем с видеофайлом или из-за того, что ваш браузер не поддерживает воспроизведение данного файла.',
		4: 'Видео не может быть загружено из-за проблем с интернет-соединением или проблем на сервере. Или формат файла не поддерживается вашим браузером.',
		5: 'Видео зашифровано, и мы не можем его расшифровать.'
	};

	// Add types as properties on MediaError
	// e.g. MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED = 4;
	for (var errNum = 0; errNum < MediaError.errorTypes.length; errNum++) {
		MediaError[MediaError.errorTypes[errNum]] = errNum;
		// values should be accessible on both the class and instance
		MediaError.prototype[MediaError.errorTypes[errNum]] = errNum;
	}

	exports.default = MediaError;

/***/ }
/******/ ]);