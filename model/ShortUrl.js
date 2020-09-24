const mongoose = require("mongoose");

const shortUrlSchema = new mongoose.Schema({
  longUrl: {
    type: String,
    required: true,
  },
  urlCode: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

const Shorturl = new mongoose.model("shortUrl", shortUrlSchema);

module.exports = Shorturl;
