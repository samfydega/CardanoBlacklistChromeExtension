document.getElementById("btncheck").addEventListener("click", checkIfWalletIsBL);

let warningEl = document.getElementById("warningElement");
let resultPositiveEl = document.getElementById("walletResponsePositive");
let resultNegativeEl = document.getElementById("walletResponseNegative");
let resultDateEl = document.getElementById("walletResponseDate");
let resultReasonEl = document.getElementById("walletResponseReason");
let resultLinkEl = document.getElementById("walletResponseLink");

function checkIfWalletIsBL() {

    var check = document.getElementById("inputText").value;

    if (check.length !== 42) {
        if (check !== "0x0") {
            warningEl.textContent = "This is not a valid address.";
            finalizeCheck("invalid", null);
            return;
        }
    }

    fetch("./wallets.json")
    .then(response => {
        return response.json();
    }).then(data => {
        for (x = 0; x < data.wallets.length; x++) {
            if (data.wallets[x].address === check) {
                finalizeCheck("true", data.wallets[x]);
                return;
            }
        }
        finalizeCheck("false", null);
        return;
    })
}

function finalizeCheck(result, object) {
    console.log(result);
    console.log(object);


    if (result == "true") {
        warningEl.textContent = "";
        resultPositiveEl.textContent = "";
        resultNegativeEl.textContent = "This is a blacklisted wallet. \r Proceed with caution.";
        resultDateEl.textContent = "Date: " + object.date.slice(0, 2) + "/" + object.date.slice(2, 4) + "/" + object.date.slice(4);
        resultReasonEl.textContent = "Reason: " + object.reason;
        resultLinkEl.textContent = "Link: " + object.link;


    } else if (result == "false") {
        resultDateEl.textContent = "";
        resultReasonEl.textContent = "";
        warningEl.textContent = "";
        resultNegativeEl.textContent = "";
        resultLinkEl.textContent = "";
        resultPositiveEl.textContent = "This is not a blacklisted wallet. \r However, proceed with caution.";
    }
    else {
        resultDateEl.textContent = "";
        resultReasonEl.textContent = "";
        resultNegativeEl.textContent = "";
        resultPositiveEl.textContent = "";
        resultLinkEl.textContent = "";
        warningEl.textContent = "This is not a valid address.";
    }
}


