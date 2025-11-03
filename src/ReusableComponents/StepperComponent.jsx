import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import UserForm from "../Components/UserForm";
import { useTranslation } from "react-i18next";

export default function StepperComponent() {
  const { t } = useTranslation();
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
      <Stepper activeStep={activeStep}>
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
