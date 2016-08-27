var faker = require('faker'),
		fs = require('fs')

var finish = [
  {"id": 1, "name": "lacquer", "display_name": "Lacquer"},
  {"id": 2, "name": "conversion_varnish", "display_name": "Conversion Varnish"},
  {"id": 3, "name": "wax", "display_name": "Wax"},
  {"id": 4, "name": "powdercoat", "display_name": "Powdercoat"}
]

var software = [
  {"id": 1, "name": "autocad", "display_name": "Autocad"},
  {"id": 1, "name": "rhino", "display_name": "Rhino"},
  {"id": 1, "name": "solidworks", "display_name": "Solidworks"},
  {"id": 1, "name": "grasshoper", "display_name": "Grasshopper"}
]

var technique = [
  {"id": 1, "name": "veneering", "display_name": "Veneering"},
  {"id": 2, "name": "thermoforming", "display_name": "Thermoforming"},
  {"id": 3, "name": "inlay", "display_name": "Inlay"}	
]

var machine = [
  {"id": 1, "name": "weeke", "display_name": "Weeke"},
  {"id": 2, "name": "flow", "display_name": "Flow"},
  {"id": 3, "name": "holzma", "display_name": "Holzma"}	
]

var hardware = [
  {"id": 1, "name": "european_hinges", "display_name": "European Hinges"},
  {"id": 2, "name": "casters", "display_name": "Casters"},
  {"id": 3, "name": "pulls", "display_name": "Pulls"}	
]

var team = [
  {"id": 1, "name": "woodwork", "display_name": "Woodwork"},
  {"id": 2, "name": "metalwork", "display_name": "Metalwork"},
  {"id": 3, "name": "cnc", "display_name": "CNC"},
  {"id": 4, "name": "finishing", "display_name": "Finishing"},
  {"id": 5, "name": "facilities", "display_name": "Facilities"}	
]

var data = {
	"clients": [],
	"projects": [],
	"finish": finish,
	"software": software,
	"technique": technique,
	"machine": machine,
	"hardware": hardware,
	"team": team
}

var random_client = function (num) {
	return {
		"id": num + 1,
	  "name": faker.company.companyName(),
	  "description": faker.lorem.paragraph()
	}
}

var couple_of_ids = function (arr) {

	var ids = [],
			num_in_arr = arr.length
			num_loops = Math.floor(Math.random() * 3)

	for (var i = 0; i < num_loops; i++) {
		ids.push( Math.floor(Math.random() * num_in_arr) + 1 )
	}

	return ids

}

var random_project = function (num) {
	return {
		"id": num + 1,
	  "name": faker.commerce.productName(),
	  "location": faker.fake("{{address.city}}, {{address.stateAbbr}}"),
	  "location_lat": faker.address.latitude(),
	  "location_lon": faker.address.longitude(),
	  "cost": parseInt(faker.commerce.price(20000, 500000)),
	  "description": faker.lorem.paragraph(),
	  "thumbnail": "images/projects/" + (num%12+1) + ".jpg",
	  "client_id": Math.floor(Math.random() * data.clients.length) + 1,
	  "status": ["completed", "in_progress", "under_development"][Math.floor(Math.random() * 3)],
	  "finish": couple_of_ids(finish),
	  "software": couple_of_ids(software),
		"technique": couple_of_ids(technique),
	  "machine": couple_of_ids(machine),
	  "hardware": couple_of_ids(hardware),
	  "team": couple_of_ids(team)
	}
}

for (var i = 0; i < 9; i++)
	data.clients.push( random_client(i) )

for (var i = 0; i < 200; i++)
	data.projects.push( random_project(i) )

console.log(data)

fs.writeFile("../filtering/data.json", JSON.stringify(data, null, 2), function(err) {
  if(err) return console.log(err)
})