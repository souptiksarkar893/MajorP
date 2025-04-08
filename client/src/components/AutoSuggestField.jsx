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
      // Always pass a string value for location
      handleChange({
        target: { name, value: fullValue },
      });
    } else {
      handleChange({
        target: { name, value: "" },
      });
    }
  };

  // Parse value safely to handle different formats
  const parseValue = (val) => {
    if (!val) return null;

    try {
      // Handle array case - take first value
      if (Array.isArray(val)) {
        val = val[0];
      }

      // If value is already in the right format, use it
      if (typeof val === "object" && val.name && val.country) {
        return val;
      }

      // Otherwise try to parse it from string
      const parts = val.split(",");
      return {
        name: parts[0]?.trim() || "",
        country: parts[1]?.trim() || "",
      };
    } catch (err) {
      console.error("Error parsing location value:", err);
      return null;
    }
  };

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => `${option.name}, ${option.country}`}
      value={parseValue(value)}
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
          name={name}
          required
        />
      )}
    />
  );
};

export default AutoSuggestField;
