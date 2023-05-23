/* const trips = 
fetch('/api/trips')
  .then(response => response.json())
  .then(trips => {
   
    console.log(trips); 
  })
  .catch(error => {
    console.error('Error fetching trips:', error);
  });



let currentIndex = 0; 

function renderCurrent() {
    const currentTrup = trips[currentIndex]
}

function handlePrevious() {
    if (currentIndex > 0) {
        currentIndex--;
        renderCurrent();
    }
}

function handleNext() {
    if (currentIndex < trips.length -1) {
        currentIndex++;
        renderCurrentTrip 
    }
}



const previousButton = document.getElementById('previous-button');
const nextButton = document.getElementById('next-button');

previousButton.addEventListener('click', handlePrevious);
nextButton.addEventListener('click', handleNext);


renderCurrent(); */