import axios from 'axios';

const API_KEY = '28799879-b9399141b8be01027c0bc8041';

axios.defaults.baseURL = 'https://pixabay.com/api';

axios.defaults.params = {
  key: API_KEY,
  orientation: 'horizontal',
  image_type: 'photo',
  per_page: 12,
};

const getImages = async (query, page) => {
  const { data } = await axios.get(`?q=${query}&page=${page}`);
  return data;
};

const imagesApi = { getImages };

export default imagesApi;
