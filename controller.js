// import Questions from "../models/questionSchema.js";
import Results from "../models/resultSchema.js";
import { Quiz, Question } from '../models/questionSchema.js';


/** get all questions */
export async function getQuestions(req, res) {
  try {
    const q = await Quiz.find();
    console.log("🚀 ~ getQuestions ~ q:", q)
    res.json(q);
  } catch (error) {
    res.json({ error });
  }
}

export const insertQuestions = async (req, res) => {
  try {
    const { title, difficulty, questions } = req.body;

    const questionInstances = questions.map(question => new Question(question));

    const newQuiz = new Quiz({
      title,
      difficulty,
      questions: questionInstances,
    });

    await newQuiz.save();

    res.status(201).json(newQuiz);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, difficulty, questions } = req.body;

    const questionInstances = questions.map(
      (question) => new Question(question)
    );

    const updatedQuiz = {
      title,
      difficulty,
      questions: questionInstances,
    };

    await Quiz.findByIdAndUpdate(id, updatedQuiz, { new: true });

    res.json({ msg: "Quiz Updated Successfully...!" });
  } catch (error) {
    res.json({ error });
  }
};

export const getSingleQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const quiz = await Quiz.findById(id);
    res.json(quiz);
  } catch (error) {
    res.json({ error });
  }
};


export async function deleteSingleQuiz(req, res) {
  try {
    const { id } = req.params;
    await Quiz.findByIdAndRemove(id);
    res.json({ msg: "Quiz Deleted Successfully...!" });
  } catch (error) {
    res.json({ error });
  }
};
/** Delete all Questions */
export async function dropQuestions(req, res) {
  try {
    await Questions.deleteMany();
    res.json({ msg: "Questions Deleted Successfully...!" });
  } catch (error) {
    res.json({ error });
  }
}

/** get all result */
export async function getResult(req, res) {
  try {
    const r = await Results.find();
    res.json(r);
  } catch (error) {
    res.json({ error });
  }
}

/** post all result */
export async function storeResult(req, res) {
  try {
    const { username, result, attempts, points, achived } = req.body;
    if (!username && !result) throw new Error("Data Not Provided...!");

    Results.create(
      { username, result, attempts, points, achived },
      function (err, data) {
        res.json({ msg: "Result Saved Successfully...!" });
      }
    );
  } catch (error) {
    res.json({ error });
  }
}

/** delete all result */
export async function dropResult(req, res) {
  try {
    await Results.deleteMany();
    res.json({ msg: "Result Deleted Successfully...!" });
  } catch (error) {
    res.json({ error });
  }
}
