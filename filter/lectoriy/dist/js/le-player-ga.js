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

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	window.$.lePlayer.plugin('ga', function (pluginOptions) {
		var player = this;

		player.on('firstplay', function (e) {
			window.ga('send', 'event', 'Player Video Started');
		});

		player.on('controlclick', function (e, data) {
			var control = data.control;
			var _control$options = control.options;
			var name = _control$options.name;
			var collection = _control$options.collection;

			if (name) {
				window.ga('send', 'event', 'Player Control Click', name, collection);
			}
		});

		player.on('sectionsclick', function (e, data) {
			window.ga('send', 'event', 'Player Sections', 'Click', player.getView());
		});

		player.on('timeupdate', function () {
			var percent = player.video.playedPercentage;
			var delta = 5;
			if (Math.abs(percent - 100) < delta) {
				window.ga('send', 'event', 'Player Video Played', '95-100%');
			}
		});
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = $;

/***/ }
/******/ ]);