import mongoose from "mongoose";
import User from "../models/userModel.js";
const usersController = {};

// GET all users
usersController.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET user by id
usersController.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "Cannot find user" });
    }
    res.json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// GET single user by user_id
usersController.getUserByUserId = async (req, res) => {
  const userId = req.auth.payload.sub;
  try {
    const user = await User.findOne({ userId: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST new user
usersController.addUser = async (req, res) => {
  const user = new User(req.body);
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT update user
usersController.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { userId: req.params.userId },
      req.body,
      { new: true }
    );
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE user
usersController.deleteUser = async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.userId });
    if (user) {
      await User.deleteOne({ userId: req.params.userId });
      res.json({ message: "Deleted user" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// DELETE my
usersController.deleteSelf = async (req, res) => {
  const userId = req.auth.payload.sub;
  try {
    const user = await User.findOne({ userId: userId });
    if (user) {
      await User.deleteOne({ userId: userId });
      res.json({ message: "Deleted user" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default usersController;
