import React from "react";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import OpenAIConnect from "../../ReusableComponents/OpenAIConnect";

// STEP 3: Situation Description

const StepSituationDesc = ({ register, errors, t }) => {
  return (
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
};

export default StepSituationDesc;
