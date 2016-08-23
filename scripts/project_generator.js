var faker = require('faker'),
		fs = require('fs')

// Always generate your

var random_client = function (num) {
	return {
		"id": num + 1,
	  "name": faker.company.companyName(),
	  "description": faker.lorem.paragraph()
	}
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
	  "client_id": Math.floor(Math.random() * clients.length) + 1
	}
}

var projects = [],
		clients = []

for (var i = 0; i < 9; i++)
	clients.push( random_client(i) )

for (var i = 0; i < 200; i++)
	projects.push( random_project(i) )

console.log(projects)

fs.writeFile("../filtering/projects.json", JSON.stringify(projects, null, 2), function(err) {
  if(err) return console.log(err)
})

fs.writeFile("../filtering/clients.json", JSON.stringify(clients, null, 2), function(err) {
  if(err) return console.log(err)
})