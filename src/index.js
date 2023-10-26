const express = require("express");
const mongoose = require("mongoose");
const route = require("./routes/route");

const app = express();
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://sarwjeet:96568437528p@cluster0.37xdw2i.mongodb.net/",
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Connected on Port ${PORT}`);
});

app.use("/", route);
