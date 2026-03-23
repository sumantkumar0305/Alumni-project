export function backendAPI(){
    const api =
      process.env.REACT_APP_BACKEND_URL ||
      "https://alumnexus-backend-dipj.onrender.com";

    return api.replace(/\/$/, "");
}

export function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}
