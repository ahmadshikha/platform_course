// models/Tag.js
import mongoose from "mongoose";

const TagSchema = new mongoose.Schema({
  name: String
});

const Tag = mongoose.model("Tag", TagSchema);
export default Tag;
