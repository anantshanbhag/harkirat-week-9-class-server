import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Card, Typography } from "@mui/material";

import { URL } from "../utils/constants";
import { CourseCardPropsT, CoursesT } from "../types";

const CourseCard = ({ course }: CourseCardPropsT) => {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card style={{ margin: 10, width: 300, minHeight: 80 }}>
        <Typography textAlign={"center"} variant="h5">
          {course?.title}
        </Typography>
        <Typography textAlign={"center"}>{course?.description}</Typography>
        <img src={course?.imageLink} />
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 20 }}
        >
          <Button
            variant="contained"
            size="large"
            onClick={() => {
              navigate("/course/" + course._id);
            }}
          >
            Edit
          </Button>
        </div>
      </Card>
    </div>
  );
};

export const Courses = () => {
  const [courses, setCourses] = useState<CoursesT>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data }: { data: { courses: CoursesT } } = await axios.get(
        `${URL}/admin/courses`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setCourses(data?.courses);
    };

    fetchData();
  }, []);

  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {courses.map((course, index) => (
        <CourseCard course={course} key={index} />
      ))}
    </div>
  );
};
