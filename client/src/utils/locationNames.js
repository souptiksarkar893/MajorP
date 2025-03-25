import axios from 'axios';

// Fetch location suggestions based on the query
export const locationNames = async (query) => {
  if (!query) return [];

  const username = import.meta.env.VITE_GEONAMES_USERNAME;
  const url = `https://secure.geonames.org/searchJSON?q=${query}&maxRows=5&username=${username}`;

  try {
    const response = await axios.get(url);
    return response.data.geonames.map((location) => ({
      name: location.name,
      country: location.countryName,
    }));
  } catch (error) {
    console.error('Error fetching GeoNames data:', error);
    return [];
  }
};


// export const locationNames = [
//   "Andhra Pradesh",
//   "Arunachal Pradesh",
//   "Assam",
//   "Bihar",
//   "Chhattisgarh",
//   "Goa",
//   "Gujarat",
//   "Haryana",
//   "Himachal Pradesh",
//   "Jharkhand",
//   "Karnataka",
//   "Kerala",
//   "Madhya Pradesh",
//   "Maharashtra",
//   "Manipur",
//   "Meghalaya",
//   "Mizoram",
//   "Nagaland",
//   "Odisha",
//   "Punjab",
//   "Rajasthan",
//   "Sikkim",
//   "Tamil Nadu",
//   "Telangana",
//   "Tripura",
//   "Uttar Pradesh",
//   "Uttarakhand",
//   "West Bengal",
//   "Andaman and Nicobar Islands",
//   "Chandigarh",
//   "Dadra and Nagar Haveli and Daman and Diu",
//   "Lakshadweep",
//   "Delhi",
//   "Puducherry"
// ];
