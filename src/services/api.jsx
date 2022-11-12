import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
export const PER_PAGE = 12;
const SEARCH_PARAMS = new URLSearchParams({
  key: '29647575-185f66041bf3c07be0622bf5a',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
  per_page: `${PER_PAGE}`,
});

export async function fetchImages(query = '', page = 1) {
  try {
    const response = await axios.get(
      `${BASE_URL}?${SEARCH_PARAMS}&q=${query}&page=${page}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}
