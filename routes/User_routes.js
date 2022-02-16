const express = require("express");
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBased64 = require("crypto-js/enc-base64");

const User = require("../models/User");

const router = express.Router();
module.exports = router;

const salt = uid2(16);

router.post("/user/signup", async (req, res) => {
  try {
    const isUserExisting = await User.findOne({ email: req.fields.email });

    if (isUserExisting !== null) {
      res.status(400).json({
        error: {
          message: "Un compte existe déjà avec cet email.",
        },
      });
    } else if (req.fields.email === null || req.fields.password === null) {
      res.status(400).json({
        error: {
          message:
            "Vous n'avez pas renseigné tous les champs demandés lors de l'inscription.",
        },
      });
    } else {
      const newToken = uid2(16);
      const hash = SHA256(req.fields.password + salt).toString(encBased64);
      const newTab = [];
      const newUser = new User({
        email: req.fields.email,
        favCharacters: newTab,
        favComics: newTab,
        token: newToken,
        hash: hash,
        salt: salt,
      });
      await newUser.save();
      res.status(200).json({
        _id: newUser._id,
        email: req.fields.email,
        token: newUser.token,
      });
    }
  } catch (error) {
    res.status(400).json({
      error: {
        error: error.message,
      },
    });
  }
});

router.post("/user/login", async (req, res) => {
  try {
    const userToLog = await User.findOne({ email: req.fields.email });
    if (userToLog === null) {
      res.status(400).json({
        error: {
          message: "Vos identifiants ne sont pas bons.1",
        },
      });
    } else if (
      userToLog !== null &&
      SHA256(req.fields.password + userToLog.salt).toString(encBased64) !==
        userToLog.hash
    ) {
      res.status(400).json({
        error: {
          message: "Vos identifiants ne sont pas bons.2",
        },
      });
    } else if (
      userToLog !== null &&
      SHA256(req.fields.password + userToLog.salt).toString(encBased64) ===
        userToLog.hash
    ) {
      res.status(200).json({
        _id: userToLog._id,
        token: userToLog.token,
        favCharacters: userToLog.favCharacters,
        favComics: userToLog.favComics,
      });
    }
  } catch (error) {
    res.status(400).json({
      error: {
        error: error.message,
      },
    });
  }
});
