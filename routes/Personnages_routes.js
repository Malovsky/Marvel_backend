const express = require("express");
const axios = require("axios");

const router = express.Router();
module.exports = router;

router.get("/personnages", async (req, res) => {
  try {
    const name = req.query.name ? req.query.name : "";
    const limit =
      req.query.limit && req.query.limit < 101 ? req.query.limit : 100;
    const page = req.query.page ? req.query.page : 1;
    const skip = limit * (page - 1);

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?name=${name}&page=${page}&limit=${limit}&skip=${skip}&apiKey=${process.env.API_KEY_MARVEL}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({
      error: {
        error: error.message,
      },
    });
  }
});

router.get("/personnage/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${req.params.id}?apiKey=${process.env.API_KEY_MARVEL}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({
      error: {
        message: error.message,
      },
    });
  }
});
