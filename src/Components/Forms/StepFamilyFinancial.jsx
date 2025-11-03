import React from "react";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";

// STEP 2: Family & Financial Info

const StepFamilyFinancial = ({ register, errors, t }) => {
  return (
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
};

export default StepFamilyFinancial;
