export const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatNumber = (value) => {
  return new Intl.NumberFormat('pt-BR').format(value);
};

export const formatPercent = (value) => {
  return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
};
