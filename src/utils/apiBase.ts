export const getApiBaseUrl = (): string => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (typeof window !== "undefined") {
    // Dynamically use window.location.origin to support proxying through any port forwarding or tunnel.
    // Only use the env variable if it is explicitly configured to a non-localhost external domain.
    if (envUrl && !envUrl.includes("localhost") && !envUrl.includes("127.0.0.1")) {
      return envUrl.endsWith("/api") ? envUrl.slice(0, -4) : envUrl;
    }
    return window.location.origin;
  }
  if (envUrl) {
    return envUrl.endsWith("/api") ? envUrl.slice(0, -4) : envUrl;
  }
  return "http://localhost:3000";
};
