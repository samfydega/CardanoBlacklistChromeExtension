// Check Wallet Page JS for Cardano Blacklist Chrome/Brave Extension

// Element IDs
document.getElementById("btncheck").addEventListener("click", checkIfWalletIsBL);

let warningEl = document.getElementById("warningElement");
let resultPositiveEl = document.getElementById("walletResponsePositive");
let resultNegativeEl = document.getElementById("walletResponseNegative");
let resultDateEl = document.getElementById("walletResponseDate");
let resultReasonEl = document.getElementById("walletResponseReason");
let resultLinkEl = document.getElementById("walletResponseLink");

// Firebase Import Statement + Configuration
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { collection, getFirestore, getDoc, doc, setDoc, getDocs} from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

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
var checks = 0;
var preventions = 0;

// Iterating through collection=
async function goThroughCollection(check) {

    var primeObject = {
        'address' : '',
        'date' : '',
        'reason' : '',
        'link' : ''
    }

    await getDocs(collection(db, "blacklistedwallets"))
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                if (check == doc.data().address){
                    primeObject.address = doc.data().address;
                    primeObject.date = doc.data().date;
                    primeObject.reason = doc.data().reason;
                    primeObject.link = doc.data().link;
                }
            }
        );
    });
    
    if (primeObject.address == '') {
        finalizeCheck('false', primeObject);
    } else{
        finalizeCheck("true", primeObject);
    }
}

// Checking JSON File for Blacklisted Addresses
async function checkIfWalletIsBL() {

    // Parsing Input
    var check = document.getElementById("inputText").value;

    if (check.length !== 103) {
        if (check !== "0x0") {
            warningEl.textContent = "Please enter a valid address.";
            finalizeCheck("invalid", null);
            return;
        }
    }

    // Querying Firebase
    goThroughCollection(check);

}

// Parsing Result from checkIfWalletIsBL()
async function finalizeCheck(result, object) {
    console.log(object);

    // Blacklisted wallet. Provide specific information on submission.
    if (result == "true") {

        warningEl.textContent = "";
        resultPositiveEl.textContent = "";
        resultNegativeEl.textContent = "This is a blacklisted wallet. \r Please proceed with caution.";
        resultDateEl.textContent = "Date: " + object.date.slice(0, 2) + "/" + object.date.slice(2, 4) + "/" + object.date.slice(4);
        resultReasonEl.textContent = "Reason: " + object.reason;
        resultLinkEl.textContent = object.link;

        // Updating Prevent Count
        await getDoc(doc(db, "walletsprevented", "pmvb0OMSSXqpF2e0rFXQ")).then(docSnap => {
            if (docSnap.exists()) {
                preventions = docSnap.data().walletsprevented;
                preventions += 1;
            } 
        });

        const docRef = doc(db, 'walletsprevented', 'pmvb0OMSSXqpF2e0rFXQ');
        await setDoc(docRef, {walletsprevented : preventions});


        // Updating Check Count
        await getDoc(doc(db, "walletchecks", "XJC3BE4qnNlBDCxtJKLs")).then(docSnap => {
            if (docSnap.exists()) {
                checks = docSnap.data().numberofchecks;
                checks += 1;
            } else {
              checks += 1;
            }
            });
    
            const docRef2 = doc(db, 'walletchecks', 'XJC3BE4qnNlBDCxtJKLs');
            await setDoc(docRef2, {numberofchecks : checks});


    // Not a blacklisted wallet. 
    } else if (result == "false") {

        resultDateEl.textContent = "";
        resultReasonEl.textContent = "";
        warningEl.textContent = "";
        resultNegativeEl.textContent = "";
        resultLinkEl.textContent = "";
        resultPositiveEl.textContent = "This is not a blacklisted wallet. \r However, proceed with caution.";

        // Updating Check Count
        await getDoc(doc(db, "walletchecks", "XJC3BE4qnNlBDCxtJKLs")).then(docSnap => {
        if (docSnap.exists()) {
            checks = docSnap.data().numberofchecks;
            checks += 1;
        } else {
          checks += 1;
        }
        });

        const docRef = doc(db, 'walletchecks', 'XJC3BE4qnNlBDCxtJKLs');
        await setDoc(docRef, {numberofchecks : checks});

    // Not a valid address.     
    } else {
        resultDateEl.textContent = "";
        resultReasonEl.textContent = "";
        resultNegativeEl.textContent = "";
        resultPositiveEl.textContent = "";
        resultLinkEl.textContent = "";
        warningEl.textContent = "Please enter a valid address.";
    }
}


