const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const siteSchema = new Schema({
  promotion: {
    required: true,
    type: Array,
    default: []
  },
  siteInfo: {
    required: true,
    type: Array,
    default: []
  }
});

const Site = mongoose.model("Site", siteSchema);

module.exports = Site;
