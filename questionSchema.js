import mongoose from "mongoose";

const { Schema } = mongoose;

const questionSchema = new Schema({
  questionText: {
    type: String,
    required: true,
  },
  options: [
    {
      type: String,
      required: true,
    },
  ],
  answer: {
    type: String,
    required: true,
  },
});

const quizSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: true,
  },
  questions: [questionSchema],
});

const Quiz = mongoose.model("Quiz", quizSchema);
const Question = mongoose.model("Question", questionSchema);

export { Quiz, Question };