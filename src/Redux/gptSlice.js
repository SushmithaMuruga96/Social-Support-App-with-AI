import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    finResponse: "",
    empResponse: "",
    reasonForApply: "",
    dialogState: "",
    activeField: null,
  },
  reducers: {
    setFinResponse: (state, action) => {
      state.finResponse = action.payload;
    },
    setEmpResponse: (state, action) => {
      state.empResponse = action.payload;
    },
    setReasonForApply: (state, action) => {
      state.reasonForApply = action.payload;
    },
    setDialogState: (state, action) => {
      console.log(state.action, "dialogstate");
      state.dialogState = action.payload;
    },
    setActiveField: (state, action) => {
      state.activeField = action.payload;
    },

    clearResponse: (state) => {
      state.finResponse = "";
      state.empResponse = "";
      state.reasonForApply = "";
      state.dialogState = "";
    },
  },
});

export const {
  setFinResponse,
  setEmpResponse,
  setReasonForApply,
  clearResponse,
  setDialogState,
  setActiveField,
} = gptSlice.actions;
export default gptSlice.reducer;
