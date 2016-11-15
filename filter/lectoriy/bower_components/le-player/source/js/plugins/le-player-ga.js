import $ from 'jquery';

window.$.lePlayer.plugin('ga', function(pluginOptions) {
	const player = this;

	player.on('firstplay', (e) => {
		window.ga(
			'send',
			'event',
			'Player Video Started'
		)
	})

	player.on('controlclick', (e, data) => {
		const control = data.control;
		const {name, collection} = control.options;
		if(name) {
			window.ga(
				'send',
				'event',
				'Player Control Click',
				name,
				collection
			)
		}
	})

	player.on('sectionsclick', (e, data) => {
		window.ga(
			'send',
			'event',
			'Player Sections',
			'Click',
			player.getView()
		)
	})


	player.on('timeupdate', () => {
		const percent = player.video.playedPercentage;
		const delta = 5
		if (Math.abs(percent - 100) < delta) {
			window.ga(
				'send',
				'event',
				'Player Video Played',
				'95-100%',
			)
		}
	});

})
