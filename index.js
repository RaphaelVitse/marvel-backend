const express = require("express");
const axios = require("axios");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const charactersRouter = require("./routes/characters");
const comicsRouter = require("./routes/comics");

app.get("/", (req, res) => {
  res.status(200).json({ Message: "Bienvenue sur le serveur Marvel" });
});
////////////////CHARACTERS////////////////////////////
// Route pour récupérer les personnages Marvel
app.use(charactersRouter);

////////////////COMICS////////////////////////////
// route pour recuperer les comics
app.use(comicsRouter);

app.all("*", (req, res) => {
  res.status(404).json({ message: "Page not found" });
});
app.listen(process.env.PORT, () => {
  console.log(`Serveur Marvel started 🚀 `);
});
