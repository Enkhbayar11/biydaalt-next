import { apiGet } from "./apiClient";

export async function getNotes() {
  const data = await apiGet("/posts?_limit=8");

  return data.map((item) => ({
    id: item.id,
    title: item.title,
    body: item.body,
  }));
}