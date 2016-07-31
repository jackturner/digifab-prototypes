var faker = require('faker'),
		fs = require('fs')

var random_project = function (num) {
	return {
	  "name": faker.commerce.productName(),
	  "location_name": faker.fake("{{address.city}}, {{address.stateAbbr}}"),
	  "location": faker.fake("{{address.latitude}},{{address.longitude}}"),
	  "cost_dollars": parseInt(faker.commerce.price(8000, 500000)),
	  "description": faker.lorem.paragraph(),
	  "thumbnail": "images/projects/" + (num+1) + ".jpg"
	}
}

var projects = []

for (var i = 0; i < 12; i++)
	projects.push( random_project(i) )

console.log(projects)

fs.writeFile("../filtering/projects.json", JSON.stringify(projects, null, 2), function(err) {
  if(err)
    return console.log(err)

  console.log("The file was saved!")
})