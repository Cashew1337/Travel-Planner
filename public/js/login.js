
const loginTemplate = Handlebars.compile(document.querySelector('#login-template').innerHTML);

// render login template 
const initialState = { loginError: false };
document.querySelector('#login-container').innerHTML = loginTemplate(initialState);

// add an event listener to login form
const loginForm = document.querySelector('#login-form');

loginForm.addEventListener('submit', (event) => {
  event.preventDefault(); // prevent the form from submitting

  const email = document.querySelector('#email-login').value;
  const password = document.querySelector('#password-login').value;

  // send email and password to the server to authenticate the user
  fetch('/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      // user authenticated, redirected 
      window.location.href = '/dashboard';
    } else {
      // if authentication failed, update the login error state and re-render the template
      const state = { loginError: true };
      document.querySelector('#login-container').innerHTML = loginTemplate(state);
    }
  })
  .catch(error => {
    // handle errors that may occur 
  });
});
