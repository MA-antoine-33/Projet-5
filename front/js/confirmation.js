const page = document.location.href;


fetch("http://localhost:3000/api/products")
.then((res) => res.json())
.then((objectProducts) => {
    console.log(objectProducts);
    console.log(localStorage);
    
    // appel de la fonction affichagePanier
    sendValidation();
})
.catch((err) => {
  document.querySelector(".confirmation").innerHTML = "<h1>erreur 404</h1>";
  console.log("erreur 404 au niveau de l'API, erreur suivante : " + err);
});


function sendValidation() {
    if (page.match("confirmation")) {
        sessionStorage.clear();
        localStorage.clear();
        let numOfCommand = new URLSearchParams(document.location.search).get("cartOrder");
        document.querySelector("#orderId").innerHTML = `<br>${numOfCommand}<br>Merci pour vos achats`;
        console.log("Le numéro de commande est le : " + numOfCommand);
        // On réinitialise le numéro de commande
        numOfCommand = undefined
    };
}