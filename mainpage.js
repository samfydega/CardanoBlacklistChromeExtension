document.addEventListener("DOMContentLoaded", BLLength);


function BLLength() {

    fetch("./wallets.json")
        .then(response => {
            return response.json();
        }).then(data => {
            number = data.wallets.length;
            console.log(number);
            let walletEl = document.getElementById("walletsBlacklistedOnChain");
            walletEl.textContent = number;
        })
}