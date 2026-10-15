export const MONTHS_NOMINATIVE = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
];

export const MONTHS_GENITIVE = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
];

export const DAYS_OF_WEEK = [
    'Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'
];

export const WEEKDAYS_SHORT = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export function getToday() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
}

export function fetchSlots() {
    return [
        { time: '10:00', available: true },
        { time: '11:00', available: false },
        { time: '12:00', available: true },
        { time: '13:00', available: false },
        { time: '14:00', available: true },
        { time: '15:00', available: true },
        { time: '16:00', available: true },
        { time: '17:00', available: true }
    ];
}

export function compareDates(date1, date2) {
    const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate()).getTime();
    const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate()).getTime();
    if (d1 < d2) return -1;
    if (d1 > d2) return 1;
    return 0;
}

export function isDateSelectable(day, month, year, today) {
    const candidate = new Date(year, month, day);
    return compareDates(candidate, today) >= 0;
}

export function buildCalendarGrid(year, month) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay();
    const offset = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;
    const prevMonthLastDay = new Date(year, month, 0).getDate();

    const cells = [];

    for (let i = offset - 1; i >= 0; i--) {
        cells.push({ day: prevMonthLastDay - i, otherMonth: true, past: true });
    }
    for (let d = 1; d <= daysInMonth; d++) {
        cells.push({ day: d, otherMonth: false });
    }
    const totalCells = Math.ceil(cells.length / 7) * 7;
    let nextDay = 1;
    while (cells.length < totalCells) {
        cells.push({ day: nextDay, otherMonth: true, past: false });
        nextDay++;
    }

    const weeks = [];
    for (let i = 0; i < cells.length; i += 7) {
        weeks.push(cells.slice(i, i + 7));
    }
    return weeks;
}