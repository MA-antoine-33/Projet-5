
//----------------------------------------------------------------
// Récupération des produits de l'api
//----------------------------------------------------------------
// appel de la ressource api product (voir script.js) si on est sur la page panier

fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((objectProducts) => {
      console.log(objectProducts);
      // appel de la fonction affichagePanier
      displayPannier(objectProducts);
  })
 
// On créer notre fonction qui va déterminé l'affichage de notre pannier
function displayPannier (index) {
    //On commence par aller récupérer notre pannier convertie
    let pannier = JSON.parse(localStorage.getItem("stockPannier"));

    if (pannier && pannier.length != 0) {
        for (let kanapChose of pannier) {
            for (let i = 0, l = index.length; i < l; i++) {
                //Pour chaque Id valable on lui rend ses valeur de l'Array
                if (kanapChose._id === index[i]._id) {
                    kanapChose.name = index[i].name;
                    kanapChose.price = index[i].price;
                    kanapChose.image = index[i].imageUrl;
                    kanapChose.description = index[i].description;
                    kanapChose.alt = index[i].altTxt;
                }
            }
        }
        display(pannier);
    } else {
        // Si il y a aucun pannier, on créer un titre pour pré"venir l'utilisateur
        document.querySelector("#totalQuantity").innerHTML = "0";
        document.querySelector("#totalPrice").innerHTML = "0";
        document.querySelector("h1").innerHTML = "Votre pannier est vide"
    }
    //On ajoute deux fonctions pour que notre pannier soit actualisé
    changeQuantity();
    deleteKanap();
};

// On créer la fonction qui va nous permettre d'afficher notre pannier
function displayPannier(index) {
    let sectionCart = document.querySelector("#cart__items");
    // On créer les affichage avec une map et introduction de dataset dans le code html
    sectionCart.innerHTML += index.map((kanapChose) =>
        `<article class="cart__item" data-id="${kanapChose._id}" data-color="${kanapChose.color}" data-quantity="${kanapChose.quantity}">
            <div class="cart__item__img"
                <img src="${kanapChose.image}" alt="${kanapChose.alt}">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__titlePrice">
                    <h2>${kanapChose.name}</h2>
                    <span>couleur : ${kanapChose.color}</span>
                    <p data-price="${kanapChose.price}">${kanapChose.price} €</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Qté : </p>
                        <input type="number" class="itemQuantity" min="1" max="100" value="${kanapChose.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem" data-id="${kanapChose._id}" data-color="${kanapChose.color}">Supprimer</p>
                    </div>
                </div>
            </div>
        </article>`)
        //On remplace les virgules des tableux par des espaces
        .join("");
        //On continue a actualiser nos modifications
        productTotal();
};

//On définit la fonction changeQuantity
function changeQuantity() {
    const kanapCart = document.querySelector(".cart__item");
    //On regarde ce qu'on a affiché grâce au dataset précedent
    kanapCart.forEach((kanapCart) => {
        kanapCart.addEventListener("change", (evenQuantity) => {
            //On vérifie l'information de la valuer du clic et son possitionnement
            let pannier = JSON.parse(localStorage.getItem("stockPannier"));
            //On modifie la quantité du produit
            for (kanap of pannier)
                if (kanap._id === kanapCart.dataset.id && kanapCart.dataset.color === kanap.color) {
                    kanap.quantity = evenQuantity.target.value;
                    localStorage.stockPannier = JSON.stringify(pannier);
                    //On actuealise nos données
                    productTotal();
                }
        })
    })
}

//On créer la fonction de suppression
function deleteKanap() {
    const cartDelete = document.querySelectorAll(".cart__item .deleteItem");
    cartDelete.forEach((cartDelete) => {
        //On écoute s'il y a un clic sur supprimer
        cartDelete.addEventListener("click", () => {
            let pannier = JSON.parse(localStorage.getitem("stockPannier"));
            for (let d = 0, b = pannier.length; d < b; d++)
                if (pannier[d]._id === cartDelete.dataset.id && pannier[d].color === cartDelete.dataset.color) {
                    const sup = [d];
                    let newPannier = JSON.parse(localStorage.getItem("stockPannier"));
                    //suppression de l'element a l'indice sup
                    newPannier.splice(sup, 1);
                    //On affiche à l'utilisateur
                    if (newPannier && newPannier.length == 0) {
                        document.querySelector("#totalQuantity").innerHTML = "0";
                        document.querySelector("#totalPrice").innerHTML = "0";
                        document.querySelector("h1").innerHTML = "Votre pannier est vide";
                    }
                    //On renvoit le nouveau pannier dans le local storage et on lance la fonction pour actualiser
                    localStorage.stockPannier = JSON.stringify(newPannier);
                    productTotal();
                    return location.reload();
                }
        });
    });
};

// On finit on définissant notre fonction total
function productTotal() {
    let pannier = JSON.parse(localStorage.getItem("stockPannier"));
    let kanapTotal = 0;
    let priceKanap = 0;
    let priceTotal = 0;
    //On récupère toutes nos quantités
        for (let kanap of pannier) {
            kanapTotal += JSON.parse(kanap.quantity);
            priceKanap = JSON.parse(kanap.quantity) * JSON.parse(kanap.price);
            priceTotal =+ priceKanap;
        };
    //Je place le résultat à sa place
    document.getElementById("totalQuantity").textContent = kanapTotal;
    document.getElementById("totalPrice").textContent = priceTotal;
}
