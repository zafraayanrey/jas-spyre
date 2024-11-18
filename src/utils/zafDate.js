export function zafDate() {
  const currentDate = new Date();
  const today = `${currentDate.getFullYear()}-${
    currentDate.getMonth() + 1
  }-${currentDate.getDate()}`;

  return today;
}
