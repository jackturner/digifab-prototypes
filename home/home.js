$(function () {

	var $image = $('#feed .image')

	var switch_images = function () {

		var is_wide = $image.hasClass('wide')

		if(is_wide)
			$image.removeClass('wide').addClass('tall')
		else
			$image.removeClass('tall').addClass('wide')

	}

	$image.click(switch_images)

})