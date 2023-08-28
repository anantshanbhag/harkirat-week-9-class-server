import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import axios from "axios";
import { Grid, Button, TextField, Card, Typography } from "@mui/material";

import { URL } from "../utils/constants";
import { courseMetaState } from "../store/atoms/course";
import {
  courseDetailsState,
  courseTitleState,
  isCourseLoadingState,
} from "../store/selectors/course";
import { CourseT } from "../types";

const GrayTopper = () => {
  const title = useRecoilValue(courseTitleState);

  return (
    <div
      style={{
        height: 250,
        background: "#212121",
        top: 0,
        width: "100vw",
        zIndex: 0,
        marginBottom: -250,
      }}
    >
      <div
        style={{
          height: 250,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          style={{ color: "white", fontWeight: 600 }}
          variant="h3"
          textAlign={"center"}
        >
          {title}
        </Typography>
      </div>
    </div>
  );
};

const CourseCard = () => {
  const course = useRecoilValue(courseDetailsState);

  if (!course) {
    return <>{"Course not found"}</>;
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card style={{ margin: 10, width: 300, minHeight: 80 }}>
        <Typography textAlign={"center"} variant="h5">
          {course.title}
        </Typography>
        <Typography textAlign={"center"}>{course.description}</Typography>
        <img src={course.imageLink} />
      </Card>
    </div>
  );
};

const UpdateCard = () => {
  const [{ course }, setCourseMeta] = useRecoilState(courseMetaState);

  const courseId = course?._id;
  const [title, setTitle] = useState(course?.title);
  const [description, setDescription] = useState(course?.description);
  const [price, setPrice] = useState(course?.price);
  const [imageLink, setImageLink] = useState(course?.imageLink);

  if (!course || !courseId) {
    return <>{"Course not found"}</>;
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card variant="outlined" style={{ maxWidth: 600, marginTop: 200 }}>
        <div style={{ padding: 20 }}>
          <Typography style={{ marginBottom: 10 }}>
            Update Course Details
          </Typography>
          <TextField
            style={{ marginBottom: 10 }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            id="outlined-basic"
            label="Title"
            variant="outlined"
          />
          <TextField
            style={{ marginBottom: 10 }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            id="outlined-basic"
            label="Description"
            variant="outlined"
          />
          <TextField
            style={{ marginBottom: 10 }}
            type="number"
            value={price}
            onChange={(e) => setPrice(+e.target.value)}
            fullWidth
            id="outlined-basic"
            label="Price"
            variant="outlined"
          />
          <TextField
            style={{ marginBottom: 10 }}
            value={imageLink}
            onChange={(e) => setImageLink(e.target.value)}
            fullWidth
            id="outlined-basic"
            label="Image Link"
            variant="outlined"
          />
          <Button
            size="large"
            variant="contained"
            onClick={async () => {
              if (!courseId || !title || !price) {
                return;
              }

              const editedCourse = {
                title,
                description,
                price,
                imageLink,
                published: true,
              };

              await axios.put(
                `${URL}/admin/courses/${courseId}`,
                editedCourse,
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              );

              setCourseMeta({
                course: { ...editedCourse, _id: courseId },
                isLoading: false,
              });
            }}
          >
            Update Course
          </Button>
        </div>
      </Card>
    </div>
  );
};

export const Course = () => {
  const { courseId } = useParams();
  const setCourseMeta = useSetRecoilState(courseMetaState);
  const isLoading = useRecoilValue(isCourseLoadingState);

  useEffect(() => {
    const fetchData = async () => {
      const { data }: { data: { course: CourseT } } = await axios.get(
        `${URL}/admin/course/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setCourseMeta({ course: data?.course, isLoading: false });
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <>
      <GrayTopper />
      <Grid container>
        <Grid item lg={8} md={12} sm={12}>
          <UpdateCard />
        </Grid>
        <Grid item lg={4} md={12} sm={12}>
          <CourseCard />
        </Grid>
      </Grid>
    </>
  );
};
