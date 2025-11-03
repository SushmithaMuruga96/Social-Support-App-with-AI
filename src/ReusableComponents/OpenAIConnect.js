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
import { useTranslation } from "react-i18next";

// mock responses for different fields
const mockResponses = {
  financialSituation: {
    choices: [
      {
        message: {
          content:
            "I am currently unemployed and have no stable source of income. This has made it challenging to meet my daily expenses such as rent, food, and basic needs. I am actively seeking employment opportunities to improve my financial condition.",
        },
      },
    ],
  },
  employmentCircumstances: {
    choices: [
      {
        message: {
          content:
            "I recently lost my job and have been struggling to find new employment. Despite submitting applications to several companies, I have not yet received any offers. I remain hopeful and continue my job search actively.",
        },
      },
    ],
  },
  reasonForApplying: {
    choices: [
      {
        message: {
          content:
            "I am applying for assistance to help cover my basic living costs during this difficult time. Financial aid will allow me to manage essential needs such as food, rent, and transportation until I can secure stable employment.",
        },
      },
    ],
  },
};

const OpenAIConnect = ({ prompt, id = "" }) => {
  const { t } = useTranslation();
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
        prompt,
      });
      const data = res.data;
      setResponse(data.choices[0].message.content);
    } catch (error) {
      // console.error("Error calling OpenAI", error);
      // Fallback mock response based on id
      if (mockResponses[id]) {
        setResponse(mockResponses[id].choices[0].message.content);
      } else {
        setResponse("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
      }
    }

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
        {loading ? t("Generating...") : t("Help me to write")}
      </Button>

      {response && (
        <AlertDialogSlide content={response} modelopen={true} id={id} />
      )}
    </div>
  );
};

export default OpenAIConnect;
