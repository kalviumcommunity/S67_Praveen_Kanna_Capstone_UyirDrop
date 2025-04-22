export const getFromStorage = (key) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (err) {
    console.error('Error reading from localStorage:', err);
    return null;
  }
};

export const setInStorage = (key, value) => {
  if (!value) {
    return;
  }
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error('Error saving to localStorage:', err);
  }
};

export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error('Error removing from localStorage:', err);
  }
};