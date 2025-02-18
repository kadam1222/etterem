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
                    this.items.push({...termek, quantity:1})
                    
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
                    let gomb = document.createElement("button");
                    gomb.innerText="Törlés"
                    gomb.addEventListener('click',function(){
                        const talal = this.items.find(item => item.name)
                    })
                }
            }
        })
    }

    megtekintes(){
        
        let ujdiv = document.getElementById("ujdiv");
        ujdiv.innerHTML="";
        let vegosszeg = 0;
        this.items.forEach((item, i) => {
            ujdiv.innerHTML += `
                <p>${item.name}, ${item.price} VND</p>
                Mennyiség:
                <button onclick="peldany.updateQuantity('${item.name}', 1)">+</button>
                <span id="menny${i}">${item.quantity}</span>
                <button onclick="peldany.updateQuantity('${item.name}', -1)">-</button>
                <button onclick="peldany.torol('${item.name}')">Törlés</button>
            `;
            vegosszeg += Number(item.price) * item.quantity;
        });
        ujdiv.innerHTML+=`<p id="vegossz">Végösszeg: ${vegosszeg} VND</p>`
        
    }

    torol(nev){
        
        this.items = this.items.filter(item => item.name !== nev)
        this.megtekintes();
    }
    updateQuantity(nev, valtoztat) {
        const item = this.items.find(i => i.name === nev);
        if(item) {
            item.quantity = Math.max(1, item.quantity + valtoztat);
        }
        this.megtekintes();
    }
    
}


const peldany = new tarolo()