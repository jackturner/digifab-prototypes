$(function() {

	var $project_cards = $('#project-cards')

	var build_projects = function (projects) {
		console.log(projects)

		for(var i = 0; i < projects.length; i++) {
			var project = projects[i]

			console.log(project.name, project.thumbnail)

			$('<div class="project-card"/>')
				.css('background-image', 'url("' + project.thumbnail + '")')
				.append('<div class="filter" />')
				.append('<div class="content"><span class="name">' + project.name	 + '</span></div>')
				.appendTo($project_cards)

		}

		// Build			
		// <div class="project-card" style="background-image: url('images/project/.jpg');">
		//   <div class="filter"></div>
		//   <div class="content">
		//     <span class="name"></span>
		//   </div>
		// </div>

	}

	$.getJSON( "projects.json", build_projects)

})