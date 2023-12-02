import { objets } from "./main.js";
import { capMax } from "./main.js";

// Classe représentant un objet à emporter dans le sac à dos
class objetAEmporter {
  constructor(name, poids, valeur) {
    this.poids = poids;
    this.valeur = valeur;
    this.name = name;
  }
  get getValeur() {
    return this.valeur;
  }
  get getPoids() {
    return this.poids;
  }

  get getName() {
    return this.name;
  }
}

// Fonction pour remplir la matrice T avec les valeurs optimales
function remplirSac(listeObj, W) {
  // Créer une matrice n.W vide
  let T = Array.from(Array(listeObj.length), () => new Array(W));

  // Parcourir chaque objet de la liste
  for (let i = 0; i < listeObj.length; i++) {
    // Parcourir chaque capacité du sac
    for (let c = 0; c <= W; c++) {
      // Si l'objet peut rentrer dans le sac
      if (c >= listeObj[i].getPoids) {
        if (i !== 0) {
          // Choisir la valeur maximale entre la case précédente et celle en prenant l'objet actuel
          T[i][c] = Math.max(
            T[i - 1][c],
            T[i - 1][c - listeObj[i].getPoids] + listeObj[i].getValeur
          );
        } else {
          // Cas particulier pour le premier objet
          T[i][c] = listeObj[i].getValeur;
        }
      } else {
        // L'objet ne rentre pas, on garde la valeur de la case précédente ou 0 si c'est la première case
        if (i === 0) T[i][c] = 0;
        else T[i][c] = T[i - 1][c];
      }
    }
  }
  // Afficher la matrice résultante dans la console
  console.table(T);
  return T;
}

// Fonction pour récupérer la liste des objets pris
function objetsPris(listeObj, matrice) {
  let listeObjetsPris = []; // Liste pour stocker les objets pris
  let i = matrice.length - 1; // Dernière ligne de la matrice
  let c = matrice[0].length - 1; // Dernière colonne de la matrice

  // Vérifier si la valeur maximale dans la matrice n'est pas nulle
  if (matrice[i][c] !== 0) {
    // Trouver la dernière colonne où la valeur change
    while (matrice[i][c] === matrice[i][c - 1]) {
      c--;
    }

    // Trouver la dernière ligne où la valeur change
    while (matrice[i][c] === matrice[i - 1][c]) {
      i--;
    }

    // Ajouter le premier objet pris à la liste
    listeObjetsPris.push(listeObj[i]);

    // Mettre à jour les variables pour le reste de l'algorithme
    let val = matrice[i][c] - listeObj[i].getValeur;
    c = c - listeObj[i].getPoids;

    // Boucle principale pour récupérer les objets pris
    while (c !== 0 || val !== 0) {
      let j = 0;

      // Trouver la ligne où la valeur est suffisante pour être ajoutée
      while (matrice[j][c] < val) j++;

      // Ajouter l'objet à la liste
      listeObjetsPris.push(listeObj[j]);

      // Mettre à jour les variables pour le prochain tour de boucle
      val = matrice[j][c] - listeObj[j].getValeur;
      c -= listeObj[j].getPoids;
    }
  }
  return listeObjetsPris;
}

// Création de la liste d'objets à partir de la liste d'objets principale
let listeObj = [];
for (let i = 0; i < objets.length; ++i) {
  listeObj.push(
    new objetAEmporter(objets[i].weight, objets[i].value, objets[i].name)
  );
}

// Appel de la fonction pour obtenir la liste d'objets pris
let result = objetsPris(listeObj, remplirSac(listeObj, capMax));

// Exporter le résultat
export { result };

/*
L'algorithme que vous avez fourni semble être une implémentation de l'algorithme de résolution du problème du sac à dos (Knapsack Problem) à l'aide de la programmation dynamique. La complexité de cet algorithme peut être analysée en termes de temps et d'espace.

Supposons que la taille de la liste d'objets soit n et la capacité maximale du sac à dos soit W.

Temps :

La création de la matrice a une complexité de O(nW), où n est la taille de la liste d'objets et W est la capacité maximale du sac à dos.
Les boucles while dans l'algorithme ont une complexité qui dépend de la taille de la matrice (n x W). Dans le pire cas, les deux boucles peuvent potentiellement parcourir toute la matrice, ce qui donne une complexité de O(nW) pour chacune des boucles.
Ainsi, la complexité totale en temps de l'algorithme est généralement O(nW).

Espace :

La matrice utilisée a une taille de n x W, ce qui donne une complexité d'espace de O(nW).
La liste listeObjetsPris peut potentiellement contenir tous les n objets, donc la complexité d'espace de cette liste est O(n).
En résumé, la complexité de l'algorithme est principalement dominée par la construction de la matrice, ce qui donne une complexité totale de O(nW) en temps et O(nW) en espace.*/
