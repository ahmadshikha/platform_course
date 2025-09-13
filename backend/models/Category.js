// models/Category.js
import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  nameEn: { type: String, required: true },
  description: { type: String },
  descriptionEn: { type: String }
});

const Category = mongoose.model("Category", CategorySchema);
export default Category;
