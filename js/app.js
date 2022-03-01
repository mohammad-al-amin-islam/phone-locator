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
    if (phones.length == 0) {
        document.getElementById('notfound').style.display = "block";
    }
    phones.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100 shadow-sm rounded p-5 border-0">
            <img class="img-fluid" src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p>Brand: ${phone.brand}</p>
            <a href="#details-holder" onclick="phoneDetails('${phone.slug}')" class="btn btn-primary mt-1">Details</a>
            </div>
        </div>

        `
        displayPhoneHolder.appendChild(div);
    });
}

//phone details ata fetch area
const phoneDetails = (name) => {
    const url = `https://openapi.programming-hero.com/api/phone/${name}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data));
}

const displayPhoneDetails = phone => {
    console.log(phone);
    const detailsHolder = document.getElementById('details-holder');
    detailsHolder.textContent = "";
    const div = document.createElement('div');
    div.innerHTML = `
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${phone.name}</h5>
              
              <p class="card-text"><span class="fw-bold">Release Date: </span>${phone.releaseDate ? phone.releaseDate : 'No release date found'}</p>
              <p class="card-text"><span class="fw-bold">Chipset: </span>${phone.mainFeatures.chipSet}</p>
              <p class="card-text"><span class="fw-bold">Display Size: </span>${phone.mainFeatures.displaySize}</p>
              <p class=""><span class="fw-bold">Memory: </span>${phone.mainFeatures.memory}</p>
              <p class="card-text"><span class="fw-bold">Storage: </span>${phone.mainFeatures.storage}</p>
            </div>
    
    `
    detailsHolder.appendChild(div);
}
