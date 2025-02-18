import { ajoutListenersAvis, ajoutListenerEnvoyerAvis, afficherAvis } from "./avis.js";
// Récupération des pièces depuis le fichier JSON
let pieces = window.localStorage.getItem('pieces');
if (pieces === null) {
    const reponse = await fetch('http://localhost:8081/pieces');
    const pieces = await reponse.json();
    const valeurPieces = JSON.stringify(pieces);
    window.localStorage.setItem('pieces', valeurPieces);
} else {
    pieces = JSON.parse(pieces);
}
ajoutListenerEnvoyerAvis();

// fonction pour générer les fiches des pièces
function genererPieces(pieces) {
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

        const avisBouton = document.createElement("button");
        avisBouton.dataset.id = article.id;
        avisBouton.textContent = "Afficher les avis";


        // On rattache la balise article a la section Fiches
        sectionFiches.appendChild(pieceElement);
        // On rattache l’image à pieceElement (la balise article)
        pieceElement.appendChild(imageElement);
        pieceElement.appendChild(nomElement);
        pieceElement.appendChild(prixElement);
        pieceElement.appendChild(categorieElement);
        pieceElement.appendChild(descriptionElement);
        pieceElement.appendChild(stockElement);

        pieceElement.appendChild(avisBouton);
    }
    ajoutListenersAvis();
}

// Appel de la fonction pour générer les fiches des pièces au lancement de la page
genererPieces(pieces);

for (let i = 0; i < pieces.length; i++) {
    const id = pieces[i].id;
    const avisJSON = window.localStorage.getItem(`avis-pieces-${id}`);
    const avis = JSON.parse(avisJSON);

    if (avis !== null) {
        const pieceElement = document.querySelector(`article[data-id="${id}"]`);
        afficherAvis(pieceElement, avis);
    }
}

// Gestion des boutons
// Tri des pièces par prix croissant
const boutonTrier = document.querySelector(".btn-trier");

boutonTrier.addEventListener("click", function () {
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function (a, b) {
        return a.prix - b.prix;
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesOrdonnees);
});

// Tri des pièces par prix décroissant
const boutonTrierDecroissant = document.querySelector(".btn-trier-dcs");

boutonTrierDecroissant.addEventListener("click", function () {
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function (a, b) {
        return b.prix - a.prix;
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesOrdonnees);
});

// Filtrage des pièces par prix abordable
const boutonFiltrer = document.querySelector(".btn-filtrer");

boutonFiltrer.addEventListener("click", function () {
    const piecesFiltrees = pieces.filter(function (piece) {
        return piece.prix <= 35;
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});

// Filtrage des pièces par description
const boutonFiltrerDescription = document.querySelector(".btn-filtrer-description");

boutonFiltrerDescription.addEventListener("click", function () {
    const piecesFiltrees = pieces.filter(function (piece) {
        return piece.description;
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});


// Liste des pièces abordables
const noms = pieces.filter(piece => piece.prix <= 35) // Garde seulement les éléments à prix <= 35
    .map(piece => piece.nom); // Récupère uniquement les noms

//Création de la liste
const pElement = document.createElement('p')
pElement.innerText = "Pièces abordables :";
//Création de la liste
const abordablesElements = document.createElement('ul');
//Ajout de chaque nom à la liste
for (let i = 0; i < noms.length; i++) {
    const nomElement = document.createElement('li');
    nomElement.innerText = noms[i];
    abordablesElements.appendChild(nomElement)
}
// Ajout de l'en-tête puis de la liste au bloc résultats filtres
document.querySelector('.abordables')
    .appendChild(pElement)
    .appendChild(abordablesElements)


// Liste des pièces en stock
const nomsDisponibles = pieces.filter(piece => piece.disponible === true)
    .map(piece => piece.nom);
const prixDisponibles = pieces.filter(piece => piece.disponible === true)
    .map(piece => piece.prix);

//Création de la liste
// Création de la liste
const disponiblesElement = document.createElement('ul');

for (let i = 0; i < nomsDisponibles.length; i++) {
    const nomElement = document.createElement('li');
    nomElement.innerText = `${nomsDisponibles[i]} - ${prixDisponibles[i]} €`
    disponiblesElement.appendChild(nomElement)
}

const pElementDisponible = document.createElement('p')
pElementDisponible.innerText = "Pièces disponibles :";
document.querySelector('.disponibles').appendChild(pElementDisponible).appendChild(disponiblesElement)


// 
const inputPrixMax = document.querySelector("#prix-max");
inputPrixMax.addEventListener('input', function () {
    const piecesFiltrees = pieces.filter(function (piece) {
        return piece.prix <= inputPrixMax.value;
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});

const boutonMettreAJour = document.querySelector(".btn-mettre-a-jour");
boutonMettreAJour.addEventListener("click", function () {
    window.localStorage.removeItem("pieces");
});