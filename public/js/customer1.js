const details = document.getElementById("details");

fetch('./customer.json').then(results => results.json()).then(data => {
    data.forEach(item => {
        const val = `<tr><td>${item.id}</td><td>${item.holder_name}</td><td>${item.account_no}</td><td>${item.account_balance}</td><td>${item.email}</td></tr>`;
        details.innerHTML += val;
    });
});



