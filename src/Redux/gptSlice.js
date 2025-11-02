import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    finResponse: "",
    empResponse: "",
    reasonForApply: "",
  },
  reducers: {
    setFinResponse: (state, action) => {
      state.finResponse = action.payload;
    },
    setEmpResponse: (state, action) => {
      state.finResponse = action.payload;
    },
    setReasonForApply: (state, action) => {
      state.reasonForApply = action.payload;
    },

    clearResponse: (state) => {
      state.finResponse = "";
      state.empResponse = "";
      state.reasonForApply = "";
    },
  },
});

export const {
  setFinResponse,
  setEmpResponse,
  setReasonForApply,
  clearResponse,
} = gptSlice.actions;
export default gptSlice.reducer;
