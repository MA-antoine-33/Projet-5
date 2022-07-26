const page = document.location.href;

//On récupère les produits de l'API
if (page.match("cart")) {
   fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((objectProducts) => {
      console.log(objectProducts);
      console.log(localStorage);
      // appel de la fonction affichagePanier
      displayPannier(objectProducts);
  })
 /*.catch((err) => {
    document.querySelector("#cartAndFormContainer").innerHTML = "<h1>erreur 404</h1>";
    console.log("erreur 404 au niveau de l'API, erreur suivante : " + err);
  });*/
 } else  {
    console.log("Page confirmation");
 };

// On créer notre fonction qui va déterminé l'affichage de notre pannier
function displayPannier(index) {
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
function display(indexer) {
    let sectionCart = document.querySelector("#cart__items");
    // On créer les affichage avec une map et introduction de dataset dans le code html
    sectionCart.innerHTML += indexer.map((kanapChose) => 
        `<article class="cart__item" data-id="${kanapChose._id}" data-color="${kanapChose.color}" data-quantity="${kanapChose.quantity}">
            <div class="cart__item__img">
                <img src="${kanapChose.image}" alt="${kanapChose.alt}">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${kanapChose.name}</h2>
                    <p>${kanapChose.color}</p>
                    <p data-price="${kanapChose.price}">${kanapChose.price} €</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Qté : </p>
                        <input type="number" step="1" class="itemQuantity" min="1" max="100" value="${kanapChose.quantity}">
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
    const kanapCart = document.querySelectorAll(".cart__item");
    //On regarde ce qu'on a affiché grâce au dataset précedent
    kanapCart.forEach((kanapCart) => {
        kanapCart.addEventListener("change", (eventQuantity) => {
            //On vérifie l'information de la valuer du clic et son positionnement
            let pannier = JSON.parse(localStorage.getItem("stockPannier"));
            //On modifie la quantité du produit
            for (kanap of pannier)
                if (kanap._id === kanapCart.dataset.id && kanapCart.dataset.color === kanap.color) {
                    kanap.quantity = Number(eventQuantity.target.value);
                    localStorage.stockPannier = JSON.stringify(pannier);
                    //On actuealise nos données
                    productTotal();
                }
        });
    });
};

//On créer la fonction de suppression
function deleteKanap() {
    const cartDelete = document.querySelectorAll(".cart__item .deleteItem");
    cartDelete.forEach((cartDelete) => {
        //On écoute s'il y a un clic sur supprimer
        cartDelete.addEventListener("click", () => {
            let pannier = JSON.parse(localStorage.getItem("stockPannier"));
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
    //let priceKanap = 0;
    //let priceTotal = 0;
    //On récupère toutes nos quantités
        for (let kanap of pannier) {
            kanapTotal += JSON.parse(kanap.quantity);
            //priceKanap = JSON.parse(kanap.quantity) * JSON.parse(kanap.price);
            //priceTotal += priceKanap;
        };
    //Je place le résultat à sa place
    document.getElementById("totalQuantity").textContent = kanapTotal;
    //document.getElementById("totalPrice").textContent = priceTotal;
};

// Pour la partie correspondant au formulaire
//
// On va créer un tableau pour stocker la commande sur la page pannier
 
 
 if (page.match("cart")) {
    var clientContact = {};
    localStorage.clientContact = JSON.stringify(clientContact);
    // On ajoute des classes à chaque input pour n'avoir à écrire qu'une seule fois les regex en fonction de ce que l'on souhaite y voir
    // D'abord pour les textes
    var firstName = document.querySelector("#firstName");
    firstName.classList.add("regex-text");
    var lastName = document.querySelector("#lastName");
    lastName.classList.add("regex-text");
    var city = document.querySelector("#city");
    city.classList.add("regex-text"); 
    // Ensuite pour l'adresse
    var address = document.querySelector("#address");
    address.classList.add("regex-address");
    // Et on finit avec l'email 
    var email = document.querySelector("#email");
    email.classList.add("regex-email");
    document.querySelector("#email").setAttribute("type", "text");
 }
 
 let regexText = document.querySelectorAll(".regex-text");

 //On créer nos regex 
 let regexLetter = /^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,50}$/i;
 let regexNumberAndLetter = /^[a-z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ,.\s-]{1,50}$/i;
 let regValideEmail = /^[a-z0-9æœ.!#$%&’*+/=?^_`{|}~"(),:;<>@[\]-]{1,50}$/i;
 let regMatchEmail = /^[a-zA-Z0-9æœ.!#$%&’*+/=?^_`{|}~"(),:;<>@[\]-]+@([\w-]+\.)+[\w-]{2,4}$/i;

 // On ecoute pour vérifier que les champs de l'input soient correctement remplis
if (page.match("cart")) {
    regexText.forEach((regexText) => 
        regexText.addEventListener("input", (e) => {
            //inputValue est la valeur de l'input
            inputValue = e.target.value;
            //repsRegex sera la valeur de la réponse regex
            let respRegex = inputValue.search(regexLetter);
            if (respRegex === 0) {
                clientContact.firstName = firstName.value;
                clientContact.lastName = lastName.value;
                clientContact.city = city.value;
            }
            if (clientContact.firstName !== "" && clientContact.lastName !== "" && clientContact.city !== "" && respRegex === 0) {
                clientContact.normalRegex = 3;
            } else {
                clientContact.normalRegex =0;
            }
            localStorage.clientContact = JSON.stringify(clientContact);
            colorRegex(respRegex, inputValue, regexText);
            validClic();
        })
    );
};



//On écoute pour vérifier les champs de l'input address
if (page.match("cart")) {
    let regexAddress = document.querySelector(".regex-address");
    regexAddress.addEventListener("input", (e) => {
        inputValue = e.target.value;
        let adrRegex = inputValue.search(regexNumberAndLetter);
        if (adrRegex == 0) {
            clientContact.address = address.value;
        } if (clientContact.address !== "" && adrRegex === 0) {
            clientContact.regexAddress = 1;
        } else {
            clientContact.regexAddress = 0;
        }
        localStorage.clientContact = JSON.stringify(clientContact);
        colorRegex(adrRegex, inputValue, regexAddress);
        validClic();
    });
};


//On écoute pour vérifier l'email
if (page.match("cart")) {
    let regexEmail = document.querySelector(".regex-email");
    regexEmail.addEventListener("input", (e) => {
        inputValue = e.target.value;
        let regexMatch = inputValue.match(regMatchEmail);
        let regexEmailValid = inputValue.search(regValideEmail);
         if (regexEmailValid === 0 && regexMatch != null) {
            clientContact.email = email.value;
            clientContact.regexEmail = 1;
        } else {
            clientContact.regexEmail = 0;
        }
        localStorage.clientContact = JSON.stringify(clientContact);
        colorRegex(regexEmailValid, inputValue, regexEmail);
        validClic();
    });
};

//Message d'alerte pour les champs de l'email
if (page.match("cart")) {
    email.addEventListener("input", (e) => {
        inputValue = e.target.value;
        let regMatch = inputValue.match(regMatchEmail);
        let regValide = inputValue.search(regValideEmail);
        if (inputValue === "" && regMatch === null) {
            document.querySelector("#emailErrorMsg").textContent = "Veuillez saisir votre email.";
            document.querySelector("#emailErrorMsg").style.color = "white";
        } else if (regValide !== 0) {
            document.querySelector("#emailErrorMsg").innerHTML = "caractère non valide.";
            document.querySelector("#emailErrorMsg").style.color = "red";
        } else if (inputValue != "" && regMatch === null) {
            document.querySelector("#emailErrorMsg").innerHTML = "Format de l'email non conforme.";
            document.querySelector("#emailErrorMsg").style.color = "red";
        } else {
            document.querySelector("#emailErrorMsg").innerHTML = "email conforme.";
            document.querySelector("#emailErrorMsg").style.color = "green";
        };
    });
};

//On rajoute la fonction qui donne un indicateur de couleur de fond pour l'utilisateur
let inputValueListen = "";
function colorRegex (regShearch, inputValueListen, inputAction) {
    //si le champs est vide et sans erreur
    if (inputValueListen === "" && regShearch != 0) {
        inputAction.style.backgroundColor = "white";
        inputAction.style.color = "black";

    //Si le champs n'est pas vide et qu'il y a une erreur
    } else if (inputValueListen !== "" && regShearch !=0) {
        inputAction.style.backgroundColor = "red";
        inputAction.style.color = "white";

    //si le champs est valide 
    } else {
        inputAction.style.backgroundColor = "white";
        inputAction.style.color = "black";
    };
};

//On créer une fonction pour afficher des messages d'erreur en cas de non conformité sur les inputs et on commence par les pointer
textInfo(regexLetter, "#firstNameErrorMsg", firstName);
textInfo(regexLetter, "#lastNameErrorMsg", lastName);
textInfo(regexLetter, "#cityErrorMsg", city);
textInfo(regexNumberAndLetter, "#addressErrorMsg", address);

function textInfo(regex, idInfo, listenZone) {
    if (page.match("cart")) {
        listenZone.addEventListener("input", (e) => {
            inputValue = e.target.value;
            index = inputValue.search(regex);
            //Si le champ est vide et sans erreur
            if (inputValue === "" && index != 0) {
                document.querySelector(idInfo).textContent = "Veuillez remplir ce champ.";
                document.querySelector(idInfo).style.color = "white";

            //si le champs n'est pas vide mais qu'il y a une erreur
            } else if (inputValue !== "" && index != 0) {
                document.querySelector(idInfo).textContent = "Caractère non autorisé";
                document.querySelector(idInfo).style.color = "red";

                //Si le champ est valide
            } else {
                document.querySelector(idInfo).textContent = "Valeur acceptée";
                document.querySelector(idInfo).style.color = "green";
            };
        });
    };
};

// On créer la fonction qui va valider notre commande au clic
let cartOrder = document.querySelector("#order");
function validClic () {
    let clientRef = JSON.parse(localStorage.getItem("clientContact"));
    let total = clientRef.normalRegex + clientRef.regexAddress + clientRef.regexEmail;
    if (total === 5) {
        cartOrder.removeAttribute("disabled", "disabled");
        document.querySelector("#order").setAttribute("value", "Commander !");
    } else {
        cartOrder.setAttribute("disabled", "disabled");
        document.querySelector("#order").setAttribute("value", "merci de bien remplir le formulaire en entier")
    }
};

// ensuite on va envoyer notre commande en empechant que la page se re-actualise
if (page.match("cart")) {
    cartOrder.addEventListener("click", (e) => {
        e.preventDefault();
        validClic();
        sendCommand();
    });
};

// Ensuite on créer un tableau pour récuperer nos Id grace à une fonction
let commandId = [];
function tableId() {
    let pannier = JSON.parse(localStorage.getItem("stockPannier"));
    // On récupère les id dans le tableau commandID
    if (pannier && pannier.length > 0) {
        for (let i of pannier) {
            commandId.push(i._id);
        } 
    } else {
        console.log("Le pannier est vide");
        document.querySelector("#order").setAttribute("value", "Votre pannier est vide");
    }
};

// On vient maintenant récuperre les données du client avant l'envoie
let clientRef;
let finalCommand;
function command() {
    clientRef = JSON.parse(localStorage.getItem("clientContact"));
    finalCommand = {
        contact: {
            firstName: clientRef.firstName,
            lastName: clientRef.lastName,
            address: clientRef.address,
            city: clientRef.city,
            email: clientRef.email,
        },
        products : commandId,
    };
};

// On créer la fonction pour envoyer notre commande
function sendCommand() {
    tableId();
    command();
    console.log(finalCommand);
    let total = clientRef.normalRegex + clientRef.regexAddress + clientRef.regexEmail;
    console.log(total)
    //Si le pannier n'est pas vide et que le formulaire est correcte
    if (commandId.length !==0 && total === 5) {
        // Alors on envoie la ressource à l'API 
        fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(finalCommand),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data.orderId)
            document.location.href = `/front/html/confirmation.html?commande=${data.orderId}`;
        })
        .catch(function(err) {
            console.log("Probleme dans la confirmation de la commande de type : " + err);
            alert("Une erreur s'est produite, veuillez recommencer");
        });
    };
};