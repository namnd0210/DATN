import Mongoose from "mongoose";

const postSchema = Mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String },
  date: { type: Date, default: Date.now },
  role: { type: Number, default: 2 },
});

const PostMessage = Mongoose.model("PostMessage", postSchema);

export default PostMessage;
