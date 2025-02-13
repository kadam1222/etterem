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
            <img src="${elem.image}">
            <h3 class="nev">${elem.name}</h3>
            <p class="leiras">${elem.description}</p>
            <p class="ar">${elem.price} VND</p>
            <button onclick="peldany.hozzaad('${elem.name}')">Vásárlás</button>
        </div>`).join("");

        hely.innerHTML=formazotttermek
}

var alertdiv = document.getElementById("alert")


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
                const benne = this.items.some(item => item.name === adat)
                if(!benne){
                    this.items.push(termek)
                    console.log(this.items)
                    alertdiv.style.textAlign = "center"
                    alertdiv.style.width = "300px";
                    alertdiv.style.height = "30px;"
                    alertdiv.style.backgroundColor = "#fff";
                    alertdiv.style.border= "1px solid black";
                    alertdiv.innerHTML="Sikeresen hozzáadta a kosárhoz!"
                    setTimeout(()=>{
                        alertdiv.innerHTML="";
                        alertdiv.style.border ="none"
                    },1500)
                }
            }
        })
    }

    megtekintes(){
        
        let ujdiv = document.getElementById("ujdiv");
        ujdiv.innerHTML="";
        let vegosszeg = 0;
        for(let i =0 ; i<this.items.length;i++){
            ujdiv.innerHTML+=`<p>${this.items[i].name}, ${this.items[i].price} VND</p>`;
            vegosszeg+=Number(this.items[i].price)

        }
        ujdiv.innerHTML+=`<p id="vegossz">Végösszeg: ${vegosszeg} VND</p>`
        this.items=[];
    }
}

const peldany = new tarolo()

