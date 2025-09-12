// models/News.js
import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema({
  title: String,
  content: String,
  category: String,
  eventDate: Date,
  imageURL: String
});

const News = mongoose.model("News", NewsSchema);
export default News;
