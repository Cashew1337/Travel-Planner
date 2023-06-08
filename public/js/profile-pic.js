// Function to handle form submission for profile pic 
function handlePicSubmit(event) {
    event.preventDefault();
  
    const form = document.getElementById('uploadForm');
    const formData = new FormData(form);
  
    fetch('/upload', {
      method: 'POST',
      body: formData
    })
      .then(response => response.text())
      .then(data => {
        // Handle the response from the server
        console.log(data);
      })
      .catch(error => {
        // Handle any error that occurred during the request
        console.error(error);
      });
  }

const uploadForm = document.getElementById('uploadForm');
uploadForm.addEventListener('submit', handlePicSubmit);


// Function to handle form submission with user input
function handleFormSubmit(event) {
  event.preventDefault();

  const form = document.getElementById('input-area');
  const formData = new FormData(form);

  fetch('/save-profile', {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      window.location.href = '/views/profile-page';
    })
    .catch(error => {
      console.error(error);
    });
}

// Attach event listener to the form submission
function waitDOM() {
const profileForm = document.getElementById('input-area');
profileForm.addEventListener('click', handleFormSubmit);
}
 
document.addEventListener('DOMContentLoaded', waitDOM);
  