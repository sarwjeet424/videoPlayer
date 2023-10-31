const express = require("express");
const router = express.Router();

const {
  addPlaylistVideo,
  getPlaylistVideos,
} = require("../controller/videoController");
const {
  createSlot,
  allBookSlots,
  bookedSlots,
  availableSlots,
} = require("../controller/slotController");

//------------------------- VideoPlaylist APIS ----------------------//
router.post("/addVideo", addPlaylistVideo);
router.get("/getVideoPlaylist", getPlaylistVideos);

//------------------------- Slot APIS -------------------------------//
router.post("/slotBooking", createSlot);
router.get("/allBookedSlots", allBookSlots);
router.get("/availableSlots", availableSlots);
router.get("/bookedSlots", bookedSlots);

//------------------------- Not Found API ---------------------------//
router.all("/*", function (req, res) {
  return res.status(404).send({ status: false, message: "Page Not Found" });
});

module.exports = router;
