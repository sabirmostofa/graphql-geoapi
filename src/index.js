require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");
const path = require("path");

const mongoose = require("mongoose");

const resolvers = require("./resolvers.js");
const typeDefs = require("./typeDefs.js");

const union = require("./models/union");
const cors = require("cors");

const PORT = 3001;

const startSertver = async () => {
  await mongoose.connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Put together a schema
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  // Initialize the app
  const app = express();

  //user cors
  app.use(cors());
  // The GraphQL endpoint
  app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));

  // GraphiQL, a visual editor for queries
  app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

  // serve static files
  // Serve static assets if in production

  /*
  if (nodeToString.env == "production") {
    // Set static folder
    // All the javascript and css files will be read and served from this folder
    app.use(express.static("../client/public"));

    // index.html for all page routes    html or routing and naviagtion
    app.get("*", (req, res) => {
      res.sendFile(
        path.resolve(__dirname, "../client", "public", "index.html")
      );
    });
  }

  */

  // Start the server
  app.listen(process.env.PORT || PORT, () => {
    console.log("Go to http://localhost:3001/graphiql to run queries!");
  });
};

startSertver();

//working query
/*
union.findOne(
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
  (err, props) => console.log(props)
);

*/
