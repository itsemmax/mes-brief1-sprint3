const continent = document.querySelector("#continent");
const recherche = document.querySelector("#recherche");
const trie = document.querySelector("#recherche");
const lists_pays = document.querySelector("#lists_pays");

const API_URL = "https://countries.dev/countries";

// Tous les pays reçus de l'API (rempli une seule fois, au chargement)
let allCountries = [];

// TODO : récupère ici les éléments du DOM dont tu as besoin

async function fetchCountries() {
  try{
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(`error de récupérer des pays`);
  }
  allCountries = await response.json();
  displayCountries(allCountries);
  localStorage.setItem("countries",JSON.stringify(allCountries));
  }
  catch(error){
    console.log(error);
  }
}
allCountries = JSON.parse(localStorage.getItem("countries"))
if(allCountries){
  console.log(allCountries);
  createCountryCard(allCountries);
}
else{
  fetchCountries();
}

/**
 * Crée la carte HTML d'un pays, sur le modèle de la maquette :
 * drapeau (avec un texte alternatif utile), nom, capitale, population.
 *
 * @param {Object} country - Un pays tel que renvoyé par l'API.
 * @returns {HTMLElement} La carte, prête à être ajoutée à la grille.
 */
function createCountryCard(country) {
  lists_pays.textContent = "";
  country.forEach(country=>{
    const article = document.createElement("article");
    article.className = "border border-[#D9E0E8] w-80 rounded pb-3 flex flex-col gap-1";
  
    const img = document.createElement("img");
    img.src = country.flags.png;
    img.alt="";
  
    const h2 = document.createElement("h2");
    h2.className ="px-2 text-[20px] font-bold";
    h2.textContent = country.name;

    const div = document.createElement("div");
    div.className ="flex justify-between px-2";

    const p = document.createElement("h2");
    p.textContent = "Capitale";
    const p1 = document.createElement("h2");
    p1.textContent = country.capital;
    div.append(p,p1);

    const div1 = document.createElement("div");
    div1.className ="flex justify-between px-2";

    const p2 = document.createElement("h2");
    p2.textContent = "Population";
    const p3 = document.createElement("h2");
    p3.textContent = country.population;
    div1.append(p2,p3);
    article.append(img,h2,div,div1);
    lists_pays.append(article);
  })
}
/**
 * Affiche une liste de pays dans la grille.
 * - Vide d'abord la grille (sinon les cartes s'accumulent).
 * - Ajoute une carte par pays.
 * - Si la liste est vide, affiche le message « Aucun pays ne correspond ».
 *
 * @param {Array} countries - Les pays à afficher.
 */
function displayCountries(countries) {
  // TODO
}

/**
 * Applique les deux filtres EN MÊME TEMPS sur allCountries :
 * - le continent choisi dans la liste déroulante ;
 * - le texte saisi dans la recherche (majuscules et minuscules ignorées).
 * Puis affiche le résultat avec displayCountries().
 *
 * Aucune requête vers l'API ici !
 */
function filterCountries() {
  // TODO
}


// ------------------------------------------------------------
// BONUS
// ------------------------------------------------------------

/**
 * (Bonus) Trie des pays par population, du plus peuplé au moins peuplé.
 * Attention : ne modifie pas le tableau allCountries d'origine.
 *
 * @param {Array} countries
 * @returns {Array} Un nouveau tableau trié.
 */
function sortByPopulation(countries) {
  // TODO
}

/**
 * (Bonus) Affiche ou masque le message « Chargement des pays… ».
 *
 * @param {boolean} isLoading - true pour l'afficher, false pour le masquer.
 */
function showLoader(isLoading) {
  // TODO
}

/**
 * (Bonus) Affiche un message d'erreur clair quand l'API ne répond pas.
 *
 * @param {string} message
 */
function showError(message) {
  // TODO
}


// ------------------------------------------------------------
// DÉMARRAGE
// ------------------------------------------------------------

/**
 * Point d'entrée de l'application :
 * 1. récupère les pays avec fetchCountries() et les stocke dans allCountries ;
 * 2. affiche les pays du continent sélectionné par défaut ;
 * 3. écoute les changements de continent et la saisie dans la recherche.
 *
 * (Bonus) Gère le chargement et les erreurs avec try...catch.
 */
async function init() {
  // TODO
}

init();

function rechercher(test){
  let text = recherche.value.toLowerCase();
  let ff = test.filter(country => country.name.toLowerCase().includes(text))
  return ff;
}

function rech_filter(){
  let test = allCountries;
  test = rechercher(test);
  return test;
}
recherche.addEventListener("input",()=>{
  createCountryCard(rech_filter());
})
