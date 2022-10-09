export const getFullName = (firstName?: string, lastName?: string) => {
  if (!firstName || !lastName) return '';

  return `${lastName} ${firstName}`;
};
