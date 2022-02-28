document.getElementById('button').addEventListener('click', function () {
    const getInputText = document.getElementById('input-text');
    const getInputTextValue = getInputText.value.toLowerCase();

    const url = `https://openapi.programming-hero.com/api/phones?search=${getInputTextValue}`
    console.log(url);

    fetch(url)
    .then(res => res.json())
    .then(data =>console.log(data));
})
