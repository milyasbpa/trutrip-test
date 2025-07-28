export const titleCase = (str: string): string => {
  return str
    .split(/[\s_-]+/) // pisah dengan spasi, underscore, atau tanda hubung
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};
