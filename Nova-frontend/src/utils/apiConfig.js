// Utility to get the correct API URL based on the current hostname
export const getApiUrl = () => {
  // Check if REACT_APP_API_URL is set in environment
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }

  // Get current hostname and port
  const hostname = window.location.hostname;
  const protocol = window.location.protocol;

  // If accessing from localhost, use localhost:5000
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:5000';
  }

  // If accessing from network IP (like 192.168.x.x), use the same IP for backend
  // Backend runs on port 5000
  return `${protocol}//${hostname}:5000`;
};

