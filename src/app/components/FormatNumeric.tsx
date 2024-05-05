export const FormatNumeric = (value: number) => {
  const currency = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    trailingZeroDisplay: "stripIfInteger",
  });
  return currency.format(value);
};
