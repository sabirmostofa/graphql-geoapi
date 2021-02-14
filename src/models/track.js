const mongoose = require("mongoose");
const { Schema } = mongoose;

const trackSchema = new Schema(
  {
    user: String,
    avgSpeedInKMH: Number,
    distanceInMeters: Number,
    points: [[Number]],
    timeInMillis: Number,
    timestamp: Number,
  },
  { collection: "tracks" }
);

const track = mongoose.model("Track", trackSchema);
module.exports = track;
