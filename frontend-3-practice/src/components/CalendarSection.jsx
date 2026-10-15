import {
    MONTHS_NOMINATIVE,
    WEEKDAYS_SHORT,
    buildCalendarGrid,
    isDateSelectable
} from '../utils/date';

export default function CalendarSection({
    currentMonth,
    currentYear,
    selectedDay,
    today,
    onDaySelect,
    onPrevMonth,
    onNextMonth
}) {
    const weeks = buildCalendarGrid(currentYear, currentMonth);

    return (
        <section className="calendar-section card">
            <div className="calendar-header">
                <h2>{MONTHS_NOMINATIVE[currentMonth]} {currentYear}</h2>
                <div className="calendar-arrows">
                    <button className="arrow-btn" onClick={onPrevMonth}>&lt;</button>
                    <button className="arrow-btn" onClick={onNextMonth}>&gt;</button>
                </div>
            </div>

            <div className="calendar-grid">
                {WEEKDAYS_SHORT.map((dayName) => (
                    <div key={dayName} className="weekday">
                        {dayName}
                    </div>
                ))}

                {weeks.map((week, weekIndex) =>
                    week.map((cell, dayIndex) => {
                        const selectable = !cell.otherMonth && isDateSelectable(cell.day, currentMonth, currentYear, today);
                        const isSelected = selectable && selectedDay === cell.day;

                        let className = 'day';
                        if (!selectable) {
                            className += ' past';
                        } else if (isSelected) {
                            className += ' selected';
                        }

                        const displayValue = cell.otherMonth && !cell.past ? '' : cell.day;

                        return (
                            <div
                                key={`${weekIndex}-${dayIndex}`}
                                className={className}
                                onClick={selectable ? () => onDaySelect(cell.day) : undefined}
                            >
                                {displayValue}
                            </div>
                        );
                    })
                )}
            </div>
        </section>
    );
}