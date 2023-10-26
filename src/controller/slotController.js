const slotModel = require("../models/slotModel");
const { ValidateEmail } = require("../validator/validator");

const createSlot = async (req, res) => {
  try {
    let data = req.body;
    if (Object.keys(data).length === 0)
      return res
        .status(400)
        .send({ status: false, message: "request body cann't be empty" });

    if (!ValidateEmail(data.email))
      return res.status(400).send({ status: false, message: "invalid email" });

    const getSlotBookings = await slotModel.findOne({
      email: data.email,
      isDeleted: false,
    });

    if (getSlotBookings)
      return res
        .status(400)
        .send({ status: false, message: "email already exists" });

    const getTime = data.time.split(":");
    if (Number(data.time) > 23 || Number(getTime[0]) < 0)
      return res.status(400).send({
        status: false,
        message: "Time format must be between 1 to 24",
      });

    const checkStoreSlot = await slotModel.findOne({
      time: data.time,
      date: data.date,
      isDeleted: false,
    });

    if (checkStoreSlot)
      return res.status(400).send({
        status: false,
        message: "this slot is already booked",
      });

    const bookSlot = await slotModel.create(data);
    return res.status(201).send({ status: true, data: bookSlot });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

const bookSlots = async (req, res) => {
  try {
    const getBookSlots = await slotModel.find({ isDeleted: false });
    return res.status(200).send({ status: true, data: getBookSlots });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

const remainingSlots = async (req, res) => {
  try {
    const date = req.query.date;
    if (!date)
      return res.status(400).send({
        status: false,
        message: "date is required in query params",
      });
    const getBookedSlots = await slotModel.find({ date, isDeleted: false });
    let arr = [
      "00:00",
      "01:00",
      "02:00",
      "03:00",
      "04:00",
      "05:00",
      "06:00",
      "07:00",
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
      "20:00",
      "21:00",
      "22:00",
      "23:00",
    ];
    getBookedSlots.map((el) => {
      arr = arr.filter((item) => item != el.time);
    });

    return res
      .status(200)
      .send({ status: true, Slots: { date, remainingTimeSlots: arr } });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

const availableSlots = async (req, res) => {
  try {
    const date = req.query.date;
    if (!date)
      return res.status(400).send({
        status: false,
        message: "date is required in query params",
      });
    const getBookedSlots = await slotModel
      .find({ date, isDeleted: false })
      .select({ videoLink: 1, date: 1, time: 1, _id: 0 })
      .sort({ time: 1 });
    return res.status(200).send({ status: true, data: getBookedSlots });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

module.exports = { createSlot, bookSlots, remainingSlots, availableSlots };
