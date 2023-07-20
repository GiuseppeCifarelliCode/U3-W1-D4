class Abbigliamento {
    constructor(
        public id:number,
        public codprod:number,
        public collezione:string,
        public capo:string,
        public modello:number,
        public quantita:number,
        public colore:string,
        public prezzoivaesclusa:number,
        public prezzoivainclusa:number,
        public disponibile:string,
        public saldo:number
    ) {}

    getSaldoCapo():number {
        return this.prezzoivainclusa * this.saldo/100
    }

    getAcquistoCapo():number|string {
        return (this.prezzoivainclusa - this.getSaldoCapo()) + '$'  
    }
}
let clothes:Abbigliamento[] = []
fetch('./starter/Abbigliamento.json')
.then(res => res.json())
.then((data:any) => {
    data.forEach((el:any, i:number) =>{
        let oneClothe = new Abbigliamento(el.id, el.codprod, el.collezione, el.capo, el.modello, el.quantita, el.colore, el.prezzoivaesclusa, el.prezzoivainclusa, el.disponibile, el.saldo)
        clothes.push(oneClothe)
        console.log(clothes[i].getAcquistoCapo());
    })
    console.log(clothes);

    // DOM MANIPULATION - CREATE CARDS
    const cardList = document.getElementById('list') as HTMLElement
    clothes.forEach(el => {
        const card = document.createElement('div') as HTMLDivElement
        card.innerHTML = `<div class="card">
        <div class="card-body">
          <h5 class="card-title">${el.capo}</h5>
          <p class="card-text">Collection ${el.collezione}</p>
          <p class="card-text">Color ${el.colore}</p>
          <p class="card-text">Disponibility ${el.disponibile}</p>
          <p class="card-text">Quantity ${el.quantita}</p>
          <p class="card-text">Price ${el.prezzoivainclusa}$</p>
          <a href="#" class="btn btn-primary buy-button">Buy</a>
        </div>
      </div>`
      cardList.appendChild(card)
    })

    // ADD EVENT ON BUTTONS
    const buyButtons = document.querySelectorAll('.buy-button')
    const cartReference = document.getElementById('cart') as HTMLElement
    buyButtons.forEach(button =>{
        button.addEventListener('click', (e)=>{
            const cardInCart = document.createElement('div') as HTMLDivElement
            cardInCart.innerHTML = `<div class="card">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${button.parentElement?.innerText}</h5>
              <a href="#" class="btn btn-primary buy-button">Buy</a>
            </div>
          </div>`
          cartReference.appendChild(cardInCart)
        })
    })
})



