//Récupération des produits de l'API

fetch("http://localhost:3000/api/products")

    //Je convertie la réponse en .json puis la nomme
    .then((res) => res.json())
    .then((objectProducts) => {
        console.table(objectProducts);
        displayKanaps(objectProducts);
    })

        //On récupère l'erreur s'il y en a une
    .catch((err) => {
        document.querySelector(".titles").innerHTML = "<h1>erreur 404</h1>";
        console.log("erreur 404 au niveau de l'API, erreur suivante : " + err);
      });

// On créer la fonction d'affichage de nos canapés sur l'index

function displayKanaps(index) {
    // On définit notre section ou seront les canapés et on créer une boucle pour les identifier individuellement
    let sectionItems = document.querySelector("#items");

        for (let item of index) {
            sectionItems.innerHTML += 
                `<a href="./product.html?_id=${item._id}">
                    <article>
                        <img src="${item.imageUrl}" alt="${item.altTxt}">
                        <h3 class ="productName">${item.name}</h3>
                        <p class="productDescription">${item.description}</p>
                    </article>
                </a>`;
        }
};