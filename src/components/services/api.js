const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '24820519-59aa99241bf38d02e4bce65a9';

export default async function fetchRequest(newName, pageNum) {
  return await fetch(
    `${BASE_URL}?key=${API_KEY}&q=${newName}&image_type=photo&pretty=true&page=${pageNum}&per_page=12`
  );
}
