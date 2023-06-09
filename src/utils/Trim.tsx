const trimText = (text: string, limit: number = 10) => {
  if (text.length < limit) return text;
  return text.slice(0, limit) + "...";
};

export { trimText };
