import { format } from 'date-fns';

export const useDateHandler = (date: Date) => {
  const toDDMMYYYY = () => {
    return format(date, 'dd/MM/yyyy');
  };

  const toDDMMYYYYHHMMSS = () => {
    return format(date, 'dd/MM/yyyy hh:mm:ss');
  };

  return {
    toDDMMYYYY,
    toDDMMYYYYHHMMSS,
  };
};
