import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Button, Typography } from "@mui/material";

import { userState } from "../store/atoms/user";

const LoggedInNavbar = () => {
  const navigate = useNavigate();

  const setUser = useSetRecoilState(userState);

  return (
    <div style={{ display: "flex", gap: 10 }}>
      <Button
        variant="contained"
        onClick={() => {
          navigate("/addcourse");
        }}
      >
        Add course
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          navigate("/courses");
        }}
      >
        Courses
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          localStorage.setItem("token", '');
          setUser({ userEmail: null, isLoading: false });
          navigate("/");
        }}
      >
        Logout
      </Button>
    </div>
  );
};

const LoggedOutNavbar = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", gap: 10 }}>
      <Button
        variant="contained"
        onClick={() => {
          navigate("/signup");
        }}
      >
        Signup
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          navigate("/signin");
        }}
      >
        Sign in
      </Button>
    </div>
  );
};

export const Appbar = () => {
  const { userEmail, isLoading } = useRecoilValue(userState);

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: 4,
        zIndex: 1,
      }}
    >
      <div style={{ marginLeft: 10 }}>
        <Typography variant="h6">Coursera</Typography>
      </div>
      {userEmail ? <LoggedInNavbar /> : <LoggedOutNavbar />}
    </div>
  );
};
