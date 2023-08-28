import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import axios from "axios";
import { Button, TextField, Card, Typography } from "@mui/material";

import { URL } from "../utils/constants";
import { userState } from "../store/atoms/user";

export const Signup = () => {
  const navigate = useNavigate();

  const setUser = useSetRecoilState(userState);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div
        style={{
          paddingTop: 150,
          marginBottom: 10,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6">Welcome to Coursera. Sign up below</Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card variant="outlined" style={{ width: 400, padding: 20 }}>
          <TextField
            style={{ marginBottom: 10 }}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            id="outlined-basic"
            label="Email"
            variant="outlined"
          />
          <TextField
            style={{ marginBottom: 10 }}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            id="outlined-basic"
            label="Password"
            variant="outlined"
          />
          <Button
            size="large"
            variant="contained"
            onClick={async () => {
              const { data }: { data: { token: string } } = await axios.post(
                `${URL}/admin/signup`,
                {
                  username: email,
                  password,
                }
              );

              if (!data.token) {
                return null;
              }

              localStorage.setItem("token", data.token);
              setUser({ userEmail: email, isLoading: false });
              navigate("/courses");
            }}
          >
            Signup
          </Button>
        </Card>
      </div>
    </>
  );
};
