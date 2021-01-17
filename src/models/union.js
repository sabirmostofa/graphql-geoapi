const GeoJSON = require("mongoose-geojson-schema");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const unionSchema = new Schema(
  {
    geometry: mongoose.Schema.Types.MultiPolygon,
    properties: {
      Un_ID: Number,
      Divi_name: String,
      Dist_name: String,
      Upaz_name: String,
      Uni_namae: String,
      Area_SqKm: Number,
    },
  },
  { collection: "unionbounds" }
);

const union = mongoose.model("Union", unionSchema);

module.exports = union;
