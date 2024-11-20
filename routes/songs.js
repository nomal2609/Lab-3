const express = require("express");
const router = express.Router();
const Song = require("../models/song");
const AuthenticationMiddleware = require("../extensions/authentication");

// GET /songs/
router.get("/", AuthenticationMiddleware, async (req, res, next) => {
  let songs = await Song.find().sort([["name", "ascending"]]);
  res.render("songs/index", { title: "Song List", dataset: songs, user: req.user });
});

// GET /songs/add
router.get("/add", AuthenticationMiddleware, (req, res, next) => {
  res.render("songs/add", { title: "Add a New Song", user: req.user });
});

// POST /songs/add
router.post("/add", AuthenticationMiddleware, async (req, res, next) => {
  let newSong = new Song({
    name: req.body.name,
    releaseDate: req.body.releaseDate,
    language: req.body.language,
    genre: req.body.genre,
    views: req.body.views,
  });
  await newSong.save();
  res.redirect("/songs");
});

module.exports = router;
