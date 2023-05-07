  // Retrieve user data 
  fetch('/api/user')
    .then(response => response.json())
    .then(user => {
      // Update profile info
      document.getElementById('name').textContent = user.name;
      document.getElementById('email').textContent = user.email;
      document.getElementById('phone').textContent = user.phone;
      document.getElementById('address').textContent = user.address;

      // Update previous travels 
      const travelsList = document.getElementById('previous-travels');
      user.travels.forEach(travel => {
        const travelItem = document.createElement('li');
        travelItem.textContent = travel.destination;
        travelsList.appendChild(travelItem);
      });
    });

  // Handle logout button click
  document.getElementById('logout-button').addEventListener('click', () => {
    fetch('/api/logout', { method: 'POST' })
      .then(() => window.location.href = '/login')
      .catch(error => console.error(error));
  });

