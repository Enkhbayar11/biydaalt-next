import { apiGet } from "./apiClient";

export async function getTasks() {
  const data = await apiGet("/todos?_limit=8");

  return data.map((item) => ({
    id: item.id,
    title: item.title,
    done: item.completed,
    createdAt: new Date().toISOString(),
  }));
}