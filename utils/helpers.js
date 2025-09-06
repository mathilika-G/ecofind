export const generateId = () => {
  // simple id generator
  return Math.random().toString(36).substring(2, 9);
};
