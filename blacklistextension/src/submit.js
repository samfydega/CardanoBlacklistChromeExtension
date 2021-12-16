// Submit Wallet Page JS for Cardano Blacklist Chrome/Brave Extension

// Firebase Import Statement + Configuration
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getFirestore, collection, getDocs, addDoc } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

const firebaseConfig = {
    apiKey: "AIzaSyDYYGCdocrCHytimcTpM_lV7L-e37x5Z2c",
    authDomain: "ethereum-blacklist-extension.firebaseapp.com",
    projectId: "ethereum-blacklist-extension",
    storageBucket: "ethereum-blacklist-extension.appspot.com",
    messagingSenderId: "813424096091",
    appId: "1:813424096091:web:5551a8e4ca5b9824e8a07e",
    measurementId: "${config.measurementId}"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Submit Request Button
document.getElementById("btnsubmit").addEventListener("click", addRequest);

// Submit Request Function
async function addRequest() {

    // Element IDs
    let addressEl = document.getElementById('walletAddressInput').value;
    let descriptionEl = document.getElementById('walletDescriptionInput').value;
    let linkEl = document.getElementById('walletLinkInput').value;
    let contactEl = document.getElementById('walletContactInput').value;
    let responseMessageEl = document.getElementById('responseMessage');
    let successMessageEl = document.getElementById('successMessage');
    responseMessageEl.textContent = "";
    successMessageEl.textContent = "";

    // Parsing Inputs (delayed to allow elements to load)
    setTimeout(function(){

      if (addressEl.length !== 103) {
        responseMessageEl.textContent = "Please submit a valid address.";
        return;
      }

      if (descriptionEl === "") {
        responseMessageEl.textContent = "Please fill in the required fields.";
        return;
      }

      try {
        const docRef = addDoc(collection(db, 'walletrequests'), {
          address: addressEl,
          description: descriptionEl,
          link: linkEl,
          contact: contactEl
        });

        console.log("Document written with ID: ", docRef.id);
        successMessageEl.textContent = "Thank you for your contribution!";

      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }, 500);

}
