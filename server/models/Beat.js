const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const beatSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: 1,
      maxlength: 100
    },
    description: {
      type: String,
      required: true,
      maxlength: 999
    },
    price: {
      type: Number,
      required: true,
      maxlength: 255
    },
    sold: {
      type: Number,
      maxlength: 255,
      default: 0
    },
    genre: {
      type: Schema.Types.ObjectId,
      ref: "Genre",
      required: true
    },
    artist: {
      type: Schema.Types.ObjectId,
      ref: "Artist",
      required: true
    },
    images: {
      type: Array,
      default: []
    }
  },
  { timestamps: true }
);

const Beat = mongoose.model("Beat", beatSchema);

module.exports = Beat;
