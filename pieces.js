// Récupération des pièces depuis le fichier JSON
const reponse = await fetch('pieces-autos.json');
const pieces = await reponse.json();

for (let i = 0; i < pieces.length; i++) {

    const article = pieces[i];
    // Récupération de l'élément du DOM qui accueillera les fiches
    const sectionFiches = document.querySelector(".fiches");
    // Création d’une balise dédiée à une pièce automobile
    const pieceElement = document.createElement("article");
    // Création des balises 
    const imageElement = document.createElement("img");
    imageElement.src = article.image;
    const nomElement = document.createElement("h2");
    nomElement.innerText = article.nom;
    const prixElement = document.createElement("p");
    prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;
    const categorieElement = document.createElement("p");
    categorieElement.innerText = article.categorie ?? "(aucune catégorie)";
    const descriptionElement = document.createElement("p");
    descriptionElement.innerText = article.description ?? "Pas de description pour le moment.";
    const stockElement = document.createElement("p");
    stockElement.innerText = article.disponible ? "En stock" : "Rupture de stock";

    // On rattache la balise article a la section Fiches
    sectionFiches.appendChild(pieceElement);
    // On rattache l’image à pieceElement (la balise article)
    pieceElement.appendChild(imageElement);
    pieceElement.appendChild(nomElement);
    pieceElement.appendChild(prixElement);
    pieceElement.appendChild(categorieElement);
    pieceElement.appendChild(descriptionElement);
    pieceElement.appendChild(stockElement);
}

// Gestion des boutons
// Tri des pièces par prix croissant
const boutonTrier = document.querySelector(".btn-trier");

boutonTrier.addEventListener("click", function () {
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function (a, b) {
        return a.prix - b.prix;
    });
    console.log(piecesOrdonnees);
});

// Filtrage des pièces par prix abordable
const boutonFiltrer = document.querySelector(".btn-filtrer");

boutonFiltrer.addEventListener("click", function () {
    const piecesFiltrees = pieces.filter(function (piece) {
        return piece.prix <= 35;
    });
    console.log(piecesFiltrees);
});

//Tri des pièces par prix décroissant
const boutonTrierDecroissant = document.querySelector(".btn-trier-dcs");

boutonTrierDecroissant.addEventListener("click", function () {
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function (a, b) {
        return b.prix - a.prix;
    });
    console.log(piecesOrdonnees);
});

// Filtrage des pièces par description
const boutonFiltrerDescription = document.querySelector(".btn-filtrer-description");

boutonFiltrerDescription.addEventListener("click", function () {
    const piecesFiltreesDescription = pieces.filter(function (piece) {
        return piece.description;
    });
    console.log(piecesFiltreesDescription)
});

// Nom des pièces abordables
const noms = pieces.filter(piece => piece.prix <= 35) // Garde seulement les éléments à prix <= 35
    .map(piece => piece.nom); // Récupère uniquement les noms

//Création de la liste
const abordablesElements = document.createElement('ul');
document.querySelector('.abordables').appendChild(abordablesElements)
//Ajout de chaque nom à la liste
for (let i = 0; i < noms.length; i++) {
    const nomElement = document.createElement('li');
    nomElement.innerText = noms[i];
    abordablesElements.appendChild(nomElement)
}

// Nom des pièces en stock
const enStockNom = pieces.filter(piece => piece.disponible === true)
    .map(piece => piece.nom);
const enStockPrix = pieces.filter(piece => piece.disponible === true)
    .map(piece => piece.prix);

//Création de la liste
const enStockElements = document.createElement('ul');
document.querySelector('.disponibles').appendChild(enStockElements)
//Ajout de chaque nom + prix à la liste
for (let i = 0; i < enStockNom.length; i++) {
    const nomElement = document.createElement('li');
    nomElement.innerText = `${enStockNom[i]} - ${enStockPrix[i]} €`;
    enStockElements.appendChild(nomElement)
}