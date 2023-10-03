let authToken = "?token=-W4i4-jTjqo6EV4yqzpIubClQr6zSMF7UbOH9ru5iVc"; // Token d'authentification pour réaliser des apples sur l'api

let kingdomTotal = {}; // on créé notre dictionnaire de valeur qui va nous servir a compter le nombre de division par kingdoms
let divKingdoms = {}; // on créé ici un autre dictionnaire pour répertorié toutes les division et leur subkingdom associé.

let divisions = await axios // ici on récupère les données des divisions sur lesquels on boucle pour rentrer leur noms dans notre dictionnaire ainsi qu'une valeur par défaut pour le nombre de plantes
  .get(`https://trefle.io/api/v1/divisions${authToken}`)
  .then(response => response.data)
  .catch(err => console.log(err));
  const divData = divisions.data;
  divData.forEach(div => { // on vient boucler sur chaque division
    divKingdoms[div.name]=div.subkingdom.name;
    if(kingdomTotal[div.subkingdom.kingdom.name] === undefined) { // si le "kingdom" auquel appartient la division n'est pas présente dans notre dictionnaire, on l'ajoute avec un compteur à 1 
        kingdomTotal[div.subkingdom.kingdom.name]=1;
    } else { // sinon on ajoute juste 1 à notre compteur déja existant 
        kingdomTotal[div.subkingdom.kingdom.name]+=1;
    }
  });
  console.log(divKingdoms); // affichage du tableau des subkingdom par division en dur dans la console pour vérifier le résultat
  console.log(kingdomTotal); // affichage du tableau du total de kingdom en dur dans la console pour vérifier le résultat.
let html='<p>Division / SubKingdom :</p>';
// on créé ensuite l'affichage sur notre page HTML des résultats
for (const [key, value] of Object.entries(divKingdoms)) {
    html += `<p>${key} / ${value}</p>`
}
for (const [key, value] of Object.entries(kingdomTotal)) {
    html += `<p>Nombre de division ayant pour "kingdom" -> ${key} : ${value}</p>`
}
// puis on ajoute notre code HTML a notre index.html
let table = document.createElement("div");
table.innerHTML = html;
document.getElementById("table").appendChild(table);