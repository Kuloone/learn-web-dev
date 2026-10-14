document.addEventListener('DOMContentLoaded', () => {

    const MONTHS_NOMINATIVE = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    const MONTHS_GENITIVE = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    function fetchSlots() {
        return [
            { time: "10:00", available: true },
            { time: "11:00", available: false },
            { time: "12:00", available: true },
            { time: "13:00", available: false },
            { time: "14:00", available: true },
            { time: "15:00", available: true },
            { time: "16:00", available: true },
            { time: "17:00", available: true }
        ];
    }

    const state = {
        currentMonth: today.getMonth(),
        currentYear: today.getFullYear(),
        selectedDate: new Date(today),
        selectedTime: null,
        slots: []
    };

    function buildCalendarGrid(year, month) {
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

    function compareDates(date1, date2) {
        const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate()).getTime();
        const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate()).getTime();
        if (d1 < d2) return -1;
        if (d1 > d2) return 1;
        return 0;
    }

    function isDateSelectable(date) {
        return compareDates(date, today) >= 0;
    }

    const calendarGrid = document.querySelector('.calendar-grid');
    const calendarMonthYear = document.querySelector('.calendar-header h2');
    const arrowPrev = document.querySelectorAll('.arrow-btn')[0];
    const arrowNext = document.querySelectorAll('.arrow-btn')[1];
    
    const timeGrid = document.querySelector('.time-grid');
    const timeHeader = document.querySelector('.time-section h2');
    const summaryDetails = document.querySelector('.summary-details');
    const primaryBtn = document.querySelector('.primary-btn');

    function renderCalendar() {
        calendarGrid.innerHTML = '';
        calendarMonthYear.textContent = `${MONTHS_NOMINATIVE[state.currentMonth]} ${state.currentYear}`;
        
        const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
        weekDays.forEach(day => {
            const dayEl = document.createElement('div');
            dayEl.className = 'weekday';
            dayEl.textContent = day;
            calendarGrid.appendChild(dayEl);
        });

        const weeks = buildCalendarGrid(state.currentYear, state.currentMonth);

        weeks.forEach(week => {
            week.forEach(cell => {
                const dayEl = document.createElement('div');
                dayEl.className = 'day';
                dayEl.textContent = cell.day;

                const cellDate = new Date(state.currentYear, state.currentMonth, cell.day);

                if (cell.otherMonth || !isDateSelectable(cellDate)) {
                    dayEl.classList.add('past');
                    if (cell.otherMonth && !cell.past) {
                        dayEl.textContent = ''; 
                    }
                } else {
                    dayEl.addEventListener('click', () => onDayClick(cellDate));
                    
                    if (state.selectedDate && compareDates(cellDate, state.selectedDate) === 0) {
                        dayEl.classList.add('selected');
                    }
                }

                calendarGrid.appendChild(dayEl);
            });
        });
    }

    function renderTimeSlots() {
        timeGrid.innerHTML = '';
        
        if (!state.selectedDate) {
            timeHeader.textContent = 'Выберите дату в календаре';
            return;
        }

        timeHeader.textContent = `Доступное время на ${state.selectedDate.getDate()} ${MONTHS_GENITIVE[state.selectedDate.getMonth()]}`;
        
        state.slots.forEach(slot => {
            const btn = document.createElement('button');
            btn.className = 'time-btn';
            btn.textContent = slot.time;
            
            if (!slot.available) {
                btn.classList.add('occupied');
                btn.disabled = true;
                const span = document.createElement('span');
                span.textContent = 'Занято';
                btn.appendChild(span);
            } else {
                if (state.selectedTime === slot.time) {
                    btn.classList.add('selected');
                }
                btn.addEventListener('click', () => onTimeSlotClick(slot.time));
            }
            
            timeGrid.appendChild(btn);
        });
    }

    function updateBottomBar() {
        if (!state.selectedDate || !state.selectedTime) {
            summaryDetails.textContent = 'Выберите дату и время';
            return;
        }
        summaryDetails.textContent = `${state.selectedDate.getDate()} ${MONTHS_GENITIVE[state.selectedDate.getMonth()]}, ${state.selectedTime}`;
    }

    function updateButtonState() {
        if (state.selectedDate && state.selectedTime) {
            primaryBtn.disabled = false;
        } else {
            primaryBtn.disabled = true;
        }
    }

    function onDayClick(date) {
        state.selectedDate = date;
        state.selectedTime = null; 
        state.slots = fetchSlots();
        
        renderCalendar();
        renderTimeSlots();
        updateBottomBar();
        updateButtonState(); 
    }

    function onTimeSlotClick(time) {
        state.selectedTime = time;
        renderTimeSlots();
        updateBottomBar();
        updateButtonState(); 
    }

    arrowPrev.addEventListener('click', () => {
        state.currentMonth--;
        if (state.currentMonth < 0) {
            state.currentMonth = 11;
            state.currentYear--;
        }
        state.selectedDate = null;
        state.selectedTime = null;
        renderCalendar();
        renderTimeSlots();
        updateBottomBar();
        updateButtonState();
    });

    arrowNext.addEventListener('click', () => {
        state.currentMonth++;
        if (state.currentMonth > 11) {
            state.currentMonth = 0;
            state.currentYear++;
        }
        state.selectedDate = null;
        state.selectedTime = null;
        renderCalendar();
        renderTimeSlots();
        updateBottomBar();
        updateButtonState();
    });

    primaryBtn.addEventListener('click', () => {
        if (!primaryBtn.disabled) {
            alert(`Успешно! Вы записаны на ${state.selectedDate.getDate()} ${MONTHS_GENITIVE[state.selectedDate.getMonth()]} в ${state.selectedTime}. (Переход на следующий экран)`);
        }
    });

    function init() {
        state.slots = fetchSlots();
        renderCalendar();
        renderTimeSlots();
        updateBottomBar();
        updateButtonState();
    }

    init();
});