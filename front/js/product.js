//On récupère les produits de l'APi 
fetch("http://localhost:3000/api/products")

    .then((res) => res.json())
    .then((objectProducts) => {
        //On appelle la fonction productOfKanap
        productOfKanap(objectProducts);
    })
    .catch((err) => {
        document.querySelector(".item").innerHTML = "<h1>erreur 404</h1>";
        console.log("erreur 404 au niveau de l'API, erreur suivante : " + err);
    });


// On récupère l'ID via l'url
const searchUrl = new URLSearchParams(document.location.search);
const id = searchUrl.get("_id");

    // On vérifie dans la console qu'on a bien récupéré l'ID voulu
    console.log(id);

// On déclare le canapé qui va être choisi par le client et qui sera prèt à être modifié
let kanapClient = {};
    kanapClient._id = id;

// On déclare la fonction qui va nous permettre d'afficher notre canapé choisi
function productOfKanap(Kanap) {
    
    //On commence par définir ses champs
    let title = document.querySelector("#title");
    let price = document.querySelector("#price");
    let description = document.querySelector("#description");
    let colorChose = document.querySelector("#colors");
    let imageAlt = document.querySelector("article div.item__img");

    //On créer nptre boucle pour personnalisé nos variables précédentes*
    for (let kanapChose of Kanap) {
        if (id === kanapChose._id) {
            title.textContent = `${kanapChose.name}`;
            price.textContent = `${kanapChose.price}`;
            description.textContent = `${kanapChose.description}`;
            imageAlt.innerHTML = `<img src ="${kanapChose.imageUrl}" alt="${kanapChose.altTxt}">`;

            //On en profite pour déclarér le prix pour le futur panier
            kanapClient.price = `${kanapChose.price}`

            //On définit la couleur du canapé avec une boucle dans la boucle comme sur son tableau dans le tableau
            for (let color of kanapChose.colors) {
                colorChose.innerHTML += `<option value ="${color}">${color}</option>`;
            }
        }
    }
}

//Choix des couleurs

let picColor = document.querySelector("#colors");
picColor.addEventListener("input", (eventColor) => {
    let kanapColor;
        kanapColor = eventColor.target.value;
    kanapClient.color = kanapColor;
    document.querySelector("#addToCart").style.color = "white";
    document.querySelector("#addToCart").textContent = "ajouter au panier";
});

//Choix quantité

let picQuantity = document.querySelector("input[id='quantity']");
let kanapQuantity;
    picQuantity.addEventListener("input", eventQuantity => {
        kanapQuantity = eventQuantity.target.value;
        kanapClient.quantity = kanapQuantity;
        document.querySelector("#addToCart").style.color = "white";
        document.querySelector("#addToCart").textContent = "ajouter au panier";
    });


//validation de la touche ajouter au panier
let picProduct = document.querySelector("#addToCart");
picProduct.addEventListener("click", () => {
        //On liste les conditions nécessaires pour valider le panier puis on affiche le message d'alerte
    if (
        kanapClient.quantity < 1 ||
        kanapClient.quantity > 100 ||
        kanapClient.quantity === undefined||
        kanapClient.color === ""||
        kanapClient.color === undefined 
    ) {
        alert("pour valider votre article, veuillez renseigner une couleur ainsi qu'une quantité valide comprise entre 1 et 100");
    } else {
        addToPanier();
        document.querySelector("#addToCart").style.color = "green";
        document.querySelector("#addToCart").textContent = "produit ajouté !";
    }
});

// On déclare les tableaux nécessaire au pannier
// Le 1er pour créer le tableau de base
let picProductClient = [];
// le 2eme qui découlera du local storage et qu'on convertira en json 
let saveProduct = [];
// le 3eme qui sera temporaire (donc pas dans le local storage)
let temporaryProduct = [];
// le dernier qui assemblera les paniers deux et trois
let productToAdd = [];

// On créer une fonction pour ajouter notre article au premier pannier
function addFirstProduct() {
    if (saveProduct === null) {
        picProductClient.push(kanapClient);
        return (localStorage.stockPannier = JSON.stringify(picProductClient));
    }
};

// On créer une fonction pour rajouter un produit et effectue un tri si nécessaire
function otherProduct() {
    // On vide notre pannier à ajouter et on met le produit choisit dans notre tableau 3
    productToAdd = [];
    temporaryProduct.push(kanapClient);
    //On rassemble nos tableaux 2 et 3
    productToAdd = [...saveProduct, ...temporaryProduct];
    // On trie et on classe les id
    productToAdd.sort(function triage(a, b) {
        if (a._id < b._id) return -1;
        if (a._id > b._id) return 1;
        if (a._id = b._id) {
            if(a.color < b.color) return -1;
            if(a.color > b.color) return 1;
        }
        return 0;
    });
    //On remet le tableau 3 a 0 
    temporaryProduct = [];
    // On envoit notre produit à ajouter dans le local storage en json stringify
    return (localStorage.stockPannier = JSON.stringify(productToAdd));
};

// Fonction addToPannier qui va ajuster nos quantités
function addToPanier () {
    // On récupère notre local storage (convertie en JSON)
    saveProduct = JSON.parse(localStorage.getItem("stockPannier"));

    if (saveProduct) {
        for (let kanapChose of saveProduct) {
            if (kanapChose._id === id && kanapChose.color === kanapClient.color) {
                alert("Vous avez déjà selectionné ce canapé");
                //On créer une variable pour additionner l'ancienne quantité et la nouvelle
                let addQuantity = parseInt(kanapChose.quantity) + parseInt(picQuantity);
                kanapChose.quantity = JSON.stringify(saveProduct);
                // On renvoit le nouveau panier dans le local storage
                return (localStorage.stockPannier = JSON.stringify(saveProduct));
            }
        }
        return otherProduct();
    }
    return addFirstProduct();
};
console.log(saveProduct)