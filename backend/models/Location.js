// models/Location.js
import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema({
  name: String,
  address: String,
  coordinates: {
    lat: Number,
    lng: Number
  },
  details: String
});

const Location = mongoose.model("Location", LocationSchema);
export default Location;
