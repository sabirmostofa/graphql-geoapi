const { model } = require("mongoose");
const books = require("./models/books.js");
const union = require("./models/union.js");
const unionsingle = require("./models/unionSingle.js");
const book = require("./models/bookParent.js");
const ol = require("../node_modules/open-location-code/openlocationcode.js");

// The resolvers

function getPlaceLatLng(union, district, callback) {
  console.log(union, district);
  unionsingle.findOne(
    {
      "properties.Uni_name": union,
      "properties.Dist_name": district,
    },
    {},
    (err, res) => {
      console.log(res);
      callback(res.geometry.coordinates);
    }
  );
}

async function getNearestArea(args, callback) {
  var toReturn;
  var result = await union.findOne(
    {
      geometry: {
        $geoIntersects: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(args.lng), parseFloat(args.lat)],
          },
        },
      },
    },
    "properties"
  );

  const res = await unionsingle.findOne({
    "properties.Uni_name": result.properties.Uni_name,
    "properties.Upaz_name": result.properties.Upaz_name,
  });

  toReturn = result;
  toReturn.properties.coords = res.geometry.coordinates;
  //console.log(toReturn);

  //result.properties.coords = res.geometry.coordinates;

  //console.log(result, res);
  return toReturn;
}

const resolvers = {
  Query: {
    data: async () => {
      var value;
      await union.findOne(
        {
          geometry: {
            $geoIntersects: {
              $geometry: {
                type: "Point",
                coordinates: [90, 22],
              },
            },
          },
        },
        "properties",
        function (err, result) {
          value = result;
        }
      );
      return value;
    },

    books: () => books,

    book: () => book,
    async rgeocode(parent, args, contex, info) {
      return getNearestArea(args);
    },
    async getPlusCode(parent, args, contex, info) {
      toReturn = {};
      toReturn = await getNearestArea(args).then((uni) => {
        console.log("printin from get plus code");
        console.log(uni);

        const olc = new ol.OpenLocationCode();
        var code = olc.encode(parseFloat(args.lat), parseFloat(args.lng), 10);
        var shortCode = olc.shorten(
          code,
          uni.properties.coords[1],
          uni.properties.coords[0]
        );

        shortCode +=
          " " + uni.properties.Uni_name + " " + uni.properties.Dist_name;

        toReturn = { full: code, short: shortCode };
        console.log(toReturn);
        return toReturn;
      });

      return toReturn;
    },

    getReverse(parent, args, contex, info) {
      const code = args.code,
        union = args.union,
        district = args.district;

      const olc = new ol.OpenLocationCode();

      var toReturN;

      if (union == null || district == null || code.length == 11) {
        const coord = olc.decode(code);
        return [coord.latitudeCenter, coord.longitudeCenter];
      }

      getPlaceLatLng(union, district, (latlng) => {
        console.log(latlng);

        var recover = olc.recoverNearest(code, latLng[1], latLng[0]);
        var coord = olc.decode(recover);
        toReturn = [coord.latitudeCenter, coord.longitudeCenter];
      });

      return toReturN;
    },

    /*
    Might be useful in future
    */

    async nearest(paret, args, contex, info) {
      var val;
      console.log(args);

      await unionsingle.findOne(
        {
          geometry: {
            $near: {
              $geometry: {
                type: "Point",
                coordinates: [parseFloat(args.lng), parseFloat(args.lat)],
              },
              $minDistance: 0,
              $maxDistance: 15000,
            },
          },
        },
        "properties",
        function (err, result) {
          val = result;
          console.log(result);
        }
      );
      return val;
    },
  },
};

module.exports = resolvers;
