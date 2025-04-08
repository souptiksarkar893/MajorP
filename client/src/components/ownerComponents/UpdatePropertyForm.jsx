import React, { useState, useCallback } from "react";
import {
  TextField,
  Button,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import BungalowIcon from "@mui/icons-material/Bungalow";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AutoSuggestField from "../../components/AutoSuggestField"; // Import your AutoSuggestField here

const UpdatePropertyForm = ({
  title,
  description,
  price,
  category,
  area,
  floors,
  facing,
  address,
  isProcessing,
}) => {
  const initialFormValues = {
    price,
    description,
    location: address?.location || "", // Ensure no default location
    streetName: address?.streetName || "",
    category,
    area,
    floors,
    facing,
  };

  const [values, setFormValues] = useState(initialFormValues);

  const handleChange = useCallback(
    (e) => {
      // Check if this is coming from AutoSuggestField (location)
      if (typeof e !== "object" || !e.target) {
        // This is a direct value from AutoSuggestField
        setFormValues({ ...values, location: e });
      } else {
        // Handle location field specially to ensure it's a string
        if (e.target.name === "location") {
          let locationValue = e.target.value;
          // If it's an array, take the first value
          if (Array.isArray(locationValue)) {
            locationValue = locationValue[0];
          }
          setFormValues({ ...values, location: locationValue });
        } else {
          // Regular form field
          setFormValues({ ...values, [e.target.name]: e.target.value });
        }
      }
    },
    [values]
  );

  return (
    <>
      <div className="flex flex-wrap flex-col gap-2 ml-5">
        {/* Initial Details Section */}
        <div className="flex flex-col gap-4 my-2">
          <h5 className="mb-1">
            <InfoIcon /> Initial Details
          </h5>
          <TextField label="Title" color="tertiary" disabled value={title} />
          <TextField
            label="Description"
            multiline
            rows={4}
            color="tertiary"
            placeholder="Description of your property"
            name="description"
            value={values.description}
            onChange={handleChange}
          />
        </div>

        {/* Property Info Section */}
        <div className="flex flex-col gap-4 my-2">
          <h5 className="mb-1">
            <BungalowIcon /> Property Info
          </h5>
          <TextField
            label="Price"
            name="price"
            type="number"
            placeholder="Price"
            value={values.price}
            color="tertiary"
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Rs.</InputAdornment>
              ),
            }}
          />
          <TextField
            label="Category"
            name="category"
            select
            SelectProps={{ native: true }}
            value={values.category}
            color="tertiary"
            onChange={handleChange}
          >
            <option value="" disabled>
              Select a category
            </option>
            {["House", "Apartment", "Room", "Shop Space", "Office Space"].map(
              (option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              )
            )}
          </TextField>
          <TextField
            label="Area"
            name="area"
            type="number"
            placeholder="Area of the property"
            value={values.area}
            color="tertiary"
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">sq. feet</InputAdornment>
              ),
            }}
          />
          <TextField
            label="Floors"
            name="floors"
            type="number"
            placeholder="Number of floors"
            value={values.floors}
            color="tertiary"
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">floors</InputAdornment>
              ),
            }}
          />
          <TextField
            label="Property Facing"
            name="facing"
            select
            SelectProps={{ native: true }}
            value={values.facing}
            color="tertiary"
            onChange={handleChange}
          >
            <option value="" disabled>
              Select direction
            </option>
            {[
              "North",
              "South",
              "East",
              "West",
              "North-East",
              "North-West",
              "South-East",
              "South-West",
            ].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </TextField>
        </div>

        {/* Address Section */}
        <div className="flex flex-col gap-4 my-2">
          <h5 className="mb-1">
            <LocationOnIcon /> Address
          </h5>
          <AutoSuggestField
            label="Location"
            name="location"
            value={values.location}
            handleChange={handleChange}
          />
          <TextField
            label="Street Name / Landmark"
            name="streetName"
            type="text"
            value={values.streetName}
            color="tertiary"
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="text-center mt-2">
        <Button
          disabled={isProcessing}
          type="submit"
          variant="contained"
          size="large"
          color="primary"
          sx={{
            color: "white",
            "&:hover": {
              backgroundColor: "primary.dark",
              opacity: [0.9, 0.8, 0.7],
            },
            width: "25%",
          }}
        >
          {isProcessing ? (
            <CircularProgress
              size={26}
              sx={{
                color: "#fff",
              }}
            />
          ) : (
            "Update"
          )}
        </Button>
      </div>
    </>
  );
};

export default UpdatePropertyForm;
