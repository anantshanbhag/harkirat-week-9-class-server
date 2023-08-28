import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecoilRoot, useSetRecoilState } from "recoil";
import axios from "axios";

import {
  Signin,
  Signup,
  Appbar,
  AddCourse,
  Courses,
  Course,
  Landing,
} from "./components";
import { URL } from "./utils/constants";
import { userState } from "./store/atoms/user";
import { UserT } from "./types";

const InitUser = () => {
  const setUser = useSetRecoilState(userState);

  const init = async () => {
    const isLoading = false;

    try {
      const { data }: { data: UserT } = await axios.get(`${URL}/admin/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!data.username) {
        throw new Error();
      }

      setUser({ userEmail: data.username, isLoading });
    } catch {
      setUser({ userEmail: null, isLoading });
    }
  };

  useEffect(() => {
    init();
  }, []);

  return <></>;
};

const App = () => (
  <div style={{ width: "100vw", height: "100vh", backgroundColor: "#eeeeee" }}>
    <RecoilRoot>
      <InitUser />
      <Router>
        <Appbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/addcourse" element={<AddCourse />} />
          <Route path="/course/:courseId" element={<Course />} />
        </Routes>
      </Router>
    </RecoilRoot>
  </div>
);

export default App;
