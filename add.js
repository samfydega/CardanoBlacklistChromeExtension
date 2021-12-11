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

document.getElementById("btnsubmit").addEventListener("click", addRequest);

// async function getCities(db) {
//    const citiesCol = collection(db, 'requests');
//    const citySnapshot = await getDocs(citiesCol);
//    const cityList = citySnapshot.docs.map(doc => doc.data());
//    console.log(cityList);
//  }

async function addRequest() {

    let addressEl = document.getElementById('walletAddressInput').value;
    let descriptionEl = document.getElementById('walletDescriptionInput').value;
    let linkEl = document.getElementById('walletLinkInput').value;
    let contactEl = document.getElementById('walletContactInput').value;
    let responseMessageEl = document.getElementById('responseMessage');
    let successMessageEl = document.getElementById('successMessage');
    responseMessageEl.textContent = "";
    successMessageEl.textContent = "";


    setTimeout(function(){

      if (addressEl.length !== 42) {
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
