const sender = document.getElementById("sender");
const form = document.getElementById("form");
const amount = document.getElementById("amount");


form.addEventListener("submit", () => {
    fetch('./customer.json').then(results => results.json()).then(data => {
        data.forEach(item => {
            if (item.account_no == sender.value) {
                if (item.account_balance >= amount.value) {
                    alert("Transfer Successful");
                }
                else {
                    alert("Balance insufficient");
                }
            }

        });
    });
});






