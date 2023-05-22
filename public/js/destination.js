/* // Load the data from a JSON file
const data = require('../../seeds/destinationData.json');

// Compile the Handlebars template
const source = document.getElementById('grid-container').innerHTML;
const template = Handlebars.compile(source);

// Render the template with the data and insert it into the DOM
const html = template(data);
document.getElementById('grid-container').innerHTML = html;
 */