import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-auth.js";

const form = document.querySelector('form');
const error_message = document.getElementById("error-message");

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
auth.onAuthStateChanged( (user) => {
  if (user) {
    window.location.replace("https://adeleganjoy.github.io/AlafiaBraidingClientSide/dashboard.html");
  } 
});
form.addEventListener('submit', async (e) => {
	e.preventDefault(); 
	error_message.textContent = "";
	const username = document.querySelector("#username").value;
	const password = document.querySelector("#password").value;

  //Check if username and password valid
  try {
  const credential = await signInWithEmailAndPassword(auth, username, password);
  const user = credential.user;

  window.location.replace("https://adeleganjoy.github.io/AlafiaBraidingClientSide/dashboard.html");
  } 
  catch (error) {
    error_message.textContent = "Please enter a valid email address.";
  }
});
	
