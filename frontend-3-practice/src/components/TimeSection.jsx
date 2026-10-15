import { MONTHS_GENITIVE } from '../utils/date';

export default function TimeSection({
    selectedDay,
    currentMonth,
    slots,
    selectedTime,
    onTimeSelect
}) {
    const headerText = selectedDay
        ? `Доступное время на ${selectedDay} ${MONTHS_GENITIVE[currentMonth]}`
        : 'Выберите дату в календаре';

    return (
        <section className="time-section card">
            <h2>{headerText}</h2>
            <div className="time-grid">
                {selectedDay && slots.map((slot) => {
                    let className = 'time-btn';
                    if (!slot.available) {
                        className += ' occupied';
                    } else if (selectedTime === slot.time) {
                        className += ' selected';
                    }

                    return (
                        <button
                            key={slot.time}
                            className={className}
                            disabled={!slot.available}
                            onClick={slot.available ? () => onTimeSelect(slot.time) : undefined}
                        >
                            {slot.time}
                            {!slot.available && <span>Занято</span>}
                        </button>
                    );
                })}
            </div>
        </section>
    );
}