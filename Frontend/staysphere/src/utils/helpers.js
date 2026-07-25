export const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(
    amount || 0
  );

export const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" });

export const formatDateTime = (date) =>
  new Date(date).toLocaleString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

export const nightsBetween = (checkIn, checkOut) => {
  const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
  return nights > 0 ? nights : 0;
};

export const getImageUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  const base = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace("/api", "");
  return `${base}${path}`;
};

export const statusBadgeClass = (status) => {
  const map = {
    available: "badge-status-available",
    occupied: "badge-status-occupied",
    maintenance: "badge-status-maintenance",
    pending: "badge-booking-pending",
    confirmed: "badge-booking-confirmed",
    "checked-in": "badge-booking-checked-in",
    "checked-out": "badge-booking-checked-out",
    cancelled: "badge-booking-cancelled",
  };
  return map[status] || "badge-status-available";
};

export const getErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || "Something went wrong. Please try again.";
