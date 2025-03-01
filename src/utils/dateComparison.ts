const dateComparison = (date1: string | Date, date2: string | Date): number => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  if (d1.getTime() === d2.getTime()) {
    return 0;
  }
  return d1.getTime() > d2.getTime() ? 1 : -1;
}

export default dateComparison;