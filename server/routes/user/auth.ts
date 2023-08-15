import { Router } from "express";

import { UserModel, CourseModel } from "../../db/index.js";
import { generateJwtUser, authenticateUser } from "../../middleware/auth.js";
import type { UserT } from "../../types";

const router = Router();

// logic to sign up user
router.post("/signup", async (req, res) => {
  const { username, password } = req.body as UserT;

  if (!username || !password) {
    return res
      .status(404)
      .send({ error: "username & password mandatory to signup" });
  }

  const foundUser = await UserModel.findOne({ username });
  if (foundUser) {
    return res.status(403).json({ message: "User already exists" });
  }

  const newUser = { username, password } as UserT;
  const userModel = new UserModel({ username, password });
  await userModel.save();
  const token = generateJwtUser(newUser);
  res.json({ message: "User created successfully", token });
});

// logic to log in user
router.post("/login", async (req, res) => {
  const { username, password } = req.headers as UserT;

  if (!username || !password) {
    return res
      .status(404)
      .send({ error: "username & password mandatory to signup" });
  }

  const foundUser = await UserModel.findOne({ username, password });
  if (!foundUser) {
    return res.status(403).send({ error: "Invalid username or password" });
  }

  const token = generateJwtUser({ username });
  res.send({ message: "Logged in successfully", token });
});

// logic to list all courses
router.get("/courses", authenticateUser, async (_, res) => {
  const courses = CourseModel.find({ published: true });
  res.json({ courses });
});

// logic to purchase a course
router.post("/courses/:courseId", authenticateUser, async (req, res) => {
  const username = req.headers.username as string;
  const { courseId } = req.params;

  const currentUser = await UserModel.findOne({ username });
  if (!currentUser) {
    return res.status(403).json({ message: "User not found in dB" });
  }

  const foundCourse = await CourseModel.findById(courseId);
  if (!foundCourse) {
    return res.status(404).json({ message: "Course not found in dB" });
  }

  currentUser.purchasedCourses.push(foundCourse._id);
  await currentUser.save();
  res.json({
    message: "Course purchased successfully for: " + username,
  });
});

// logic to view purchased courses
router.get("/purchasedCourses", authenticateUser, async (req, res) => {
  const { username } = req.headers;

  const currentUser = await UserModel.findOne({ username }).populate(
    "purchasedCourses"
  );
  const purchasedCourses = currentUser?.purchasedCourses || [];
  res.json({ purchasedCourses });
});

export default router;
