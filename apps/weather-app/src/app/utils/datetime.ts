import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export const getDateTime = (offset: number, short = false) => {
  const time = dayjs
    .utc()
    .utcOffset(offset / 60)
    .format(short ? 'h:mm A' : 'ddd MMM D, h:mm A');
  return time;
};

export const getDate = (date: string) => {
  const dateTime = dayjs.utc(date).format('ddd MMM D, h:mm A');
  return dateTime;
};
