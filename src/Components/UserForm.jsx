import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "../ReusableComponents/form.css";
import { Grid, Button, CircularProgress } from "@mui/material";
import OpenAIConnect from "../ReusableComponents/OpenAIConnect";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

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

  // STEP 1: Personal Info
  const personalInfoForm = () => (
    <Grid
      container
      columnSpacing={5}
      rowSpacing={0.5}
      sx={{ width: "100%", margin: 0 }}
    >
      <Grid size={{ xs: 12, sm: 6 }}>
        <label htmlFor="name">{t("Full Name")}</label>
        <input
          id="name"
          type="text"
          placeholder={t("Enter your name")}
          {...register("name", {
            required: t("Full name is required"),
            minLength: {
              value: 3,
              message: t("At least 3 characters required"),
            },
          })}
        />
        {errors.name && <p className="error">{errors.name.message}</p>}
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <label htmlFor="nationId">{t("National ID")}</label>
        <input
          id="nationalId"
          type="number"
          placeholder={t("Enter your national ID")}
          {...register("nationalId", {
            required: t("National ID is required"),
            minLength: { value: 5, message: t("Must be at least 5 digits") },
          })}
        />
        {errors.nationalId && (
          <p className="error">{errors.nationalId.message}</p>
        )}
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <label htmlFor="dob">{t("Date of Birth")}</label>
        <input
          id="dob"
          type="date"
          {...register("dob", { required: t("Date of birth is required") })}
        />
        {errors.dob && <p className="error">{errors.dob.message}</p>}
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <label htmlFor="gender">{t("Gender")}</label>
        <select id="gender" {...register("gender")}>
          <option value="female">{t("Female")}</option>
          <option value="male">{t("Male")}</option>
          <option value="other">{t("Other")}</option>
        </select>
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <label htmlFor="address">{t("Address")}</label>
        <input
          id="address"
          type="text"
          autoComplete="street-address"
          placeholder={t("Enter your address")}
          {...register("address", { required: t("Address is required") })}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <label htmlFor="city">{t("City")}</label>
        <input
          id="city"
          type="text"
          placeholder={t("Enter your city")}
          {...register("city", { required: t("City is required") })}
          autoComplete="address-level2"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <label htmlFor="state">{t("State")}</label>
        <input
          id="state"
          type="text"
          placeholder={t("Enter your state")}
          {...register("state", { required: t("State is required") })}
          autoComplete="address-level1"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <label htmlFor="country">{t("Country")}</label>
        <input
          id="country"
          type="text"
          placeholder={t("Enter your country")}
          {...register("country", { required: t("Country is required") })}
          autoComplete="country-name"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <label htmlFor="phone">{t("Phone")}</label>
        <input
          id="phone"
          type="tel"
          placeholder={t("Enter your phone number")}
          {...register("phone", {
            required: t("Phone number is required"),
            pattern: {
              value: /^[0-9]{7,15}$/,
              message: t("Enter a valid phone number (7–15 digits)"),
            },
          })}
        />
        {errors.phone && <p className="error">{errors.phone.message}</p>}
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <label htmlFor="email">{t("Email")}</label>
        <input
          id="email"
          type="email"
          placeholder={t("Enter your email")}
          {...register("email", {
            required: t("Email is required"),
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: t("Enter a valid email address"),
            },
          })}
        />
        {errors.email && <p className="error">{errors.email.message}</p>}
      </Grid>
    </Grid>
  );

  // STEP 2: Family & Financial Info
  const familyFinancialForm = () => (
    <Grid
      container
      columnSpacing={5}
      rowSpacing={0.5}
      sx={{ width: "100%", margin: 0 }}
    >
      <Grid size={{ xs: 12, sm: 6 }}>
        <label htmlFor="maritalStatus">{t("Marital Status")}</label>
        <select id="maritalStatus" {...register("maritalStatus")}>
          <option value="single">{t("Single")}</option>
          <option value="married">{t("Married")}</option>
          <option value="divorced">{t("Divorced")}</option>
          <option value="widowed">{t("Widowed")}</option>
        </select>
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <label htmlFor="dependents">{t("Number of Dependents")}</label>
        <input
          id="dependents"
          type="number"
          placeholder={t("Number of dependents")}
          {...register("dependents", {
            required: t("Dependents count is required"),
            min: { value: 0, message: t("Cannot be negative") },
          })}
        />
        {errors.dependents && (
          <p className="error">{errors.dependents.message}</p>
        )}
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <label htmlFor="employmentStatus">{t("Employment Status")}</label>
        <select id="employmentStatus" {...register("employmentStatus")}>
          <option value="employed">{t("Employed")}</option>
          <option value="unemployed">{t("Unemployed")}</option>
          <option value="student">{t("Student")}</option>
          <option value="retired">{t("Retired")}</option>
        </select>
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <label htmlFor="monthlyIncome">{t("Monthly Income (in AED)")}</label>
        <input
          id="monthlyIncome"
          type="number"
          placeholder={t("Monthly income")}
          {...register("monthlyIncome", {
            required: t("Monthly income is required"),
            min: { value: 0, message: t("Must be a positive number") },
          })}
        />
        {errors.monthlyIncome && (
          <p className="error">{errors.monthlyIncome.message}</p>
        )}
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <label>{t("Housing Status")}</label>
        <div style={{ display: "flex", gap: "20px" }}>
          {["owned", "rented", "livingWithFamily"].map((option) => (
            <label key={option}>
              <input
                type="radio"
                value={option}
                {...register("housingStatus", {
                  required: t("Please select your housing status"),
                })}
              />
              {t(option.replace(/([A-Z])/g, " $1"))}
            </label>
          ))}
        </div>
        {errors.housingStatus && (
          <p className="error">{errors.housingStatus.message}</p>
        )}
      </Grid>
    </Grid>
  );

  // STEP 3: Situation Description
  const situationDescriptionForm = () => (
    <Grid
      container
      columnSpacing={5}
      rowSpacing={0.5}
      sx={{ width: "100%", margin: 0 }}
    >
      <Grid size={{ xs: 12 }}>
        <label htmlFor="financialSituation">
          {t("Describe Your Current Financial Situation")}
        </label>
        <textarea
          id="financialSituation"
          placeholder={t("Describe your current financial situation")}
          {...register("financialSituation", {
            required: t("Financial situation is required"),
            minLength: {
              value: 10,
              message: t("Please write at least 10 characters"),
            },
          })}
          rows={5}
        />
        {errors.financialSituation && (
          <p className="error">{errors.financialSituation.message}</p>
        )}
        <OpenAIConnect
          prompt={t(
            "I am unemployed with no income. Help me describe my financial hardship in detail, including my monthly expenses, debts, and lack of resources."
          )}
          id="financialSituation"
        />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <label htmlFor="employmentCircumstances">
          {t("Describe Your Employment Circumstances")}
        </label>
        <textarea
          id="employmentCircumstances"
          placeholder={t("Describe your employment circumstances")}
          {...register("employmentCircumstances", {
            required: t("Employment Circumstances is required"),
            minLength: {
              value: 10,
              message: t("Please write at least 10 characters"),
            },
          })}
          rows={5}
        />
        {errors.employmentCircumstances && (
          <p className="error">{errors.employmentCircumstances.message}</p>
        )}
        <OpenAIConnect
          prompt={t(
            "Describe my employment circumstances, including my previous job, reason for unemployment, and efforts to find new work."
          )}
          id="employmentCircumstances"
        />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <label htmlFor="reasonForApplying">{t("Reason for Applying")}</label>
        <textarea
          id="reasonForApplying"
          placeholder={t("Reason for applying")}
          {...register("reasonForApplying", {
            required: t("Reason for applying is required"),
            minLength: {
              value: 10,
              message: t("Please write at least 10 characters"),
            },
          })}
          rows={5}
        />
        {errors.reasonForApplying && (
          <p className="error">{errors.reasonForApplying.message}</p>
        )}
        <OpenAIConnect
          prompt={t(
            "Help me explain why I am applying for government social support and how this assistance would improve my living situation."
          )}
          id="reasonForApplying"
        />
      </Grid>
    </Grid>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {activeStep === 0 && personalInfoForm()}
      {activeStep === 1 && familyFinancialForm()}
      {activeStep === 2 && situationDescriptionForm()}

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
