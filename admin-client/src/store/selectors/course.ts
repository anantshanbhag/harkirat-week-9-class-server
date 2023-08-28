import { selector } from "recoil";

import { courseMetaState } from "../atoms/course";

export const isCourseLoadingState = selector({
  key: "isCourseLoadingState",
  get: ({ get }) => {
    const { isLoading } = get(courseMetaState);
    return isLoading;
  },
});

export const courseDetailsState = selector({
  key: "courseDetailsState",
  get: ({ get }) => {
    const { course } = get(courseMetaState);
    return course;
  },
});

export const courseTitleState = selector({
  key: "courseTitleState",
  get: ({ get }) => {
    const { course } = get(courseMetaState);
    return course?.title;
  },
});

export const coursePriceState = selector({
  key: "coursePriceState",
  get: ({ get }) => {
    const { course } = get(courseMetaState);
    return course?.price;
  },
});

export const courseImageState = selector({
  key: "courseImageState",
  get: ({ get }) => {
    const { course } = get(courseMetaState);
    return course?.imageLink;
  },
});
