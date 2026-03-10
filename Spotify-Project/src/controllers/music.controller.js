const musicModel = require("../models/music.model.js");
const { uploadFile } = require("../services/storage.service.js");
const albumModel = require("../models/album.model.js");

async function createMusic(req, res) {
  try {
    const { title } = req.body;
    const file = req.file;

    const result = await uploadFile(file.buffer.toString("base64"));

    const music = await musicModel.create({
      uri: result.url,
      title,
      artist: req.user.id,
    });

    res.status(201).json({
      message: "Music created successfully",
      music: {
        id: music._id,
        uri: music.uri,
        title: music.title,
        artist: music.artist,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error creating music",
    });
  }
}

async function createAlbum(req, res) {
  try {
    const { title, musics } = req.body;

    const album = await albumModel.create({
      title,
      artist: req.user.id,
      musics: musics,
    });

    res.status(201).json({
      message: "Album created successfully",
      album: {
        id: album._id,
        title: album.title,
        artist: album.artist,
        musics: album.musics,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error creating album",
    });
  }
}

async function getAllMusics(req, res) {
  const musics = await musicModel.find().skip(1).limit(1).populate("artist", "userName email");

  res.status(200).json({
    message: "Musics fetched successfully",
    musics: musics,
  });
}

async function getAllAlbums(req, res) {
  const albums = await musicModel
    .find()
    .select("title artist")
    .populate("artist", "userName email");

  res.status(200).json({
    message: "Albums fetched successfully",
    albums: albums,
  });
}

async function getAlbumById(req, res) {
  const albumId = req.params.albumId;
  const album = await albumModel
    .findById(albumId)
    .populate("artist", "userName email");

  return res.status(200).json({
    message: "Fetched",
    album: album,
  });
}

module.exports = {
  createMusic,
  createAlbum,
  getAllMusics,
  getAllAlbums,
  getAlbumById,
};
