const logoutButton = document.querySelector('#logout-button');

logoutButton.addEventListener('click', () => {
  fetch('/logout', {
    method: 'POST'
  })
  .then(response => {
    if (response.ok) {
      window.location.href = '/login';
    } else {
      // handle errors that may occur during the request
    }
  })
  .catch(error => {
    // handle errors that may occur during the request
  });
});
