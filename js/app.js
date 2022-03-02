//search button area
document.getElementById('button').addEventListener('click', function () {
    const getInputText = document.getElementById('input-text');
    const getInputTextValue = getInputText.value.toLowerCase();
    getInputText.value = "";
    if (!isNaN(getInputTextValue)) {
        document.getElementById('not-given-input').style.display = "block";
        document.getElementById('notfound').style.display = "none";
        const detailsHolder = document.getElementById('details-holder');
        detailsHolder.innerHTML = "";
        const displayPhoneHolder = document.getElementById('phone-display');
        displayPhoneHolder.textContent = "";
        return;
    }


    const url = `https://openapi.programming-hero.com/api/phones?search=${getInputTextValue}`

    fetch(url)
        .then(res => res.json())
        .then(data => displayPhone(data.data.slice(0, 20)));

    spiner('block');
    document.getElementById('notfound').style.display = "none";
    document.getElementById('not-given-input').style.display = "none";
});

const spiner = (input) => {
    document.getElementById('loading-signal').style.display = input;
}

const displayPhone = phones => {
    spiner('none');
    const displayPhoneHolder = document.getElementById('phone-display');
    displayPhoneHolder.textContent = "";
    if (phones.length == 0) {
        document.getElementById('notfound').style.display = "block";
        document.getElementById('not-given-input').style.display = "none";
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
    const detailsHolder = document.getElementById('details-holder');
    detailsHolder.innerHTML = "";
}

//phone details fetch area
const phoneDetails = (name) => {
    const url = `https://openapi.programming-hero.com/api/phone/${name}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data));
}



//display phone details area
const displayPhoneDetails = phone => {
    const detailsHolder = document.getElementById('details-holder');
    detailsHolder.innerHTML = "";
    const div = document.createElement('div');
    div.classList.add = "card";
    div.innerHTML = `
            <img src="${phone.image}" class="card-img-top p-3" alt="...">
            <div id="card-body-id" class="card-body p-3">
              <h5 class="card-title">${phone.name}</h5>
              
              <p class="card-text"><span class="fw-bold">Release Date: </span>${phone.releaseDate ? phone.releaseDate : 'No release date found'}</p>
              <p class="card-text"><span class="fw-bold">Chipset: </span>${phone.mainFeatures.chipSet}</p>
              <p class="card-text"><span class="fw-bold">Display Size: </span>${phone.mainFeatures.displaySize}</p>
              <p class="card-text"><span class="fw-bold">Memory: </span>${phone.mainFeatures.memory}</p>
              <p class="card-text"><span class="fw-bold">Storage: </span>${phone.mainFeatures.storage}</p>
              
              
              <p class="card-text"><span class="fw-bold">Sensor:</span>${phone.mainFeatures.sensors.slice(0, 4)}</p>

              
              <p class="card-text"><span class="fw-bold">Bluetooth: </span>${phone.others?.Bluetooth ? phone.others.Bluetooth : 'No Blutooth information found'}</p>
              <p class="card-text"><span class="fw-bold">GPS: </span>${phone.others?.GPS ? phone.others.GPS : 'No GPS information found'}</p>
              <p class="card-text"><span class="fw-bold">NFC: </span>${phone.others?.NFC ? phone.others.NFC : 'No NFC information found'}</p>
              <p class="card-text"><span class="fw-bold">Radio: </span>${phone.others?.Radio ? phone.others.Radio : 'No Radio information found'}</p>
              <p class="card-text"><span class="fw-bold">USB: </span>${phone.others?.USB ? phone.others.USB : 'No USB information found'}</p>
              <p class="card-text"><span class="fw-bold">WLAN: </span>${phone.others?.WLAN ? phone.others.WLAN : 'No WLAN information found'}</p>
            </div>
    
    `
    detailsHolder.appendChild(div);
}
