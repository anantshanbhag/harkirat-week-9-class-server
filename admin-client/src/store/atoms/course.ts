import { atom } from "recoil";

import { CourseT } from "../../types";

export const courseMetaState = atom({
  key: "courseMetaState",
  default: {
    isLoading: true,
    course: null as CourseT | null,
  },
});
