interface Props {
  value: number;
}

export const FormatNumeric = ({ value }: Props) => {
  const currency = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });
  return currency.format(value);
};

// export const
