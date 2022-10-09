const express = require('express'); //import express
const app = express();


// // definition de route
// app.get('/', (req, res) =>{     //envoie de la requête avec la méthode get
//     res.status(200).sendFile("./IHM/index.html", {root: __dirname})   //renvoie de la reponse qui est la page index.html dans notre cas
// })

// app.get('/apropos', (req, res) =>{     //envoie de la requête avec la méthode get
//     res.status(200).sendFile("./IHM/apropos.html", {root: __dirname})   //renvoie de la reponse qui est la page appropos.html dans notre cas
// })

// app.use((req, res) =>{     //envoie de la requête avec la fonction middleware(sinon)
//     res.status(404).sendFile("./IHM/erreur.html", {root: __dirname})   //renvoie de la reponse qui est la page erreur.html dans notre cas
// })

//definition du moteur d'affichage
app.set('view engine', 'ejs')   
app.set('views', 'IHM')  //Definition du dossier où nos fichier ejs se trouve "IHM" pour notre cas. si notre dossier était nomé views, on ne pouvait meme pas taper cette commande

//definition des routes
app.get('/', (req, res) =>{     //envoie de la requête avec la méthode get
    const heureConnecter = Date().toString() //declaration d'une variable qui va afficher l'heure connecter dans notre page index
    const tab = [
        {titre: "Creation contenu de la liste", desc: "Création de moteur d'affiche ejs"},
        {titre: "Programmation web", desc: "Comment devenir un programmeur web full stack"}
    ]
    res.status(200).render("index", {heureConnecter, tab});   //renvoie de la reponse qui est la page index.html dans notre cas
    })
    
    app.get('/apropos', (req, res) =>{     //envoie de la requête avec la méthode get
        res.status(200).render("apropos");   //renvoie de la reponse qui est la page appropos.html dans notre cas
    })
    
    app.use((req, res) =>{     //envoie de la requête avec la fonction middleware(sinon)
        res.status(404).render("erreur");   //renvoie de la reponse qui est la page erreur.html dans notre cas
    })


//créatios du serveur pour écouter écoute les requête
app.listen(3001)
console.log("En attente des requêtes au port 3001")