let profilePic = document.getElementById("profile-pic");
let inputFile = document.getElementById("input-file");

inputFile.onchange = function () {
profilePic.src = URL.createObjectURL(inputFile.files[0]);
}

// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault();

//     const form = document.getElementById('uploadForm');
//     const formData = new FormData(form);
  
//     fetch('/upload', {
//       method: 'POST',
//       body: formData
//     })
//       .then(response => response.text())
//       .then(data => {
//         // Handle the response from the server
//         console.log(data);
//       })
//       .catch(error => {
//         // Handle any error that occurred during the request
//         console.error(error);
//       });
//   }

// const uploadForm = document.getElementById('uploadForm');
// uploadForm.addEventListener('submit', handlePicSubmit);


// Function to handle form submission with user input
function handleFormSubmit(event) {
  event.preventDefault();
  let firstName=document.querySelector('#first_name').value;
  let lastName=document.querySelector('#last_name').value;
  let email=document.querySelector('#email').value;
  let phone=document.querySelector('#phone').value;
  let address=document.querySelector('#address').value;
  fetch('/api/profile/save-profile', {
    method: 'POST',
    body: JSON.stringify({firstName,lastName,email,phone,address}),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      if(data.status==200){
       window.location.href = '/profile';
      }
     
    })
    .catch(error => {
      console.error(error);
    });
    return false;
}

let form=document.querySelector('#input-area')
console.log(form)
form.addEventListener('submit',handleFormSubmit)

// Attach event listener to the form submission
// function waitDOM() {
// const profileForm = document.getElementById('input-area');
// profileForm.addEventListener('click', handleFormSubmit);
// }
 
// document.addEventListener('DOMContentLoaded', waitDOM);
  