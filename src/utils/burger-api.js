import { BASE_URL } from './const-variables/app-variables';

function request(endpoint, options) {
  return fetch(`${BASE_URL}${endpoint}`, options).then(checkResponse);
}

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  throw new Error(`Fetch data from API error: ${res.status}`);
}

export function getIngredients() {
  return request('/ingredients');
}

export function createOrder(ingredientIds) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ingredients: ingredientIds }),
  };
  return request('/orders', options);
}
