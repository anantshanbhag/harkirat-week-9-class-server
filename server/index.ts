import express, { json, Request, Response } from "express";
import { connect } from "mongoose";
import cors from "cors";
import path from "path";

import adminAuthRouter from "./routes/admin/auth.js";
import adminCourseRouter from "./routes/admin/course.js";

import userAuthRouter from "./routes/user/auth.js";
import userCourseRouter from "./routes/user/course.js";

const app = express();

app.use(cors());
app.use(json());

app.use("/admin", adminAuthRouter, adminCourseRouter);
app.use("/user", userAuthRouter, userCourseRouter);

app.use(express.static("public"));
app.use("/*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// Connect to MongoDB
const connectionString =
  "mongodb+srv://anants888:o2CO0m2UxCqf5d6L@cluster0.7otij2p.mongodb.net";
const dBName = "courses";
connect(`${connectionString}/${dBName}`);

app.listen(3000, () => console.log("Server running on port 3000"));
