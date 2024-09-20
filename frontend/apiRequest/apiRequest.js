import axios from "axios";
let BaseURL = "https://antopolis-dusky.vercel.app/api/v1";

//read category
export const categoryListRequest = async () => {
  try {
    let res = await axios.get(BaseURL + "/read-category");
    if (res.status === 200) {
      return res.data.data;
    } else {
      return false;
    }
  } catch (error) {
    return [];
  }
};

export const categoryCrateRequest = async (postBody) => {
  try {
    let res = await axios.post(BaseURL + "/create-category", postBody);
    return res.data;
  } catch (error) {
    // If there's an error, return the error message from the response if it exists
    if (error.response && error.response.data) {
      return error.response.data;
    } else {
      // Return a generic error message if there's no specific response from the backend
      return { status: "fail", message: "Something went wrong" };
    }
  }
};

//create animal
export const createAnimalRequest = async (postBody) => {
  try {
    let res = await axios.post(BaseURL + "/create-animal", postBody);
    if (res.status === 201) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

//read animal
export const AllAnimalListRequest = async () => {
  try {
    let res = await axios.get(BaseURL + "/readAll-animal");
    if (res.status === 200) {
      return res.data.data;
    } else {
      return false;
    }
  } catch (error) {
    return [];
  }
};

export const fetchAnimalsByCategory = async (categoryName) => {
  try {
    let res = await axios.get(
      BaseURL + "/readAll-animal-bycategory/" + categoryName
    );
    if (res.status === 200) {
      return res.data.data;
    } else {
      return false;
    }
  } catch (error) {
    return [];
  }
};
