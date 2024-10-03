import { format } from 'date-fns';

export const useDateHandler = (date: Date) => {
  const toDDMMYYYY = () => {
    return format(date, 'dd/MM/yyyy');
  };

  return {
    toDDMMYYYY,
  };
};
