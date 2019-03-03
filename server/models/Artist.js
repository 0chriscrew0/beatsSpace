const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const artistSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: 1,
    maxlength: 100
  }
});

const Artist = mongoose.model("Artist", artistSchema);

module.exports = Artist;
