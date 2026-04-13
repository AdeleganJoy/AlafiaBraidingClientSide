import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-auth.js";

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
  if (!user) {
    error_message.textContent = "Unauthorized Access";
    window.location.replace("https://miniature-space-garbanzo-jpj699p7ggxf5v4p-5500.app.github.dev/index.html");
    
  } 
  user.getIdToken().then((token) => {
    fetch('https://kspkoznzo5.execute-api.us-west-2.amazonaws.com/dev/ViewBooking', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
      body: JSON.stringify({})
    }
    ).then(data => console.log(data));
    console.log("User ID Token:", token);
    
  });
});


