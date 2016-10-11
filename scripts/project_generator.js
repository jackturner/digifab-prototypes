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

var materials = [
	{"material_category": "Lumber", "materials": ["African Mahogany","Ash","Atlantic Cedar","Black Palm","Black Walnut","Bloodwood","Bois de Rose","Butternut","Cebil","Cherry","Cypress","Douglas Fir","Elm","Gabon Ebony","Genuine Mahagany","Hackberry","Hard Maple","Hickory","Honey Locust","Ipê","Kentucky Coffee","Khaya Mahogany","Lacewood","Mara","Mesquite","Mulberry","Orangeheart","Osage Orange","Padauk","Pecan","Pink Ivory","Purpleheart","Red Birch","Red Oak","Red Palm","Redheart","Roasted Maple","Sapele","Sassafras","Soft Maple","Spanish Cedar","Sunsetwood","Sycamore","Teak","Western Red Cedar","White Birch","White Oak","White Pine","Yellow Birch","Yellow Pine","Yellowheart","Zebrawood"]}
	,{"material_category": "Plywood", "materials": ["AC Fir","AC Marine","Aluminum Plywood","Bamboo","CDX","Chinese Birch","D3 Birch","D3 Maple","Douglas Fir ","Finply","FX Platform","Hemp Board","Knotty Pine","Lauan","Mahogany","Maple","MDF","MDO","Melamine","OSB","Primeboard","Rift White Oak","Russian Birch","Sunflower Seed Board","Vinyl Plywood  ","Walnut","Wheat Board","White Oak"]}
	,{"material_category": "Plastic", "materials": ["ABS","Acetal","Acetate ","Acrylic","Cast Nylon","CPVC","Extruded Nylon","HDPE","Kapton","LDPE","Mylar","PET","PLA","Polycarbonate","Polyester","Polypropylene","Polystyrene","PPO","PVC","Teflon","UHMW"]}
	,{"material_category": "Paper", "materials": ["Cardboard","Cardstock","Chipboard","Construction ","Copy","Matboard","Synthetic"]}
	,{"material_category": "Fabric", "materials": ["Bamboo","Cotton","Hemp","Leather","Linen","Nylon","Polyester","Silk","Spandex","Wool"]}
	,{"material_category": "Metal", "materials": ["Aluminum","Aluminum Foam","Anodized Aluminum","Brass","Bronze","Cold Rolled Steel","Copper","Copper Foam","Galvanized Steel","Hot Rolled Steel","Nickel","Stainless Steel ","Tin","Titanium"]}
	,{"material_category": "Foam &amp; Rubber", "materials": ["Expanded Polypropylene ","Expanded Polystyrene","Expanded PVC","Extruded Polystyrene ","Foam Core","Gum Rubber","Neoprene","PET","Polyethylene Foam","Polyurethane","Polyurethane Foam","Silicone","Urethane"]}
	,{"material_category": "Miscellaneous", "materials": ["Bark","Barn Board","Ceramic Tile","Concrete","Cork","Float Glass","Glass Block","Granite","High Pressure Laminate","Linoleum","Machinable Wax","Marble","Mineral Fiber Board","Mirror","Mushroom Wood","PaperStone","Richlite","Slate","Solid Surface","Stained Glass","Tempered Glass"]}
]

var data = {
	"clients": [],
	"projects": [],
	"finish": finish,
	"software": software,
	"technique": technique,
	"machine": machine,
	"hardware": hardware,
	"team": team,
	"materials": materials
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

var random_materials = function() {

	var material_arr = []

	if ( Math.random() > (2/3) ) {

		var chosen_material = materials[Math.floor(Math.random() * materials.length)]

		material_arr.push( chosen_material.material_category )

		if ( Math.random() > 0.5 ) {

			material_arr.push( chosen_material.materials[Math.floor(Math.random() * chosen_material.materials.length)] )

		}


	}

	return material_arr

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
	  "team": couple_of_ids(team),
	  "materials": random_materials()
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