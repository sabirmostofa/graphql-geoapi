const GeoJSON = require("mongoose-geojson-schema");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const unionSchema = new Schema(
  {
    geometry: mongoose.Schema.Types.Point,
    properties: {
      Un_UID: String,
      Divi_name: String,
      Dist_name: String,
      Upaz_name: String,
      Uni_name: String,
      Area_SqKm: Number,
    },
  },
  { collection: "unions" }
);

const unionsingle = mongoose.model("UnionSingle", unionSchema);

module.exports = unionsingle;
