import React, { useState } from "react";
import { TextField, Autocomplete } from "@mui/material";
import { locationNames } from "../utils/locationNames";

const AutoSuggestField = ({ label, name, value, handleChange }) => {
  const [options, setOptions] = useState([
    { name: "New York", country: "USA" },
    { name: "London", country: "UK" },
    { name: "New Delhi", country: "India" },
    { name: "Tokyo", country: "Japan" },
    { name: "Paris", country: "France" },
  ]); // Default places
  const [loading, setLoading] = useState(false);

  const handleInputChange = async (event, inputValue) => {
    if (inputValue) {
      setLoading(true);
      const results = await locationNames(inputValue);
      setOptions(results);
      setLoading(false);
    } else {
      // Reset to default options when the input is cleared
      setOptions([
        { name: "New York", country: "USA" },
        { name: "London", country: "UK" },
        { name: "New Delhi", country: "India" },
        { name: "Tokyo", country: "Japan" },
        { name: "Paris", country: "France" },
      ]);
    }
  };

  const handleSelect = (event, newValue) => {
    if (newValue) {
      const fullValue = `${newValue.name}, ${newValue.country}`;
      handleChange({
        target: { name, value: fullValue },
      });
    } else {
      handleChange({
        target: { name, value: "" },
      });
    }
  };

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => `${option.name}, ${option.country}`}
      value={
        value
          ? {
              name: value.split(",")[0],
              country: value.split(",")[1]?.trim() || "",
            }
          : null
      }
      onChange={handleSelect}
      onInputChange={handleInputChange}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
          sx={{ width: "60%" }}
          color="tertiary"
        />
      )}
    />
  );
};

export default AutoSuggestField;
