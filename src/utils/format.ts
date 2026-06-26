export const formatCurrency = (amount: number, currencySymbol: string = '$') => {
  const isNegative = amount < 0;
  const absAmount = Math.abs(amount).toFixed(2);
  const formatted = absAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `${currencySymbol}  ${isNegative ? '-' : ''}${formatted}`;
};

export const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};
