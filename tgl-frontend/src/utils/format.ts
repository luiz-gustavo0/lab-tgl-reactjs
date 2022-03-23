export const formatNumber = (value: number) => {
  const numberFormated = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);

  return numberFormated;
};

export const formatDate = (date: Date | string) => {
  const dateFormated = new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  });

  return dateFormated;
};
