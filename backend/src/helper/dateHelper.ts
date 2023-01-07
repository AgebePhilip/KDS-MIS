
function numberOfDayToExpiry(currentDate: Date): Date {
  const newDate = new Date();
  newDate.setTime(currentDate.getTime() + 31556952000)

  console.log(newDate,"new Date");
  console.log(currentDate.getFullYear());
  
  
  return newDate;
}


function isDateValid(date: Date | undefined): boolean {

  if(!date) return false;

  const currentDate = new Date();

  return date.getTime() > currentDate.getTime();
}


export {
  numberOfDayToExpiry,
  isDateValid
}