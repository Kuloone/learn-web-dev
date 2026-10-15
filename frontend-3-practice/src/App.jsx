import { useState } from 'react';
import { getToday, fetchSlots, MONTHS_GENITIVE } from './utils/date';
import Header from './components/Header';
import ProgressBar from './components/ProgressBar';
import CalendarSection from './components/CalendarSection';
import TimeSection from './components/TimeSection';
import BottomPanel from './components/BottomPanel';
import Footer from './components/Footer';

export default function App() {
    const today = getToday();

    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [selectedDay, setSelectedDay] = useState(today.getDate());
    const [selectedTime, setSelectedTime] = useState(null);
    const [slots, setSlots] = useState(fetchSlots());

    function handleDaySelect(day) {
        setSelectedDay(day);
        setSelectedTime(null);
        setSlots(fetchSlots());
    }

    function handleTimeSelect(time) {
        setSelectedTime(time);
    }

    function handlePrevMonth() {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
        setSelectedDay(null);
        setSelectedTime(null);
    }

    function handleNextMonth() {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
        setSelectedDay(null);
        setSelectedTime(null);
    }

    function handleSubmit() {
        if (selectedDay && selectedTime) {
            alert(`Вы записаны на ${selectedDay} ${MONTHS_GENITIVE[currentMonth]} ${currentYear} в ${selectedTime}`);
        }
    }

    return (
        <>
            <Header />
            <ProgressBar />
            <main className="main-content">
                <div className="container">
                    <div className="page-titles">
                        <span className="eyebrow">ШАГ 3 ИЗ 5</span>
                        <h1 className="main-title">Выберите дату и время</h1>
                    </div>

                    <div className="booking-grid">
                        <CalendarSection
                            currentMonth={currentMonth}
                            currentYear={currentYear}
                            selectedDay={selectedDay}
                            today={today}
                            onDaySelect={handleDaySelect}
                            onPrevMonth={handlePrevMonth}
                            onNextMonth={handleNextMonth}
                        />
                        <TimeSection
                            selectedDay={selectedDay}
                            currentMonth={currentMonth}
                            slots={slots}
                            selectedTime={selectedTime}
                            onTimeSelect={handleTimeSelect}
                        />
                    </div>

                    <BottomPanel
                        selectedDay={selectedDay}
                        currentMonth={currentMonth}
                        selectedTime={selectedTime}
                        onSubmit={handleSubmit}
                    />
                </div>
            </main>
            <Footer />
        </>
    );
}