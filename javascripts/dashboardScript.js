import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-auth.js";

let bookings = [];
const back = document.getElementById('back');
const error_message = document.getElementById("error-message");
const forward = document.getElementById('forward');
let index = 1;
let len;
const page_loader = document.getElementsByClassName("page-loader")[0];
let search = document.getElementById('index');

const booking_info = document.getElementById('booking-info');
const extra_info = document.getElementById('extra-info');
const personal_info = document.getElementById('personal-info');
const required_style_img = document.getElementById('required-style-image');



const firebaseConfig = {
  apiKey: "AIzaSyAxdNdMGR9NRqTWvYDY7W0qGljygfYV-Ns",
  authDomain: "af-booking.firebaseapp.com",
  databaseURL: "https://af-booking-default-rtdb.firebaseio.com",
  projectId: "af-booking",
  storageBucket: "af-booking.firebasestorage.app",
  messagingSenderId: "626967665083",
  appId: "1:626967665083:web:fde45e23f44b1fbc5ecc9e",
  measurementId: "G-C8G2VFBX03"
};

// Initialize app
const app = initializeApp(firebaseConfig);

// Initialize auth
const auth = getAuth(app);

//Check if user is already logged in
auth.onAuthStateChanged(async (user) => {
  error_message.textContent = "";
  if (!user) {
    error_message.textContent = "Unauthorized Access";
    window.location.replace("https://miniature-space-garbanzo-jpj699p7ggxf5v4p-5501.app.github.dev");
    return; 
  } 
  // Get booking information if token is correct
  try {
    const token = await user.getIdToken();
    const response = await fetch('https://kspkoznzo5.execute-api.us-west-2.amazonaws.com/dev/bookings', {
      method: 'GET',
    headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
    }
    });
    const data = await response.json();
    for (const key in data) {
      bookings.push(data[key]);
    }
    len = bookings.length
    console.log(bookings[index-1])
    parseBookingData(bookings[index-1]);
    
  } catch (error) {
    error_message.textContent = "Unauthorized Access";
    indow.location.replace("https://miniature-space-garbanzo-jpj699p7ggxf5v4p-5501.app.github.dev");
  }
}
);

// Search booking by id
search.addEventListener('keypress', function(event){
  let search_index = search.value;
  if (event.key == 'Enter' && search_index>=1 && search_index<=len){
    parseBookingData(bookings[search_index-1]);
  }
})
// Go back to previous booking
back.addEventListener('click', function(){
  if (index>1){
    index-=1;
    parseBookingData(bookings[index-1]);
  }
})

// Go forward to new booking
forward.addEventListener('click', function(){
  if (index<len){
    index+=1;
    parseBookingData(bookings[index-1]);
  }
});

// Generate the html code for booking
function parseBookingData(data) {
  search.value = index;
  let add_ons_lst = "";
  let add_on;
  if (data.add_ons == "none"){ 
    add_on = `<p><b>Add ons: </b>${data.add_ons}</p>`;
  }
  else{
    for (const val in data.add_ons){
      add_ons_lst += `<li>${data.add_ons[val]}</li>`;
    }
    add_on = `
      <div>
        <p><b>Add ons:</b></p>
        <ol>${add_ons_lst}</ol>
      </div>
    `;
  }
  let personal = `<h2>Personal information</h2>`;
  let fname = `<p><b>First name: </b>${data.fname}</p>`;
  let email = `<p><b>Email: </b>${data.email}</p>`;
  let tel = `<p><b>Phone number: </b>${data.tel}</p>`;

  let booking = `<h2>Booking information</h2>`;
  let style = `<p><b>Required style: </b>${data.style}</p>`;
  let slen = `<p><b>Required style length: </b>${data.style_len}</p>`;
  let nlen = `<p><b>Customers hair length: </b>${data.natural_len}</p>`;
  let date = `<p><b>Prefered date: </b>${data.date}</p>`;

  let extra = `<h2>Extra information</h2>`;
  let allergy = `<p><b>Allergy: </b>${data.allergy}</p>`;
  let note = `<p><b>Note: </b>${data.note}</p>`;
  personal_info.innerHTML = (`${personal}${fname}${email}${tel}`);
  booking_info.innerHTML = (`${booking}${style}${slen}${nlen}${date}`);
  extra_info.innerHTML = (`${extra}${add_on}${allergy}${note}`);
  required_style_img.src = `https://res.cloudinary.com/deeuemovu/image/upload/c_fill,ar_1:1,w_1080,g_auto/f_auto,q_auto/${data.img_pub_id}.jpg`;
  page_loader.classList.add('didLoad');
}