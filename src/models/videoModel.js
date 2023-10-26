const mongoose = require("mongoose");

const VideoPlaylistSchema = new mongoose.Schema(
  {
    videoLink: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("VideoPlaylist", VideoPlaylistSchema);
