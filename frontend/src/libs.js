export const formatDateTime = (date) => {
  const dateObj = new Date(date);
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = dateObj.getFullYear();
  const hours = String(dateObj.getHours()).padStart(2, "0");
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");
  const ampm = dateObj.getHours() >= 12 ? "PM" : "AM";

  return `${day}/${month}/${year} ${
    hours > 12 ? hours - 12 : hours
  }:${minutes} ${ampm}`;
};
