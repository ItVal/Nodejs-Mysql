const express = require('express'); //import express
const app = express();

// definition de route
app.get('/', (req, res) =>{     //envoie de la requête avec la méthode get
    res.status(200).sendFile("./IHM/index.html", {root: __dirname})   //renvoie de la reponse qui est la page index.html dans notre cas
})

app.get('/apropos', (req, res) =>{     //envoie de la requête avec la méthode get
    res.status(200).sendFile("./IHM/apropos.html", {root: __dirname})   //renvoie de la reponse qui est la page appropos.html dans notre cas
})

app.use((req, res) =>{     //envoie de la requête avec la fonction middleware(sinon)
    res.status(404).sendFile("./IHM/erreur.html", {root: __dirname})   //renvoie de la reponse qui est la page erreur.html dans notre cas
})



//créatios du serveur pour écouter écoute les requête
app.listen(3001)
console.log("En attente des requêtes au port 3001")