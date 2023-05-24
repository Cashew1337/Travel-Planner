// Function to handle form submission
function handleFormSubmit(event) {
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
  
  // Attach event listener to the form submission
  const uploadForm = document.getElementById('uploadForm');
  uploadForm.addEventListener('submit', handleFormSubmit);
  