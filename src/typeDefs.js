// The GraphQL schema in string form

const union = require("./models/union.js");
const typeDefs = `
  type Query {
    books: [Book]
    data: Union
    book: SingleBook
  }
  type Union {
    properties: Props
  }

  type Props{
    Dist_name: String,
    Divi_name: String,
    Upaz_name: String,
    Uni_name: String,
    Area_SqKm: Float
  }


  type SingleBook{
      chapter: Chapter
  }

  type Chapter{
      first_chapter: Int
  }


  type Book {
    title: String  
  }

`;

module.exports = typeDefs;
