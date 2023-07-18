export const numberFormat = new Intl.NumberFormat("en-US");
export const usdFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});
export const compactNumberFormat = new Intl.NumberFormat("en-US", {
  notation: "compact",
});
export const shortNumberFormat = (value: number): string => {
  const absValue = Math.abs(value);
  const symbols = ["", "K", "M", "B", "T"];
  const tier = (Math.log10(absValue) / 3) | 0;
  if (tier === 0) return value.toString();
  const suffix = symbols[tier];
  const scale = Math.pow(10, tier * 3);
  const scaledValue = value / scale;
  const formattedValue = scaledValue.toFixed(1);
  return formattedValue + suffix;
};
