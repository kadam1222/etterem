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
            <img src="">
            <h3 class="nev">${elem.name}</h3>
            <p class="leiras">${elem.description}</p>
            <p class="ar">${elem.price}</p>
            <button onclick="peldany.hozzaad('${elem.name}')">Vásárlás</button>
        </div>`).join("");

        hely.innerHTML+=formazotttermek
}

class tarolo{
    constructor(){
        this.items=[]
    }
    
    hozzaad(adat){
        fetch('menu.json')
        .then(response => response.json())
        .then(data => {
            const termek = data.find(item => item.name ===adat);
            if(termek){
                console.log("asd")
                const benne = this.items.some(item => item.name === adat)
                if(!benne){
                    this.items.push(termek)
                    console.log(this.items)
                }
            }
        })
    }
}

const peldany = new tarolo()
