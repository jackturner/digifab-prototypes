// map.getBounds().toArray()

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
				.append('<div class="content"><span class="name">' + project.name	 + '</span>' + 
								'<span class="info cost">$' + numberWithCommas(project.cost) + '</span>' + 
								'<span class="info location">' + project.location + '</span></div>')
				.appendTo($project_card_container)

		}

		$project_cards = $('.project-card')

	}

	var toggle_filter = function() {
		var filter_name = $(this).data('filter'),
				filter_ui = $('#filter-' + filter_name)

		$project_card_container.removeClass()
	  $project_cards.show()

		$('.filter').not(filter_ui).hide()
		if(filter_ui.is(':visible')) {
			filter_ui.hide()
		} else {
			filter_ui.show()
			$project_card_container.addClass(filter_name)
			try{
				eval('show_' + filter_name + '()')
			} catch(e) {
				console.log(e)
			}
	  }
	}

	var show_cost = function() {
		console.log('show_cost()')
	}

	var show_location = function() {
		console.log('show_location()')

    mapboxgl.accessToken = 'pk.eyJ1IjoiamFja3R1cm5lciIsImEiOiJjaXJ4a2gzcm8wMGNwMnpsZWV0cjZnMm9mIn0.6z2T5s2R2jjGHAEb2Dtm4A'
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/outdoors-v9',
      center: [-73.8051687, 42.2512107],
      zoom: 5
    })
    map.addControl(new mapboxgl.Geocoder())

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

		cost_slider.noUiSlider.on('change', filter_by_cost)

	}

	var filter_by_cost = function(range) {
		$project_cards.each(function() {
			var $this = $(this),
					project_cost = $this.data('cost')

			if(project_cost >= range[0] && project_cost <= range[1])
				$this.show()
			else
				$this.hide()
		})
	}

	var numberWithCommas = function(x) {
	    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	$.getJSON( "projects.json", build_projects)
	$('.filter-toggle').click(toggle_filter)
	setup_cost_slider()


})