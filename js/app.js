document.getElementById('button').addEventListener('click', function () {
    const getInputText = document.getElementById('input-text');
    const getInputTextValue = getInputText.value.toLowerCase();
    getInputText.value = "";

    const url = `https://openapi.programming-hero.com/api/phones?search=${getInputTextValue}`

    fetch(url)
        .then(res => res.json())
        .then(data => displayPhone(data.data));
});

const displayPhone = phones => {
    const displayPhoneHolder = document.getElementById('phone-display');
    displayPhoneHolder.textContent = "";
    if(phones.length == 0){
        document.getElementById('notfound').style.display = "block";
    }
    phones.forEach(phone => {
        const div = document.createElement('div');
        console.log(phone);
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100 shadow-sm rounded p-5 border-0">
            <img class="img-fluid" src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p>Brand: ${phone.brand}</p>
            <a href="#" class="btn btn-primary mt-1">Details</a>
            </div>
        </div>

        `
        displayPhoneHolder.appendChild(div);
    });
}
