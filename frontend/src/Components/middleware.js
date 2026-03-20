export function backendAPI(){
    // Prefer an environment variable so the app works after deployment.
    // Example: REACT_APP_BACKEND_URL="https://your-domain.com"
    // Fallback to local dev.
    const api =
      process.env.REACT_APP_BACKEND_URL ||
      "http://localhost:8000";

    return api.replace(/\/$/, "");
}

export function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}