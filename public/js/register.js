
document.addEventListener("DOMContentLoaded", function(event) {

    // Get form element
    var form = document.querySelector('.input-section form');

    // Add submit event listener 
    form.addEventListener('submit', function(event) {

        event.preventDefault();

        // Get form data
        var formData = new FormData(form);

        // Convert form data to JSON 
        var data = {};
        formData.forEach(function(value, key) {
            data[key] = value;
        });

        // Send form data to server
        fetch('/api/create-account', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(function(response) {
            if (response.ok) {
                alert('Your account has been created!');
            } else {
                // Show an error message
                alert('There was an error creating your account.');
            }
        })
        .catch(function(error) {
            alert('There was an error creating your account.');
            console.error(error);
        });

    });

});
