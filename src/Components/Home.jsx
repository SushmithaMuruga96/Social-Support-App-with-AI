import React from "react";
import StepperComponent from "../ReusableComponents/StepperComponent";

export default function Home() {
  return (
    <>
      <h1>Welcome to the Social Support Application</h1>
      <h3>
        This is government social support portal, designed to help citizens to
        apply for financial assistance easily, quickly, and with smart help.
      </h3>
      <div
        style={{
          width: "50%",
          margin: "auto",
          marginTop: "3rem",
        }}
      >
        <StepperComponent />
      </div>
    </>
  );
}
