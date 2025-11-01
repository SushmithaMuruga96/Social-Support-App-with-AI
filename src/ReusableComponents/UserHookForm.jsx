import { useForm } from "react-hook-form";
import "./form.css";
import { Grid, Button } from "@mui/material";
import GptHelperForm from "./GptHelperForm";

const UserHookForm = ({ activeStep }) => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    const JsonData = JSON.stringify(data);
    localStorage.setItem("formData", JsonData);
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
          {...register("name", { required: true })}
          autoComplete="name"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <label htmlFor="nationId">National ID</label>
        <input
          id="nationId"
          type="number"
          placeholder="Enter your national ID"
          {...register("nationalId", { required: true, maxLength: 13 })}
          autoComplete="tel"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <label htmlFor="dob">Date of Birth</label>
        <input
          id="dob"
          type="date"
          // autoComplete="bday"
          {...register("dob", { required: "Date of birth is required" })}
        />
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
          {...register("phone", { required: "Phone number is required" })}
          autoComplete="tel"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          {...register("email", { required: "Email is required" })}
          autoComplete="email"
        />
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
          autoComplete="off"
          placeholder="Number of dependents"
          {...register("dependents", {
            required: "Number of dependents is required",
          })}
        />
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
          autoComplete="off"
          placeholder="Monthly income"
          {...register("monthlyIncome", {
            required: "Monthly income is required in AED",
          })}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <label style={{ display: "block", marginBottom: "8px" }}>
          Housing Status
        </label>

        <div style={{ display: "flex", gap: "20px", marginTop: "8px" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <input
              type="radio"
              id="owned"
              value="owned"
              {...register("housingStatus", {
                required: "Housing status is required",
              })}
            />
            <label htmlFor="owned">Owned</label>
          </div>

          <div style={{ display: "flex" }}>
            <input
              type="radio"
              id="rented"
              value="rented"
              {...register("housingStatus", {
                required: "Housing status is required",
              })}
            />
            <label htmlFor="rented">Rented</label>
          </div>

          <div style={{ display: "flex" }}>
            <input
              type="radio"
              id="livingWithFamily"
              value="livingWithFamily"
              {...register("housingStatus", {
                required: "Housing status is required",
              })}
            />
            <label htmlFor="livingWithFamily">Living with Family</label>
          </div>
        </div>
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
          {...register("financialSituation", { required: true })}
          autoComplete="off"
          rows={5}
        ></textarea>
        {/* <Button
          variant="outlined"
          size="small"
          onClick={() => alert("Help is on the way!")}
        >
          Help me to write
        </Button> */}
        <GptHelperForm
          prompt={
            "I am unemployed with no income. Help me describe my financial hardship."
          }
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 12 }}>
        <label htmlFor="employmentCircumstances">
          Describe Your Employment Circumstances
        </label>
        <textarea
          id="employmentCircumstances"
          placeholder="Describe your employment circumstances"
          {...register("employmentCircumstances", { required: true })}
          autoComplete="off"
          rows={5}
        ></textarea>
        {/* <Button
          variant="outlined"
          size="small"
          onClick={() => alert("Help is on the way!")}
        >
          Help me to write
        </Button> */}
        <GptHelperForm
          prompt={
            "I am unemployed with no income. Help me describe my financial hardship."
          }
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 12 }}>
        <label htmlFor="reasonForApplying">Reason for Applying</label>
        <textarea
          id="reasonForApplying"
          placeholder="Reason for applying"
          {...register("reasonForApplying", { required: true })}
          autoComplete="off"
          rows={5}
        ></textarea>
        {/* <Button
          variant="outlined"
          size="small"
          onClick={() => alert("Help is on the way!")}
        >
          Help me to write
        </Button> */}
        <GptHelperForm
          prompt={
            "I am unemployed with no income. Help me describe my financial hardship."
          }
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
          disabled={activeStep !== 2}
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </Grid>
    </form>
  );
};

export default UserHookForm;
