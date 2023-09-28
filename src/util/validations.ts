export const isNotEmpty = (value: any) => {
  return value && value !== "";
};

export const isNumber = (value: any) => {
  return value && !isNaN(parseFloat(value));
};

export const toNumber: (value: any) => number = (value) => {
  return parseFloat(value);
};

export const toNumberOrNull: (value: any) => number | null = (value) => {
  if (isNumber(value)) {
    return parseFloat(value);
  } else {
    return null;
  }
};
