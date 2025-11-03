import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import UserForm from "../Components/Forms/UserForm";
import { useTranslation } from "react-i18next";
import { useTheme, useMediaQuery } from "@mui/material";

export default function StepperComponent() {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [isStepSubmitted, setIsStepSubmitted] = React.useState(false);

  const steps = [
    t("personalInformation"),
    t("familyAndFinancialInformation"),
    t("situationDescription"),
  ];

  const isStepSkipped = (step) => skipped.has(step);

  const handleNext = () => {
    setIsStepSubmitted(false);
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prev) => prev + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setIsStepSubmitted(false);
    setActiveStep((prev) => prev - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper
        activeStep={activeStep}
        alternativeLabel={!isMobile} // horizontal for desktop
        orientation={isMobile ? "vertical" : "horizontal"} // vertical for mobile
        sx={{
          width: "100%",
          maxWidth: isMobile ? "100%" : "600px",
          bgcolor: "transparent",
          "& .MuiStepLabel-label": {
            color: "#fff",
            textAlign: "center",
          },
          margin: "0 auto",
        }}
      >
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepSkipped(index)) stepProps.completed = false;

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>
                <p>{label}</p>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            {t("allStepsCompleted")}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>{t("reset")}</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {/* calling form */}
          <UserForm
            activeStep={activeStep}
            onFormSubmit={() => setIsStepSubmitted(true)}
          />
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              {t("back")}
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button
              onClick={handleNext}
              disabled={!isStepSubmitted && activeStep === steps.length - 1}
            >
              {activeStep === steps.length - 1 ? t("finish") : t("next")}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
