import React from "react";
import StepperComponent from "../ReusableComponents/StepperComponent";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";

export default function Home() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
    document.body.dir = lang === "ar" ? "rtl" : "ltr";
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Button
          variant="outlined"
          size="small"
          onClick={() => changeLanguage("en")}
        >
          English
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={() => changeLanguage("ar")}
        >
          العربية
        </Button>
      </div>

      <h1>{t("Welcome to the Social Support Application")}</h1>
      <h3>
        {t(
          "This is government social support portal, designed to help citizens to apply for financial assistance easily, quickly, and with smart help."
        )}
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
