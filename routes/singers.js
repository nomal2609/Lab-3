// Naming convention > controllers/routers are plural
const express = require("express");
const router = express.Router();
const Singer = require("../models/singer");
const Song = require("../models/song");
const AuthenticationMiddleware = require("../extensions/authentication");

// GET /singers/
router.get("/", async (req, res, next) => {
  // Retrieve ALL singers, sorted by name
  let singers = await Singer.find().sort([["singerName", "ascending"]]);
  res.render("singers/index", {
    title: "Singer Tracker",
    dataset: singers,
    user: req.user,
  });
});

// GET /singers/add
router.get("/add", AuthenticationMiddleware, async (req, res, next) => {
  let songList = await Song.find().sort([["name", "ascending"]]);
  res.render("singers/add", {
    title: "Add a New Singer",
    songs: songList,
    user: req.user,
  });
});

// POST /singers/add
router.post("/add", AuthenticationMiddleware, async (req, res, next) => {
  let newSinger = new Singer({
    song: req.body.song,
    singerName: req.body.singerName,
    lyricistName: req.body.lyricistName,
    views: req.body.views,
  });
  await newSinger.save();
  res.redirect("/singers");
});

// GET /singers/delete/:_id
router.get("/delete/:_id", AuthenticationMiddleware, async (req, res, next) => {
  let singerId = req.params._id;
  await Singer.findByIdAndRemove({ _id: singerId });
  res.redirect("/singers");
});

// GET /singers/edit/:_id
router.get("/edit/:_id", AuthenticationMiddleware, async (req, res, next) => {
  let singerId = req.params._id;
  let singerData = await Singer.findById(singerId);
  let songList = await Song.find().sort([["name", "ascending"]]);
  res.render("singers/edit", {
    title: "Edit Singer Info",
    singer: singerData,
    songs: songList,
    user: req.user,
  });
});

// POST /singers/edit/:_id
router.post("/edit/:_id", AuthenticationMiddleware, async (req, res, next) => {
  let singerId = req.params._id;
  await Singer.findByIdAndUpdate(
    { _id: singerId },
    {
      song: req.body.song,
      singerName: req.body.singerName,
      lyricistName: req.body.lyricistName,
      views: req.body.views,
    }
  );
  res.redirect("/singers");
});

// Export router object
module.exports = router;
