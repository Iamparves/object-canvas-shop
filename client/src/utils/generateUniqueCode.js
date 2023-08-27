export const generateUniqueCode = () => {
  const timestamp = Date.now();
  const randomSuffix = Math.floor(Math.random() * 1000);
  const uniqueCode = `${timestamp}${randomSuffix}`;
  return uniqueCode;
};
