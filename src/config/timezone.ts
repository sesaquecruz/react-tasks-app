import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

export const dateLocale = dayjs.extend(utc).locale('pt-br');
export const dateFormat = "DD/MM/YYYY HH:mm"
export const instantFormat = "YYYY-MM-DDTHH:mm:ss.SSSSSS[Z]";
