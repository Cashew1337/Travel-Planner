const data = require('../../seeds/tripData.json')
const source = document.getElementById("trips-template").innerHTML;
const template = Handlebars.compile(source);
const html = template(data);

document.getElementById("trips-container").innerHTML = html;


document.addEventListener("DOMContentLoaded", function(event) {

    // Compile Handlebars template
    var templateSource = document.querySelector('#template').innerHTML;
    var template = Handlebars.compile(templateSource);

    // Render template with data and insert into DOM
    var rendered = template(data);
    document.querySelector('#container').innerHTML = rendered;

});

