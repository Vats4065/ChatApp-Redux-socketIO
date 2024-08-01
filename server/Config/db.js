const mongoose = require("mongoose");

const db = () => {
  mongoose
    .connect(
      "mongodb+srv://valglobalia:socket@cluster0.aehch0f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then((res) => console.log("connected"))
    .catch((err) => console.log("errors: " + err));
};


module.exports = db;