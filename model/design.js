const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const designSchema = new Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Design", designSchema);
