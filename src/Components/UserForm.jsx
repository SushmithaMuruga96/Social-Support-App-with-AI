import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import "../ReusableComponents/form.css";
import { Grid, Button } from "@mui/material";
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

  const onSubmit = (data) => {
    console.log(data);
    const JsonData = JSON.stringify(data);
    localStorage.setItem("formData", JsonData);
    onFormSubmit?.();
  };

  // STEP 1: Personal Info
  const personalInfoForm = () => (
    <Grid container columnSpacing={5} rowSpacing={0.5} sx={{ width: "100%" }}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <label htmlFor="name">Full Name</label>
        <input
          id="name"
          type="text"
          placeholder="Enter your name"
          {...register("name", {
            required: "Full name is required",
            minLength: { value: 3, message: "At least 3 characters required" },
          })}
        />
        {errors.name && <p className="error">{errors.name.message}</p>}
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <label htmlFor="nationId">National ID</label>
        <input
          id="nationalId"
          type="number"
          placeholder="Enter your national ID"
          {...register("nationalId", {
            required: "National ID is required",
            minLength: { value: 5, message: "Must be at least 5 digits" },
          })}
        />
        {errors.nationalId && (
          <p className="error">{errors.nationalId.message}</p>
        )}
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <label htmlFor="dob">Date of Birth</label>
        <input
          id="dob"
          type="date"
          {...register("dob", { required: "Date of birth is required" })}
        />
        {errors.dob && <p className="error">{errors.dob.message}</p>}
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <label htmlFor="gender">Gender</label>
        <select id="gender" {...register("gender")}>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="other">Other</option>
        </select>
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <label htmlFor="address">Address</label>
        <input
          id="address"
          type="text"
          autoComplete="street-address"
          placeholder="Enter your address"
          {...register("address", { required: "Address is required" })}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <label htmlFor="city">City</label>
        <input
          id="city"
          type="text"
          placeholder="Enter your city"
          {...register("city", { required: "City is required" })}
          autoComplete="address-level2"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <label htmlFor="state">State</label>
        <input
          id="state"
          type="text"
          placeholder="Enter your state"
          {...register("state", { required: "State is required" })}
          autoComplete="address-level1"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <label htmlFor="country">Country</label>
        <input
          id="country"
          type="text"
          placeholder="Enter your country"
          {...register("country", { required: "Country is required" })}
          autoComplete="country-name"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          type="tel"
          placeholder="Enter your phone number"
          {...register("phone", {
            required: "Phone number is required",
            pattern: {
              value: /^[0-9]{7,15}$/,
              message: "Enter a valid phone number (7–15 digits)",
            },
          })}
        />
        {errors.phone && <p className="error">{errors.phone.message}</p>}
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email address",
            },
          })}
        />
        {errors.email && <p className="error">{errors.email.message}</p>}
      </Grid>
    </Grid>
  );

  // STEP 2: Family & Financial Info
  const familyFinancialForm = () => (
    <Grid container columnSpacing={5} rowSpacing={0.5}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <label htmlFor="maritalStatus">Marital Status</label>
        <select
          id="maritalStatus"
          autoComplete="off"
          {...register("maritalStatus")}
        >
          <option value="single">Single</option>
          <option value="married">Married</option>
          <option value="divorced">Divorced</option>
          <option value="widowed">Widowed</option>
        </select>
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <label htmlFor="dependents">Number of Dependents</label>
        <input
          id="dependents"
          type="number"
          placeholder="Number of dependents"
          {...register("dependents", {
            required: "Dependents count is required",
            min: { value: 0, message: "Cannot be negative" },
          })}
        />
        {errors.dependents && (
          <p className="error">{errors.dependents.message}</p>
        )}
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <label htmlFor="employmentStatus">Employment Status</label>
        <select
          id="employmentStatus"
          autoComplete="off"
          {...register("employmentStatus")}
        >
          <option value="employed">Employed</option>
          <option value="unemployed">Unemployed</option>
          <option value="student">Student</option>
          <option value="retired">Retired</option>
        </select>
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <label htmlFor="monthlyIncome">Monthly Income (in AED)</label>
        <input
          id="monthlyIncome"
          type="number"
          placeholder="Monthly income"
          {...register("monthlyIncome", {
            required: "Monthly income is required",
            min: { value: 0, message: "Must be a positive number" },
          })}
        />
        {errors.monthlyIncome && (
          <p className="error">{errors.monthlyIncome.message}</p>
        )}
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <label>Housing Status</label>
        <div style={{ display: "flex", gap: "20px" }}>
          {["owned", "rented", "livingWithFamily"].map((option) => (
            <label key={option}>
              <input
                type="radio"
                value={option}
                {...register("housingStatus", {
                  required: "Please select your housing status",
                })}
              />
              {option.replace(/([A-Z])/g, " $1")}
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
    <Grid container columnSpacing={5} rowSpacing={0.5}>
      <Grid size={{ xs: 12, sm: 12 }}>
        <label htmlFor="financialSituation">
          Describe Your Current Financial Situation
        </label>
        <textarea
          id="financialSituation"
          placeholder="Describe your current financial situation"
          {...register("financialSituation", {
            required: "Financial situation is required",
            minLength: {
              value: 10,
              message: "Please write at least 10 characters",
            },
          })}
          autoComplete="off"
          rows={5}
        />
        {errors.financialSituation && (
          <p className="error">{errors.financialSituation.message}</p>
        )}
        {/* <Button
          variant="outlined"
          size="small"
          onClick={() => alert("Help is on the way!")}
        >
          Help me to write
        </Button> */}
        <OpenAIConnect
          prompt={
            "I am unemployed with no income. Help me describe my financial hardship."
          }
          id={"financialSituation"}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 12 }}>
        <label htmlFor="employmentCircumstances">
          Describe Your Employment Circumstances
        </label>
        <textarea
          id="employmentCircumstances"
          placeholder="Describe your employment circumstances"
          {...register("employmentCircumstances", {
            required: "Employment Circumstances is required",
            minLength: {
              value: 10,
              message: "Please write at least 10 characters",
            },
          })}
          autoComplete="off"
          rows={5}
        />
        {errors.employmentCircumstances && (
          <p className="error">{errors.employmentCircumstances.message}</p>
        )}
        {/* <Button
          variant="outlined"
          size="small"
          onClick={() => alert("Help is on the way!")}
        >
          Help me to write
        </Button> */}
        <OpenAIConnect
          prompt={
            "I am unemployed with no income. Help me describe my financial hardship."
          }
          id="employmentCircumstances"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 12 }}>
        <label htmlFor="reasonForApplying">Reason for Applying</label>
        <textarea
          id="reasonForApplying"
          placeholder="Reason for applying"
          {...register("reasonForApplying", {
            required: "Reason for applying is required",
            minLength: {
              value: 10,
              message: "Please write at least 10 characters",
            },
          })}
          autoComplete="off"
          rows={5}
        />
        {errors.reasonForApplying && (
          <p className="error">{errors.reasonForApplying.message}</p>
        )}
        {/* <Button
          variant="outlined"
          size="small"
          onClick={() => alert("Help is on the way!")}
        >
          Help me to write
        </Button> */}
        <OpenAIConnect
          prompt={
            "I am unemployed with no income. Help me describe my financial hardship."
          }
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

      <Grid container justifyContent="center" marginTop={3}>
        <Button
          type="submit"
          disabled={activeStep !== 2 && !isValid}
          variant="contained"
          color="primary"
        >
          {t("Submit")}
        </Button>
      </Grid>
    </form>
  );
};

export default UserForm;
