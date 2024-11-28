const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(express.json());
const router = express.Router();

router.get("/characters", async (req, res) => {
  try {
    const key = process.env.MARVEL_API_KEY;

    let limit = 100;

    let filters = "";
    if (req.query.name) {
      filters += `&name=${req.query.name}`;
    }
    if (req.query.limit) {
      limit = req.query.limit;
    }
    if (req.query.page) {
      filters += `&skip=${(req.query.page - 1) * limit}`;
    }
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${key}${filters}&limit=${limit}`
    );
    // console.log(response.data);

    res.status(200).json(response.data);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données Marvel:",
      error.message
    );
    res.status(500).json({ error: "Une erreur est survenue." });
  }
});

module.exports = router;
