import { configureStore } from "@reduxjs/toolkit";
import gptReducer from "./gptSlice";

export const store = configureStore({
  reducer: {
    gpt: gptReducer,
  },
});
