import React from "react";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";

// STEP 1: Personal Info
const StepPersonalInfo = ({ register, errors, t }) => {
  return (
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
};

export default StepPersonalInfo;
