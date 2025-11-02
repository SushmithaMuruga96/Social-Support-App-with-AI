import React, { useState } from "react";
import { Button } from "@mui/material";
import AlertDialogSlide from "../ReusableComponents/AlertDialog";
import axios from "axios";

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

const OpenAIConnect = ({ prompt }) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const fetchOpenAI = async (prompt) => {
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
  return (
    <div style={{ padding: "20px" }}>
      <Button
        variant="outlined"
        size="small"
        onClick={fetchOpenAI}
        disabled={loading}
      >
        {loading ? "Generating..." : "Help me to write"}
      </Button>
      {response && (
        // <div style={{ marginTop: "20px", whiteSpace: "pre-wrap" }}>
        //   <strong>ChatGPT Response:</strong>
        //   <p>{response}</p>
        // </div>
        <AlertDialogSlide content={response} modelopen={true} />
      )}
    </div>
  );
};

export default OpenAIConnect;
