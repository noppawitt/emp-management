export const required = value => (value ? undefined : 'Required');
// export const number = value => (value && !Number.isNaN(value) ? 'Must be a number' : undefined);
export const number = value => (value && /^[0-9]+$/.test(value) ? undefined : 'Must be a number');
export const length = (value, n) => (value && value.toString().length === n ? undefined : `Must have ${n} characters`);
export const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined
);
export const date = value => (value && /^\d{4}-\d{2}-\d{2}$/.test(value) ? undefined : 'Invalid date format');
export const timeBefore = (startTime, endTime) => (startTime && endTime && startTime < endTime ? undefined : 'Start time must come before end time');
export const timeAfter = (endTime, startTime) => (startTime && endTime && endTime > startTime ? undefined : 'End time must come after start time');
export const dateBefore = (startDate, endDate) => (startDate && endDate && startDate < endDate ? undefined : 'Start date must come before end date');
export const dateAfter = (endDate, startDate) => (startDate && endDate && endDate > startDate ? undefined : 'End date must come before start date');
export const englishName = value => (value && /^[A-Z][a-z]+$/.test(value) ? undefined : 'Must be English and start with capital letter');
export const thai = value => (value && /^[ก-๙]+$/.test(value) ? undefined : 'Must be Thai');
export const lineId = value => (value && /^[A-Za-z0-9._-]+$/.test(value) ? undefined : 'Invallid line ID');
