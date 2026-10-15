export default function Footer() {
    return (
        <footer className="footer">
            <div className="container footer-grid">
                <div className="footer-col">
                    <div className="footer-logo">LOGO</div>
                    <p className="footer-desc">Дружелюбное описание услуг</p>
                </div>
                <div className="footer-col">
                    <h3>КОНТАКТЫ</h3>
                    <div className="contact-item">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <p>ул. Садовая, 15, Москва</p>
                    </div>
                    <div className="contact-item">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                        <p>+7 (495) 123-45-67</p>
                    </div>
                </div>
                <div className="footer-col">
                    <h3>РЕЖИМ РАБОТЫ</h3>
                    <p>Пн–Пт: 9:00 – 21:00</p>
                    <p>Сб–Вс: 10:00 – 19:00</p>
                </div>
            </div>
            <div className="container footer-bottom">
                <p>© 2026. Все права защищены.</p>
                <a href="#">Политика конфиденциальности</a>
            </div>
        </footer>
    );
}