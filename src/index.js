require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");

const mongoose = require("mongoose");

const resolvers = require("./resolvers.js");
const typeDefs = require("./typeDefs.js");

const union = require("./models/union");

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

  // The GraphQL endpoint
  app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));

  // GraphiQL, a visual editor for queries
  app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

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
