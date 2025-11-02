import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import AlertDialogSlide from "./AlertDialog";
import axios from "axios";
import "./form.css";
import { useSelector, useDispatch } from "react-redux";
import {
  setFinResponse,
  setEmpResponse,
  setReasonForApply,
  setActiveField,
  setDialogState,
} from "../Redux/gptSlice";

const mockResponse = {
  choices: [
    {
      message: {
        content:
          "I am currently unemployed and have no regular source of income. This situation has made it extremely difficult to cover my daily expenses, including rent, food, and basic necessities. Despite actively searching for work, I have not yet been able to secure a stable position. Any financial support or assistance during this challenging time would greatly help me manage my essential needs and regain financial stability.",
      },
    },
  ],
};

const OpenAIConnect = ({ prompt, id = "" }) => {
  const dispatch = useDispatch();
  const { dialogState, activeField } = useSelector((state) => state.gpt);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const onhandleClick = () => {
    dispatch(setActiveField(id));
    fetchOpenAI();
  };

  const fetchOpenAI = async () => {
    setLoading(true);
    setResponse("");
    try {
      const res = await axios.post("http://localhost:5000/api/chat", {
        prompt:
          "I am unemployed with no income. Help me describe my financial hardship.",
      });

      const data = res.data;
      console.log(data.choices[0].message.content);
      setResponse(data.choices[0].message.content);
    } catch (error) {
      // console.error("Error calling OpenAI", error);
      setResponse("Something went wrong");
    } finally {
      setLoading(false);
      setResponse(mockResponse.choices[0].message.content);
    }
  };

  useEffect(() => {
    // console.log(dialogState, id, "dialogState");
    if (dialogState?.status === "accept" && activeField === id) {
      if (id === "financialSituation") {
        dispatch(setFinResponse(dialogState?.content || response));
      } else if (id === "employmentCircumstances") {
        dispatch(setEmpResponse(dialogState?.content || response));
      } else if (id === "reasonForApplying") {
        dispatch(setReasonForApply(dialogState?.content || response));
      }
    }

    if (dialogState?.status === "discard" && activeField === id) {
      if (id === "financialSituation") {
        dispatch(setFinResponse(""));
      } else if (id === "employmentCircumstances") {
        dispatch(setEmpResponse(""));
      } else if (id === "reasonForApplying") {
        dispatch(setReasonForApply(""));
      } else {
        //do nothing
      }
    }

    // dispatch(setActiveField(null));
    // ✅ Reset AFTER the effect has applied logic
    if (dialogState?.status === "accept" || dialogState?.status === "discard") {
      const timer = setTimeout(() => {
        dispatch(setDialogState(""));
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [dialogState, id, activeField, response, dispatch]);
  return (
    <div style={{ padding: "20px" }}>
      <Button
        variant="outlined"
        size="small"
        onClick={onhandleClick}
        disabled={loading}
      >
        {loading ? "Generating..." : "Help me to write"}
      </Button>
      {response && (
        // <div style={{ marginTop: "20px", whiteSpace: "pre-wrap" }}>
        //   <strong>ChatGPT Response:</strong>
        //   <p>{response}</p>
        // </div>
        <AlertDialogSlide content={response} modelopen={true} id={id} />
      )}
    </div>
  );
};

export default OpenAIConnect;
