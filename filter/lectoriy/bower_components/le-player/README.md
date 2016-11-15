# le-player

> le-player - это веб плеер созданный для Лектория. Плеер поддерживает все фичи HTML5, так же, как YouTube и Vimeo. le-player использует jqeury и сделан в качетсве плагина для jquery.


## Быстрый старт

Для начала нужно скачать плеер себе в проект.


```
npm install --save-dev https://github.com/miptliot/le-player.git
```

или


```
bower install --save-dev https://github.com/miptliot/le-player.git
```

Для работы с плеером достаточно подключить два файла в `head` и убедиться что подключен jQuery.


```javascript
<link href="path/to/jquery.min.js" rel="stylesheet">
<link href="path/to/le-player.min.css" rel="stylesheet">
<script src="path/to/le-player.min.js"></script>
```

Теперь, если вы хотите использовать le-player, мы можете просто задать вашему элементу `<video>` какой-нибудь ID или класс и инилизировать его:

HTML:
```HTML
<video id="video1" src="sample1.mp4"></video>
```

JS:
```javascript
$(funciton () {
	$('video1').lePlayer({
		/** JSON c настройками */
	});
});
```

Так же можно задать source в JS

```javascript
$(funciton () {
	$('video1').lePlayer({
		sources : 'sample1.mp4'
	});
});
```


le-player поддерживает подключение нескольких видеозаписей в одном видео (например с разным качеством)

```
<video id="video1">

	<source src="sample1.mp4" title="360">
	<source src="sample2.mp4" title="1280">

</video>
```

Так же можно задать с помощью JS

JS:
```javascript
$(funciton () {
	$('video1').lePlayer({
		sources : ['sample1.mp4', 'sample2.mp4']
		// или
		sources : [ { src : 'sample1.mp4', title : '360'}, { src : 'sample2.mp4', title : '1280'}]
	});
});
```


Посмотреть какие бывают настройки можно в документации (ссылка на доки).
