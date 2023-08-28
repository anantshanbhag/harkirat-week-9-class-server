import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { Grid, Typography, Button } from "@mui/material";

import { userState } from "../store/atoms/user";

export const Landing = () => {
  const navigate = useNavigate();

  const { userEmail, isLoading } = useRecoilValue(userState);

  return (
    <Grid container style={{ padding: "5vw" }}>
      <Grid item xs={12} md={6} lg={6}>
        <div style={{ marginTop: 100 }}>
          <Typography variant="h2">Coursera Admin</Typography>
          <Typography variant="h5">A place to learn, earn and grow</Typography>
          {!isLoading && !userEmail && (
            <div style={{ display: "flex", marginTop: 20 }}>
              <div style={{ marginRight: 10 }}>
                <Button
                  size="large"
                  variant="contained"
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  Signup
                </Button>
              </div>
              <div>
                <Button
                  size="large"
                  variant="contained"
                  onClick={() => {
                    navigate("/signin");
                  }}
                >
                  Sign in
                </Button>
              </div>
            </div>
          )}
        </div>
      </Grid>
      <Grid item xs={12} md={6} lg={6} style={{ marginTop: 20 }}>
        <img src="/class.jpeg" width="100%" />
      </Grid>
    </Grid>
  );
};
