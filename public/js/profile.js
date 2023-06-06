// Function to handle form submission
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
      window.location.href = '/views/profile';
    })
    .catch(error => {
      console.error(error);
    });
}

// Attach event listener to the form submission
const profileForm = document.getElementById('input-area');
profileForm.addEventListener('submit', handleFormSubmit);
