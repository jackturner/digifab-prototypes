// var dfs = (function() {
  
	var $project_card_container = $('#project-cards'),
			$client_card_container = $('#client-cards'),
			$project_cards,
			$checkbox_forms = $('#filter-finish-form,#filter-software-form,#filter-technique-form,#filter-machine-form,#filter-hardware-form,#filter-team-form'),
			_map,
			_clients,
			_projects,
			_data

	var build = function(json) {
		_data = json
		build_projects(json.projects)
		build_clients(json.clients)
		$checkbox_forms.on('change', filter_by_checkboxes).each(build_form)
	}

	var build_projects = function (projects_json) {

		_projects = projects_json

		for(var i = 0; i < _projects.length; i++) {

			var project = _projects[i]

			var el = $('<div class="project-card card"/>')
								.css('background-image', 'url("' + project.thumbnail + '")')
								.data(project)
								.append('<div class="blur" />')
								.append('<div class="content"><span class="name">' + project.name	 + '</span>' + 
												'<span class="info cost">$' + numberWithCommas(project.cost) + '</span>' + 
												'<span class="info location">' + project.location + '</span></div>')
								.appendTo($project_card_container)

			_projects[i].el = el

		}

		$project_cards = $('.project-card')

	}

	var build_clients = function (clients_json) {

		_clients = clients_json

		for(var i = 0; i < _clients.length; i++) {

			var client = _clients[i]

			var el = $('<div class="client-card card"/>')
								.data(client)
								.append('<div class="content"><span class="name">' + client.name	 + '</span></div>')
								.appendTo($client_card_container)

			el.click(filter_by_client)

		}

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
				// console.log(e)
			}
	  }
	}

	var show_cost = function() {
		console.log('show_cost()')
	}

	var show_location = function() {
		console.log('show_location()')

		// Create map with geocoder (aka search box)
    mapboxgl.accessToken = 'pk.eyJ1IjoiamFja3R1cm5lciIsImEiOiJjaXJ4a2gzcm8wMGNwMnpsZWV0cjZnMm9mIn0.6z2T5s2R2jjGHAEb2Dtm4A'
		_map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/outdoors-v9',
      center: [-94, 39],
      zoom: 3
    })

    _map.addControl(new mapboxgl.Geocoder())

    // Add markers for all projects
		for(var i = 0; i < _projects.length; i++) {

			var project = _projects[i]

	    var marker = new mapboxgl.Marker().setLngLat([project.location_lon, project.location_lat]).addTo(_map)

	  }

	  _map.on('moveend', function() {
	  	filter_by_location()
	  })

	}

	var filter_by_client = function (client_el) {

		var searching_for_client_id = $(client_el.currentTarget).data('id')

		$project_cards.each(function() {
			var $this = $(this),
					this_client_id = $this.data('client_id')

			if(this_client_id == searching_for_client_id)
				$this.show()
			else
				$this.hide()
		})


	}

	var filter_by_location = function() {

  	var bounds = _map.getBounds().toArray()

		$project_cards.each(function() {
			var $this = $(this),
					lon = $this.data('location_lon'),
					lat = $this.data('location_lat')

			if( bounds[0][0] <= lon && lon <= bounds[1][0] &&
					bounds[0][1] <= lat && lat <= bounds[1][1] )
				$this.show()
			else
				$this.hide()
		})

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

	var filter_by_status = function() {

		var searching_for_status = this.value

		$project_cards.each(function() {
			var $this = $(this)

			if(	searching_for_status == 'all' ||
					$this.data('status') == searching_for_status)
				$this.show()
			else
				$this.hide()
		})
	}

	var filter_by_checkboxes = function() {

		var $form = $(this),
				$checked = $form.find(':checked'),
				filtering_by = $form.data('filter')
				ids = []
		
		$checked.each(function() {
		  ids.push(parseInt(this.value))
		})

		$project_cards.each(function() {
			var $this = $(this)

			if(	!ids.length || find_one($this.data(filtering_by), ids) )
				$this.show()
			else
				$this.hide()
		})

	}

	var find_one = function (haystack, arr) {
    return arr.some(function (v) {
      return haystack.indexOf(v) >= 0
    })
	}

// <label><input type="checkbox" name="filter-finish" value="1" />Lacquer</label>
// <label><input type="checkbox" name="filter-finish" value="2" />Conversion Varnish</label>
// <label><input type="checkbox" name="filter-finish" value="3" />Wax</label>
// <label><input type="checkbox" name="filter-finish" value="4" />Powdercoat</label>

	var build_form= function() {

		var $this = $(this),
				filter_type = $this.data('filter'),
				filter_data = _data[filter_type]
console.log(filter_type, filter_data.length)

		for (var i = 0; i < filter_data.length; i++) {

			var this_entry = filter_data[i]
			console.log(filter_type, this_entry.display_name)
			$('<label><input type="checkbox" value="'+this_entry.id+'" />'+this_entry.display_name+'</label>').appendTo($this)

		}
		// console.log(filter_type, filter_data)

	}

	$.getJSON( "data.json", build)
	$('.filter-toggle').click(toggle_filter)
	setup_cost_slider()
	$('#filter-status-form').on('change', 'select', filter_by_status)

	
// 	return {
// 		projects: function() { return _projects }
// 	}

// })();