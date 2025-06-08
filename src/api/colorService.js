const API_URL = "https://bootcamp2025.depster.me/api/colors";

export async function fetchColorsFromAPI(token, limit = 10) {
  if (!token) throw new Error("Access token is missing.");

  const response = await fetch(`${API_URL}?limit=${limit}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Failed to fetch colors.");
  const data = await response.json();
  return data.data || [];
}
