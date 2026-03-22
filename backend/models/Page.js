const mongoose = require("mongoose");

const PageSchema = new mongoose.Schema({
  url: String,
  tags: [String],
  timestamp: Number,
  depth: Number
});

module.exports = mongoose.model("Page", PageSchema);