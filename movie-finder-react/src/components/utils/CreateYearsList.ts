function createYearsList() {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1999 }, (_, i) => 2000 + i);
  return years;
}

export default createYearsList;