const totalSlot = document.querySelector(".total-slot");
const giftsListElement = document.querySelector(".gifts-list");

const form = document.querySelector("#gift-form");
const nameField = document.querySelector("#name-field");
const priceField = document.querySelector("#price-field");
const descriptionField = document.querySelector("#description-field");

const STORAGE_KEY = '__bool-xmas-list__';

// Prepariamo la lista
let gifts = [];

// Controllo subita se c¡erano elemnti salvati nella storage
const prevList = localStorage.getItem(STORAGE_KEY);

// Se ne trovii...
if(prevList){
    // 1 Utilizziamo la lista precende el posto di quella vouta
    gifts = JSON.parse(prevList);
    console.log(gifts)
    //2 Ricalculaiamo il totale
    calculateTotal();
    //3.Renderizzare la lista precedente
    renderList();

}

/*------------------------------
EVENTI DINAMICI
--------------------------------*/
// Intercettiamo l'invio del form
form.addEventListener("submit", function (event) {
  //1.blocchiamo il ricarimanento della pagina (perche vogliamo gestirlo con JS)
  //   console.log(event);
  event.preventDefault();
  //2. Raccogliere i dati dei campi
  const name = nameField.value.trim();
  const price = priceField.value.trim();
  const description = descriptionField.value.trim();
  // 3. Aggiungere un raegalo alla lista
  addGift(name, price, description);
  // 4, Ripuliamao il form
  form.reset();
  // 5. Riportimao il focus (il curosore) sul primo campo
  nameField.focus();
});

/*---------------------
FUNZIONI
---------------------*/

//Funzione per aggiungere un regalôo alla lista

function addGift(name, price, description) {
  //1. Creiamo un nuovo oggeto che rapresenta il regalo
  const newGift = {
    name,
    price: Number(price),
    description,
  };

  //   console.log(newGift);

  //2. Aggiungiamo l'oggetto alla lista
  gifts.push(newGift);
  console.log(gifts);

// Aaggiungiamo il storage
localStorage.setItem(STORAGE_KEY, JSON.stringify(gifts));

  //3. CAlcoliamo il total
  calculateTotal();

  //4. Renderizziamo (mostriamo su schermo) la lista dei regali
  renderList();
}

function calculateTotal() {
  let total = 0;
  for (let i = 0; i < gifts.length; i++) {
    total += gifts[i].price;
  }
  console.log(total);
  totalSlot.innerText = formatAmount(total);
}

function formatAmount(amount) {
  return amount.toFixed(2) + "€";
}

// Funzione per renderizzare la lista dei regali
function renderList() {
  // TODO ??
  giftsListElement.innerHTML = "";

  for (let i = 0; i < gifts.length; i++) {
    //creo il codice per un singolo elemente della lista
    const giftElement = createListElement(i);

    //Lo aggiungamo alla lista nella pagina
    giftsListElement.innerHTML += giftElement;
  }
  //Rendo cliccabili i buttoni
  setDeleteButton();
}

// Funzione per creare un elemento della lista
function createListElement(i) {
  //Restiturire il codice HTML di un regalo nella lista
  const gift = gifts[i];
  return `
    <li class="gift">
    <div class="gift-info">
        <h3>${gift.name}</h3>
        <p>${gift.description}</p>
    </div>
    <div class="gift-price">${formatAmount(gift.price)}</div>
    <button class="gift-button" data-index=${i}>❌</button>
</li>
    `;
}

//funzione per attivare i bottini di cancellazione
function setDeleteButton() {
  //1. REciperare tutti i bottons dei regali
  const deleteButtons = document.querySelectorAll(".gift-button");
  //2. Per ognumo dei bottoni
  for (let i = 0; i < gifts.length; i++) {
    //3. Recuperiamo (per comodita) il singolo button ad ogni giro
    const button = deleteButtons[i];
    //4 Aggiungo l'event  listener
    button.addEventListener("click",function(){
        //5. Individuo l'index correspondente
        const index= button.dataset.index;
        //6. Rimovo della lista  il regalo corrispondente
        removeGift(index)
    })
  }
}

//funzione per rimovere uñreagalo a la lista
function removeGift(index){
    //1.Rimouvo iĺregalo dalla lista
    gifts.splice(index, 1);
    console.log(gifts);

    // Aggionare il localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gifts));

    calculateTotal();
    renderList();
}

