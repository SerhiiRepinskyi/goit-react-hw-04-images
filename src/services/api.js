import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const API_KEY = '33991160-081e616815ce3868e88aa394f';
const PER_PAGE = 12;

export default async function fetchImagesOnQuery(searchQuery, page) {
  if (searchQuery) {
    const response = await axios.get(
      `${URL}?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
    );
    if (!response.status) {
      throw new Error(response.status);
    }
    return response.data;
  }
}

// export default fetchImagesOnQuery;
