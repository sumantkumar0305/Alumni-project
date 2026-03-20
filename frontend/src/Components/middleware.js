export function backendAPI(){
    const api =
      process.env.REACT_APP_BACKEND_URL ||
      "http://localhost:8000";

    return api.replace(/\/$/, "");
}

export function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}