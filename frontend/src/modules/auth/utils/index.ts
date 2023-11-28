export const formatError = (error: string | string[]) => {
  return Array.isArray(error) ? error.join(', ') : error;
};
