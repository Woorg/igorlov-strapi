import { formatInTimeZone } from 'date-fns-tz';
import ru from 'date-fns/locale/ru/index.js';
const dateFormat = (date: Date | string, format: string = 'dd MMM, yyyy'): string => {
	return formatInTimeZone(date, 'Europe/Moscow', format, {
		locale: ru,
	});
};

export default dateFormat;
