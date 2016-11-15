import $ from 'jquery';

class MediaError {
	constructor(value) {
		if( value instanceof MediaError ) {
			return value;
		}
		if (typeof value === 'number') {
			this.code = value;
		} else if (typeof value === 'string') {
		// default code is zero, so this is a custom error
			this.message = value;
		} else if (typeof value === 'object') {

			// We assign the `code` property manually because native MediaError objects
			// do not expose it as an own/enumerable property of the object.
			if (typeof value.code === 'number') {
			  this.code = value.code;
			}

			$.extend(this, value);
		}

		if (!this.message) {
			this.message = MediaError.defaultMessages[this.code] || '';
		}
	}
}

MediaError.prototype.code = 0;

MediaError.prototype.message = '';

MediaError.errorTypes = [
  'MEDIA_ERR_CUSTOM',
  'MEDIA_ERR_ABORTED',
  'MEDIA_ERR_NETWORK',
  'MEDIA_ERR_DECODE',
  'MEDIA_ERR_SRC_NOT_SUPPORTED',
  'MEDIA_ERR_ENCRYPTED'
];


MediaError.defaultMessages = {
  1: 'Вы прервали загрузку видео.',
  2: 'Загрузка видео прервана из-за потери соединения.',
  3: 'Загрузка видео остановлена из-за проблем с видеофайлом или из-за того, что ваш браузер не поддерживает воспроизведение данного файла.',
  4: 'Видео не может быть загружено из-за проблем с интернет-соединением или проблем на сервере. Или формат файла не поддерживается вашим браузером.',
  5: 'Видео зашифровано, и мы не можем его расшифровать.'
};

// Add types as properties on MediaError
// e.g. MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED = 4;
for (let errNum = 0; errNum < MediaError.errorTypes.length; errNum++) {
  MediaError[MediaError.errorTypes[errNum]] = errNum;
  // values should be accessible on both the class and instance
  MediaError.prototype[MediaError.errorTypes[errNum]] = errNum;
}

export default MediaError;
