import { MONTHS_GENITIVE } from '../utils/date';

export default function BottomPanel({
    selectedDay,
    currentMonth,
    selectedTime,
    onSubmit
}) {
    const isComplete = Boolean(selectedDay && selectedTime);
    const detailsText = isComplete
        ? `${selectedDay} ${MONTHS_GENITIVE[currentMonth]}, ${selectedTime}`
        : 'Выберите дату и время';

    return (
        <div className="bottom-panel">
            <div className="summary">
                <span className="summary-details">{detailsText}</span>
                <span className="summary-price">Итого: 2 500 ₽</span>
            </div>
            <button
                className="primary-btn"
                disabled={!isComplete}
                onClick={onSubmit}
            >
                Продолжить
            </button>
        </div>
    );
}