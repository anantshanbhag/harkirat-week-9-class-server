import { selector } from "recoil";

import { userState } from "../atoms/user";

export const userEmailState = selector({
  key: "userEmailState",
  get: ({ get }) => {
    const { userEmail } = get(userState);
    return userEmail;
  },
});

export const isUserLoadingState = selector({
  key: "isUserLoadingState",
  get: ({ get }) => {
    const { isLoading } = get(userState);
    return isLoading;
  },
});
