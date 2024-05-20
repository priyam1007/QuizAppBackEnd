
import mongoose from "mongoose";
const { Schema } = mongoose;

const quizTakenSchema = new Schema({
  quizTitle: { type: String },
  difficulty: { type: String },
  achievedPoints: { type: Number },
  totalAnswered: { type: Number },
  totalQuestions: { type: Number },
});

const userModel = new Schema({
  username: { type: String },
  password: { type: String },
  email: { type: String },
  createdAt: { type: Date, default: Date.now },
  quizzesTaken: [quizTakenSchema], // Array of quizzes taken by the user
});

export default mongoose.model("user", userModel);
