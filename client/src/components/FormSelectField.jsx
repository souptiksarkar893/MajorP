import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const FormSelectField = ({
  label,
  value,
  name,
  options = [],
  handleChange,
}) => {
  return (
    <TextField
      select
      required
      label={label}
      value={value}
      onChange={handleChange}
      name={name}
      sx={{ width: "60%" }}
      color="tertiary"
    >
      {Array.isArray(options) ? (
        options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))
      ) : (
        <MenuItem disabled>No options available</MenuItem>
      )}
    </TextField>
  );
};

export default FormSelectField;
