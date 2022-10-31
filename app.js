const express = require("express"); //import express
const app = express();

//importons les pilotes mysql et myconnection
const mysql = require("mysql");
const myConnection = require("express-myconnection");
const connection = require("express-myconnection");

//Declarons notre objet qui va contenir les informations de connexion à la base de donnée
const optionBd = {
  host: "localhost",
  user: "root",
  password: "",
  port: 3308,
  database: "Noes_bd",
};

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
app.set("view engine", "ejs");
app.set("views", "IHM"); //Definition du dossier où nos fichier ejs se trouve "IHM" pour notre cas. si notre dossier était nomé views, on ne pouvait meme pas taper cette commande

// //definition des routes
// app.get('/', (req, res) =>{     //envoie de la requête avec la méthode get
//     const heureConnecter = Date().toString() //declaration d'une variable qui va afficher l'heure connecter dans notre page index
//     const tab = [
//         {titre: "Creation contenu de la liste", desc: "Création de moteur d'affiche ejs"},
//         {titre: "Programmation web", desc: "Comment devenir un programmeur web full stack"}
//     ]
//     res.status(200).render("index", {heureConnecter, tab});   //renvoie de la reponse qui est la page index.html dans notre cas
//     })

//     app.get('/apropos', (req, res) =>{     //envoie de la requête avec la méthode get
//         res.status(200).render("apropos");   //renvoie de la reponse qui est la page appropos.html dans notre cas
//     })

//     app.use((req, res) =>{     //envoie de la requête avec la fonction middleware(sinon)
//         res.status(404).render("erreur");   //renvoie de la reponse qui est la page erreur.html dans notre cas
//     })

// DataBase 'GET method' : affichage de resultat se trouvant dans la base de données
//Definitions du middleware
app.use(myConnection(mysql, optionBd, "pool"));
app.get("/", (req, res) => {
  req.getConnection((erreur, connection) => {
    if (erreur) {
      console.log(erreur);
    } else {
      connection.query("SELECT * FROM notes", [], (erreur, resultat) => {
        if (erreur) {
          console.log(erreur);
        } else {
          res.status(200).render("index", { resultat });
        }
      });
    }
  });
});

//DataBase 'POST method' : Ajout et modification de données de la base de données
// app.use(express.urlencoded({ extended: false }));
// app.post("/notes", (req, res) => {
//   let id = req.body.id === "" ? null : req.body.id; //condition ternaire pour l'affectation de l'id
//   let titre = req.body.titre; //declaration titre
//   let description = req.body.description; //declaration description

//   // variable qui va nous aider d'envoyer une requête d'ajout ou de modification selon le besoin de l'utilisateur
//   let reqSql =
//     id === null
//       ? "INSERT INTO notes(id, titre, description) VALUES (?, ?, ?)"
//       : "UPDATE notes SET titre = ?, description = ? WHERE id = ? ";
//   //Gestion d'ajout ou de modification dès que l'utilisateur clique sur le bouton enregistrer
//   let donnees =
//     id === "" ? [null, titre, description] : [titre, description, id];

//   req.getConnection((erreur, connection) => {
//     if (erreur) {
//       console.log(erreur);
//     } else {
//       connection.query(reqSql, donnees, (erreur, resultat) => {
//         if (erreur) {
//           console.log(erreur);
//         } else {
//           res.status(300).redirect("/");
//         }
//       });
//     }
//   });
// });

// DataBase 'POST method' : ajout & modification de données dans la base de base
// Definitions du middleware
app.use(express.urlencoded({extended: false}));
app.post("/notes", (req, res) => {
    let id = req.body.id === "" ? null : req.body.id;
    console.log(req.body.id);
    let titre = req.body.titre ;         //declaration titre
    let description = req.body.description ;  //declaration description

    req.getConnection((erreur, connection) => {
      if (erreur) {
        console.log(erreur);
      } else {
        connection.query
        (id === null
                  ? "INSERT INTO notes(titre, description) VALUES (?, ?)"
                  : "UPDATE notes SET titre = ?, description = ? WHERE id = ? ",
         id === "" ? [null, titre, description] : [titre, description, id],
        (erreur, resultat) => {
          if (erreur) {
            console.log(erreur);
          } else {
            res.status(300).redirect("/");
          }
        });
      }
    });
});


//DataBase 'Delete method' : suppression de données de la base de données
app.use(express.urlencoded({ extended: false }));
app.delete("/notes/:id", (req, res) => {
  let id = req.params.id; //id de l'élément à supprimer

  req.getConnection((erreur, connection) => {
    if (erreur) {
      console.log(erreur);
    } else {
      connection.query(
        "DELETE FROM notes WHERE id=?",
        [id],
        (erreur, resultat) => {
          if (erreur) {
            console.log(erreur);
          } else {
            res.status(200).json({ routeRacine: "/" });
          }
        }
      );
    }
  });
});


//créatios du serveur pour écouter écoute les requête
app.listen(3001);
console.log("En attente des requêtes au port 3001");
