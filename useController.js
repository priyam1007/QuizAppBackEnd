import Profile from "../models/profileModel.js";
import User from "../models/userModel.js";

export const createUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const newUser = new User({
      username,
      password,
      email,
    });

    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create user", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const user = await User.findOne({ email, password });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to login", error: error.message });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const profile = await User.findById(userId);
    if (!profile) {
      res.status(404).json({ message: "Profile not found" });
      return;
    }
    res.status(200).json(profile);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get user", error: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { quizIds, scores, userId } = req.body;
    const profile = await Profile.findOne({ userId });
    if (!profile) {
      res.status(404).json({ message: "Profile not found" });
      return;
    }
    const updated = await Profile.findOneAndUpdate(
      { userId },
      { quizIds, scores },
      { new: true }
    );

    res.status(200).json(updated);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update user", error: error.message });
  }
};


export const updateQuizzesTaken = async (req, res) => {
  const { quizTitle, difficulty, achievedPoints , userId, totalAnswered, totalQuestions } = req.body;
 // Assuming you have user authentication middleware
  
  try {
    // Find the user by their ID
    const user = await User.findById(userId);

    // Check if the user has already taken a quiz with the same title and difficulty
    const existingQuizIndex = user.quizzesTaken.findIndex(
      quiz => quiz.quizTitle === quizTitle && quiz.difficulty === difficulty
    );

    if (existingQuizIndex !== -1) {
      // If the quiz exists, update the achievedPoints
      user.quizzesTaken[existingQuizIndex].achievedPoints = achievedPoints;
      user.quizzesTaken[existingQuizIndex].totalAnswered = totalAnswered;
      user.quizzesTaken[existingQuizIndex].totalQuestions = totalQuestions;
    } else {
      // If the quiz doesn't exist, add it to the quizzesTaken array
      user.quizzesTaken.push({ quizTitle, difficulty, achievedPoints , totalAnswered, totalQuestions });
    }

    // Save the updated user document
    await user.save();

    res.status(200).json({ message: 'Quizzes taken updated successfully' });
  } catch (error) {
    console.error('Error updating quizzes taken:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to get users", error: error.message });
  }
};