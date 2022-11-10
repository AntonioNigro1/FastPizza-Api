import mongoose from "mongoose";
const { Schema } = mongoose;

const adSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  imagePath: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    min: 10,
  },
  ingredients: {
    type: [String],
    required: true,
    min: 6,
  },
  price: {
    type: Number,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
    required: false,
  },
  comments: [
    {
      comment: String,
      likes: { type: Number, default: 0 },
    },
  ],
});

module.exports = mongoose.model("Ad", adSchema);
