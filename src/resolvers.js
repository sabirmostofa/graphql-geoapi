const { model } = require("mongoose");
const books = require("./models/books.js");
const union = require("./models/union.js");
const book = require("./models/bookParent.js");

// The resolvers

console.log(book);

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
  },
};

module.exports = resolvers;
