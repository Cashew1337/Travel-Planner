const logoutButton = document.querySelector('#logout-Btn');

logoutButton.addEventListener('click', (event) => {
  event.preventDefault();
  
  fetch('/api/users/logout', {
    method: 'POST'
  })
  .then(response => {
    if (response.ok) {
      window.location.href = '/';
    } else {
      alert ("Error: Failed to Logout")
      // handle errors that may occur during the request
    }
  })
  .catch(error => {
    // handle errors that may occur during the request
  });
});
