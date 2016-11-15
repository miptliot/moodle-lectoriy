$(function() {
	var dropdown = $('#changeTheme');
	var theme = $('#linkPlayerTheme');

	$('.link-set-theme').on('click', function (event) {
		var name = $(this).data('name');
		theme.attr('href', '../dist/css/' + name + '/le-player.css');
	})



		$('.btn-hide-divider').on('click', function(e) {
			var id = $(e.target).attr('data-video-id');
			var container = $('#'+id).parents('.leplayer-container');
			container.find('.divider').each(function(i, el) {
				$(el).toggle()
			})
		});

	(function() {
		var _toggled = false;

		$('.btn-hide-line-offset').on('click', function(e) {
			var id = $(e.target).attr('data-video-id');
			var container = $('#'+id).parents('.leplayer-container');

			var controls = container.find('.leplayer-controls.controls-common');
			if (_toggled) {
				controls.css({
					'margin-top' : '10px'
				})
			} else {
				controls.css({
					'margin-top' : '0'
				})
			}
			_toggled = !_toggled;
		})
	})();
})

