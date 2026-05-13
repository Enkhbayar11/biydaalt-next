const BASE_URL = "https://jsonplaceholder.typicode.com";

export async function apiGet(path) {
  const res = await fetch(`${BASE_URL}${path}`);

  if (!res.ok) {
    throw new Error("API request failed");
  }

  return res.json();
}
