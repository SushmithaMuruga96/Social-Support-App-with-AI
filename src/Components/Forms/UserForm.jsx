import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "../ReusableComponents/form.css";
import { Grid, Button, CircularProgress } from "@mui/material";
import OpenAIConnect from "../../ReusableComponents/OpenAIConnect";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import StepPersonalInfo from "./StepPersonalInfo";
import StepFamilyFinancial from "./StepFamilyFinancial";
import StepSituationDesc from "./StepSituationDesc";

const UserForm = ({ activeStep, onFormSubmit }) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const { finResponse, empResponse, reasonForApply } = useSelector(
    (state) => state.gpt
  );

  const [loading, setLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    if (finResponse) {
      setValue("financialSituation", finResponse, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
    if (empResponse) {
      setValue("employmentCircumstances", empResponse, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
    if (reasonForApply) {
      setValue("reasonForApplying", reasonForApply, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  }, [finResponse, empResponse, reasonForApply, setValue]);

  const mockApiCall = (data) => {
    return new Promise((resolve, reject) => {
      // Simulate 2-second API delay
      setTimeout(() => {
        if (data.name && data.nationalId) {
          resolve({
            status: 200,
            message: "Form submitted successfully!",
            data,
          });
        } else {
          reject({
            status: 400,
            message: "Invalid form data.",
          });
        }
      }, 2000);
    });
  };

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    setLoading(true);
    setSubmitMessage("");

    try {
      localStorage.setItem("formData", JSON.stringify(data));
      const response = await mockApiCall(data);

      if (response.status === 200) {
        setSubmitMessage(t("Form submitted successfully!"));
        onFormSubmit?.(); // move to next step or success screen
      }
    } catch (error) {
      setSubmitMessage(t("Something went wrong. Please try again."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {activeStep === 0 && (
        <StepPersonalInfo register={register} errors={errors} t={t} />
      )}
      {activeStep === 1 && (
        <StepFamilyFinancial register={register} errors={errors} t={t} />
      )}
      {activeStep === 2 && (
        <StepSituationDesc register={register} errors={errors} t={t} />
      )}

      {isValid && (
        <>
          <Grid container justifyContent="center" marginTop={3}>
            <Button
              type="submit"
              disabled={activeStep !== 2 && submitMessage === ""}
              variant="contained"
              color="primary"
            >
              {loading ? (
                <>
                  <CircularProgress size={20} sx={{ mr: 1 }} />
                  {t("Submitting...")}
                </>
              ) : (
                t("Submit")
              )}
            </Button>
          </Grid>
          {submitMessage && (
            <p
              style={{
                textAlign: "center",
                marginTop: "10px",
                color: submitMessage.includes("successfully") ? "green" : "red",
              }}
            >
              {submitMessage}
            </p>
          )}
        </>
      )}
    </form>
  );
};

export default UserForm;
