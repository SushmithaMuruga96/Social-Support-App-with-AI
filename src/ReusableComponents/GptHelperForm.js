import React, { useState } from "react";
import axios from "axios";
import { Grid, Button } from "@mui/material";
import "../ReusableComponents/form.css";

const GptHelperForm = ({ prompt }) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const fetchOpenAI = async (prompt) => {
    setLoading(true);
    setResponse("");
    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt:
            "I am unemployed with no income. Help me describe my financial hardship.",
        }),
      });

      const data = await res.json();
      console.log(data.choices[0].message.content);
    } catch (error) {
      console.error("Error calling OpenAI", error);
      setResponse("Something went wrong");
    } finally {
      setLoading(false);
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
        <div style={{ marginTop: "20px", whiteSpace: "pre-wrap" }}>
          <strong>ChatGPT Response:</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default GptHelperForm;
