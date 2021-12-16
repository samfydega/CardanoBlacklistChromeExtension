// Landing Page JS for Cardano Blacklist Chrome/Brave Extension

// Firebase Import Statement + Configuration
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getFirestore, getDoc, doc, getDocs, collection } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

// Revealable
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

// Listener for updating below numbers
document.addEventListener("DOMContentLoaded", BLLength);
document.addEventListener("DOMContentLoaded", transactionsChecked);
document.addEventListener("DOMContentLoaded", transactionsPrevented);


// Returning historical number of wallet requests via Firebase
async function transactionsChecked() {

    getDoc(doc(db, "walletchecks", "XJC3BE4qnNlBDCxtJKLs")).then(docSnap => {
        if (docSnap.exists()) {
            const numberofchecks = docSnap.data().numberofchecks;
            let walletCheckEl = document.getElementById("walletsCheckedOverall");
            walletCheckEl.textContent = numberofchecks;
        } else {
          const num = "N/A"
        }
      })
}

// Returning historical number of wallet warnings via Firebase
async function transactionsPrevented() {
    getDoc(doc(db, "walletsprevented", "pmvb0OMSSXqpF2e0rFXQ")).then(docSnap => {
        if (docSnap.exists()) {
            const numberofsaves = docSnap.data().walletsprevented;
            let blacklistChecksEl = document.getElementById("walletsReturnedAsBlacklisted");
            blacklistChecksEl.textContent = numberofsaves;
        } else {
          const num = "N/A"
        }
      })
}

// Dynamically returning size of blacklist length (local JSON)
async function BLLength() {

    getDocs(collection(db, "blacklistedwallets"))
        .then(querySnapshot => {
      
            let count = querySnapshot.query._path.segments.length;
            let walletEl = document.getElementById("walletsBlacklistedOnChain");
            walletEl.textContent = count;
   
    });
}
