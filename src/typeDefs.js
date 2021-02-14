// The GraphQL schema in string form

const union = require("./models/union.js");
const typeDefs = `
  type Query {
    data: Union
    rgeocode(lat: Float, lng:Float):Union
    nearest(lat: Float, lng:Float):Union
    getPlusCode(lat: Float, lng:Float):PlusCode
    getReverse(code: String!, union:String, district: String):[Float]
    tracks:[Track]
  }

  type Mutation { 
    createTrack ( data: TrackData):CreateResponse


    login(email: String): User
        
  }

  type CreateResponse{
    _id: String
  }

  type PlusCode{
      full:String!
      short:String
  }
  type Union {
    properties: Props
  }

  type User{
    email: String!
  }

  input TrackData  {
    user: String,
    avgSpeedInKMH: Float,
    distanceInMeters: Float,
    points: [[Float]],
    timeInMillis: Int,
    timestamp: Int,
  }

  type Track{
    user: String,
    avgSpeedInKMH: Float,
    distanceInMeters: Float,
    points: [[Float]],
    timeInMillis: Int,
    timestamp: Int,
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




`;

module.exports = typeDefs;
