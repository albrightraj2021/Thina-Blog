import mongoose from "mongoose";
import Blog from "./Blog.js";
const commentSchema = new mongoose.Schema({
 blog:{
    type: mongoose.Schema.Types.ObjectId,
    ref: Blog,
    required: true,
  },
  name: {
    type: String,
    ref: "name",
    required: true,
  },
  content: {
    type: String,
    ref: "content",
    required: true,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
 
}, {
  timestamps: true,
});
const Comment = mongoose.model("Comment", commentSchema);
export default Comment;