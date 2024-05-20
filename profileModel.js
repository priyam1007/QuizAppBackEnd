import mongoose from "mongoose";
const { Schema } = mongoose;

const profileModel = new Schema({
  userId: { type: String },
  quizIds: { type: Array, default: [] },
  scores: { type: Array, default: [] },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("profile", profileModel);
