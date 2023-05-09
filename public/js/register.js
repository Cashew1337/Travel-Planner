
// document.addEventListener("DOMContentLoaded", function(event) {

//     // Get form element
//     var form = document.querySelector('.input-section form');

//     // Add submit event listener 
//     form.addEventListener('submit', function(event) {

//         event.preventDefault();

//         // Get form data
//         var formData = new FormData(form);

//         // Convert form data to JSON 
//         var data = {};
//         formData.forEach(function(value, key) {
//             data[key] = value;
//         });

//         // Send form data to server
//         fetch('/api/users', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(data)
//         })
//         .then(function(response) {
//             if (response.ok) {
//                 alert('Your account has been created!');
//                 window.location.replace('/profile');
//             } else {
//                 // Show an error message
//                 alert('There was an error creating your account.');
//             }
//         })
//         .catch(function(error) {
//             alert('There was an error creating your account.');
//             console.error(error);
//         });

//     });

// });

const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (name && email && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    }
  };

  
  document
    .querySelector('#signupBtn')
    .addEventListener('click', signupFormHandler);
