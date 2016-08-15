$(function() {

	var $project_card_container = $('#project-cards'),
			$project_cards

	var build_projects = function (projects) {

		for(var i = 0; i < projects.length; i++) {

			var project = projects[i]

			$('<div class="project-card"/>')
				.css('background-image', 'url("' + project.thumbnail + '")')
				.data(project)
				.append('<div class="blur" />')
				.append('<div class="content"><span class="name">' + project.name	 + '</span></div>')
				.appendTo($project_card_container)

		}

		$project_cards = $('.project-card')

	}

	var toggle_filter = function() {
		var filter_name = $(this).data('filter'),
				filter_ui = $('#filter-' + filter_name)

	  $project_cards.show()

		$('.filter').not(filter_ui).hide()
		filter_ui.toggle()
	}

	var setup_cost_slider = function() {
		var cost_slider = document.getElementById('cost-slider')

		noUiSlider.create(cost_slider, {
			start: [ 20000, 500000 ],
			connect: true,
			range: {
				'min': [0],
				'max': [600000]
			}
		})

		cost_slider.noUiSlider.on('change', update_cost_filter)

	}

	var update_cost_filter = function(range) {
		$project_cards.each(function() {
			var $this = $(this),
					project_cost = $this.data('cost')

			if(project_cost >= range[0] && project_cost <= range[1])
				$this.show()
			else
				$this.hide()
		})
	}

	$.getJSON( "projects.json", build_projects)
	$('.filter-toggle').click(toggle_filter)
	setup_cost_slider()


})