// The GraphQL schema in string form

const union = require("./models/union.js");
const typeDefs = `
  type Query {
    books: [Book]
    data: Union
    book: SingleBook
    rgeocode(lat: Float, lng:Float):Union
    nearest(lat: Float, lng:Float):Union
    getPlusCode(lat: Float, lng:Float):PlusCode
    getReverse(code: String!, union:String, district: String):[Float]
  }
  type PlusCode{
      full:String!
      short:String
  }
  type Union {
    properties: Props
  }

  type Props{
    Un_UID: String
    Dist_name: String,
    Divi_name: String,
    Upaz_name: String,
    Uni_name: String,
    Area_SqKm: Float,
    coords:[Float]
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
