export const getDayListForMonth = (month: number, year: number) => {
  const daysInMonth = new Date(year, month, 0).getDate();
  return Array.from({ length: daysInMonth }, (_, i) => ``+(i + 1));
}

export const getYearList = () => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 100 }, (_, i) => ``+(currentYear - i));
}

export const monthToAcronym = (month: number) => {
  const monthList = getMonthList();
  return monthList[month].label;
}

export const getMonthList = () => {
  return [
    { value: '0', label: "Jan" },
    { value: '1', label: "Feb" },
    { value: '2', label: "Mar" },
    { value: '3', label: "Apr" },
    { value: '4', label: "May" },
    { value: '5', label: "Jun" },
    { value: '6', label: "Jul" },
    { value: '7', label: "Aug" },
    { value: '8', label: "Sep" },
    { value: '9', label: "Oct" },
    { value: '10', label: "Nov" },
    { value: '11', label: "Dec" },
  ];
}
  