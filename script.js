/*
Step 1: Get references to DOM elements
*/
// Get a reference to the main container
const container = document.querySelector(".container");

// Reference of all available seats
const seats = document.querySelectorAll(".row .seat:not(.sold)");

// Reference of the count and total elements
const count = document.getElementById("count");
const total = document.getElementById("total");

// Reference of the movie dropdown
const movieSelect = document.getElementById("movie");

/*
Step 2: Add event listeners
*/

// Event listner for movie selection change
movieSelect.addEventListener("change", e => {
  //Update ticket price and store selected movie data
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);

  // Update displayed count and total
  updateSelectedCount();
});

// Event listner for seat clicks
container.addEventListener("click", e => {
  // check if a seat is clicked and not sold
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("sold")
  ) {
    //Toggle seat selection
    e.target.classList.toggle("selected");
    console.log(e.target.innerText);
    const selectedSeatlen = Array.from(document.querySelectorAll(".row .seat.selected")).length;
    let seatno = document.querySelector('.seatno');
    if(selectedSeatlen === 1){
      seatno.innerHTML = e.target.innerText
    }
    else{
     seatno.innerHTML = e.target.innerText + " & " + document.querySelector('.seatno').innerHTML ;
    }
    localStorage.setItem('seatedno',seatno.innerHTML);
    // Update displayed count and total
    updateSelectedCount();
  }
});

// time is providing---
 let times = document.querySelectorAll('.times .time');
 Array.from(times).forEach(time=>{
  time.addEventListener('click',(e)=>{
   console.log(e.target.innerHTML);
   document.querySelector('.show-time').innerHTML = e.target.innerHTML;
  })
 })

 let dateitems = document.querySelectorAll('.dates-item');
 Array.from(dateitems).forEach(dateitem =>{
         dateitem.addEventListener('click',(element)=>{
            console.log(dateitem.querySelector('.day').innerHTML);
            document.querySelector('.card-day').innerHTML = dateitem.querySelector('.day').innerHTML;
            document.querySelector('.card-date').innerHTML = dateitem.querySelector('.date').innerHTML;

         })
 })
/*
Step 3: Define funtion to update selected count and total
*/

function updateSelectedCount() {
  // Get all selected seats
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  // Get an array of selected seats's indexes
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  // Store selected seats index into local storage
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  // Calculate selected seats and count
  const selectedSeatsCounts = selectedSeats.length;

  // Update UI with selected seats count and total price
  count.innerText = selectedSeatsCounts;
  total.innerText = selectedSeatsCounts * ticketPrice;
  document.querySelector('.noseat').innerHTML = count.innerHTML;
  document.querySelector('.ticket-price').innerHTML = total.innerText;

  setMovieData(movieSelect.selectedIndex, movieSelect.value);
}

/*
Step 4: Define funtion to set selected movie data, in local storage
*/
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

/*
Step 5: Define funtion to populate UI with local storage data
*/
// Function to populate UI from local storage data

function populateUI() {
  // Get selected seats from local storage
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  // If there are selected seats, mark them as selected in the UI
  if (selectedSeats != null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  // Get selected movie data from local storage
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  // If there's a selected movie index, then set it in the dropdown
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

/*
Step 6: Initial setup of count, total and UI based on save data
*/
populateUI();

// Initialize ticket price
let ticketPrice = +movieSelect.value;

updateSelectedCount();

// script of main page----

let bookbtn = document.querySelector('.bookbtn');
let cardcontainer = document.querySelector('.card-container');
let bookedticket= document.querySelector('.booked-ticket');
let maincardcontainer = document.querySelector('.card-container');
let counter = 0;

bookbtn.addEventListener('click',(e)=>{
  e.preventDefault();
  location.assign('credential.html');
  // document.querySelector('.form-container').classList.toggle('showbtn');
    maincounter();

})

 function maincounter(){
     return counter + 1;
 }

bookedticket.addEventListener('click',(e)=>{
   counter = maincounter();
  if(counter > 1){
  cardcontainer.classList.toggle('deactive');
  }
})


// script o credential infgormation----

// document.querySelector('.submitbtn').addEventListener('click', function(event) {
//   event.preventDefault(); // Prevent the form from submitting the traditional way
  
//   // Here you can handle form submission, validation, and payment processing
  
//   alert('Payment Submitted Successfully!');
//   location.assign('index.html')
// });

// document.querySelector('.pressed').addEventListener('click',()=>{
//   alert('hey button is pressed now you are happy!')
// })


// document.getElementById('paymentForm').addEventListener('submit', function(event) {
//   event.preventDefault(); // Prevent the form from submitting the traditional way
  
//   // Here you can handle form submission, validation, and payment processing
  
//   alert('Payment Submitted Successfully!');
//   // location.assign('index.html')
// });
// document.querySelector('.submitbtn').addEventListener('click',()=>{
// document.querySelector('.form-container').classList.add('form-container');
// cardcontainer.classList.toggle('active');
// })