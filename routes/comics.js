const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(express.json());
const router = express.Router();

router.get("/comics", async (req, res) => {
  try {
    const key = process.env.MARVEL_API_KEY;
    let limit = 100;

    let filters = "";
    if (req.query.title) {
      filters += `&title=${req.query.title}`;
    }
    if (req.query.limit) {
      limit = req.query.limit;
    }
    if (req.query.page) {
      filters += `&skip=${(req.query.page - 1) * limit}`;
    }

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${key}${filters}&limit=${limit}`
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données Marvel:",
      error.message
    );
    res.status(500).json({ error: "Une erreur est survenue." });
  }
});

router.get("/comics/:characterId", async (req, res) => {
  console.log(req.params);
  const key = process.env.MARVEL_API_KEY;
  try {
    const response = await axios.get(
      "https://lereacteur-marvel-api.herokuapp.com/comics/" +
        req.params.characterId +
        "?apiKey=" +
        key
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error(`Erreur: ${error.message}`);
    res.status(500).json({ error: "Une erreur est survenue." });
  }
});

module.exports = router;
