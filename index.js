function fetchinfo(){
    fetch('menu.json')
    .then(response => response.json())
    .then(data => betolt(data))
    .catch(error => console.log("Hiba!",error))
}

let hely = document.getElementById("födiv");
function betolt(adat){
    let formazotttermek =adat.map(elem => `
        <div class="termek">
            <img src="${elem.image}"></img>
            <h3 class="nev">${elem.name}</h3>
            <p class="leiras">${elem.description}</p>
            <p class="ar">${elem.price}</p>
            <button>Vásárlás</button>
        </div>`);

}
