const startYear = 1960;
const endYear = new Date().getFullYear();

function dateRange() {
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, index) => startYear + index
  );

  return years;
}

export default dateRange();
