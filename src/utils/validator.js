export const required = value => (value ? undefined : 'Required');
// export const number = value => (value && !Number.isNaN(value) ? 'Must be a number' : undefined);
export const number = value => (value && /^[0-9]+$/.test(value) ? undefined : 'Must be a number');
export const digiLength = n => value => (value && value.toString().length === n ? undefined : `Must have ${n} characters`);
export const digiLength10 = digiLength(10);
export const digiLength13 = digiLength(13);
export const maxLength = n => value => (value && value.toString().length <= n ? undefined : `Must be less than ${n} characters`);
export const maxLengthOrNull = n => (value) => {
  if (value) {
    return value.toString().length <= n ? undefined : `Must be less than ${n} characters`;
  }
  return undefined;
};
export const maxLengthOrNull25 = maxLengthOrNull(25);
export const maxLength14 = maxLength(14);
export const maxLength20 = maxLength(20);
export const maxLength25 = maxLength(25);
export const maxLength30 = maxLength(30);
export const maxLength50 = maxLength(50);
export const maxLength100 = maxLength(100);
export const maxLength300 = maxLength(300);
export const check2Decimal = value => (value && (/^(?=.*[1-9])\d*(?:\.\d{1,2})?$/.test(value) || /^[0-9]{1,6}$/.test(value)) ? undefined : 'Decimal must be less than or equal 2 characters');
export const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined
);
export const date = value => (value && /^\d{4}-\d{2}-\d{2}$/.test(value) ? undefined : 'Invalid date format');
export const timeBefore = (startTime, endTime) => (startTime && endTime && startTime < endTime ? undefined : 'time in must be before time out');
export const timeAfter = (endTime, startTime) => (startTime && endTime && endTime > startTime ? undefined : 'time out must be after time in');
export const startTimeCheck = (startTime, endTime) => (startTime && endTime && startTime < endTime ? undefined : 'start time must be before end time');
export const endTimeCheck = (endTime, startTime) => (startTime && endTime && endTime > startTime ? undefined : 'end time must be after start time');
export const dateBefore = (startDate, endDate) => (startDate && endDate && startDate <= endDate ? undefined : 'Start date must be before end date');
export const dateAfter = (endDate, startDate) => (startDate && endDate && endDate >= startDate ? undefined : 'End date must be after start date');
export const probationDateAfter = (probationDate, startDate) => (probationDate && startDate && probationDate >= startDate ? undefined : 'probation date must be after start date');
export const englishName = value => (value && /^[A-Z][a-z]+$/.test(value) ? undefined : 'Must be English and start with capital letter');
export const thai = value => (value && /^[ก-๙]+$/.test(value) ? undefined : 'Must be Thai');
export const lineId = value => (value && /^[A-Za-z0-9._-]+$/.test(value) ? undefined : 'Invallid line ID');
export const gpax = value => (value && /^[0-3].\d{2}$/.test(value) || /^4.00$/.test(value) ? undefined : 'Grade must be 0.00-4.00');
