

// add an event listener to login form */
const loginForm = document.querySelector('#login-form');

loginForm.addEventListener('click', (event) => {
  event.preventDefault(); // prevent the form from submitting

  const email = document.querySelector('#email-login').value;
  const password = document.querySelector('#password-login').value;

  // send email and password to the server to authenticate the user
  fetch('/api/users/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      // user authenticated, redirected 
      window.location.href = '/profile';
    } else {
      // if authentication failed, update the login error state and re-render the template
      const state = { loginError: true };
      document.querySelector('#login-card').innerHTML = loginTemplate(state);
    }
  })
  .catch(error => {
    // handle errors that may occur 
    
  });
});

const regForm = document.querySelector('#reg-form');

regForm.addEventListener('click', (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (name && email && password) {
    fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    })
    
    .then((response) => {
      if (response.ok) {
        window.location.replace('/profile');
      } else {
        alert('There has been a problem creating your account');
      }
    })
   
  }
});
