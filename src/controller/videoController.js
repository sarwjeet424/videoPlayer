const videoModel = require("../models/videoModel");

const addPlaylistVideo = async (req, res) => {
  try {
    const { videoLink } = req.body;

    if (!videoLink)
      return res
        .status(404)
        .send({ status: false, message: "video is required" });

    const addVideo = await videoModel.create({ videoLink });
    return res.status(201).send({ status: true, data: addVideo });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

const getPlaylistVideos = async (req, res) => {
  try {
    const getVidoes = await videoModel.find({ isDeleted: false });
    return res.status(200).send({ status: true, data: getVidoes });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

module.exports = { addPlaylistVideo, getPlaylistVideos };
