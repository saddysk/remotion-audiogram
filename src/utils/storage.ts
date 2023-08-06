import axios from "axios";

export const uploadFileToCloudinary = async (file: File): Promise<string> => {
  const { REACT_APP_CLOUD_NAME, REACT_APP_API_KEY, REACT_APP_UPLOAD_PRESET } =
    process.env;

  if (!file) {
    alert("Please select an audio file.");
    return "";
  }

  const URL = `https://api.cloudinary.com/v1_1/${REACT_APP_CLOUD_NAME}/raw/upload`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", REACT_APP_API_KEY as string);
  formData.append("upload_preset", REACT_APP_UPLOAD_PRESET as string);

  const response = await axios.post(URL, formData);

  if (response.status !== 200) {
    return "";
  }

  return response.data.url;
};
