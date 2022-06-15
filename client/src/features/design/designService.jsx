import axios from "axios";

const API_URL = "/api/design";

// Create new post
const createDesign = async (data, token) => {
  console.log(data);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, data, config);

  return response.data;
};

// Get user goals
const getDesigns = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};
// Get user goals
const getDesign = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  console.log(id);

  const response = await axios.get(`${API_URL}/${id}`, config);

  return response.data;
};
// edit user design
const editDesign = async ( data , token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  let img = data.image

  console.log(data.id + "+" + img);

  const response = await axios.put(`${API_URL}/edit/${data.id}`, data.image, config);

  return response.data;
};

const postService = {
  createDesign,
  getDesigns,
  getDesign,
  editDesign,
};

export default postService;
