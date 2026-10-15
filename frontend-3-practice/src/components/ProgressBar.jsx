export default function ProgressBar() {
    return (
        <section className="progress-section">
            <div className="container">
                <div className="progress-bar">
                    <div className="step completed">1</div>
                    <div className="step-divider completed-divider">
                        <div className="line-long"></div>
                        <div className="line-short"></div>
                    </div>
                    <div className="step completed">2</div>
                    <div className="step-divider completed-divider">
                        <div className="line-long"></div>
                        <div className="line-short"></div>
                    </div>
                    <div className="step active">3</div>
                    <div className="step-divider active-divider">
                        <div className="line-long"></div>
                        <div className="line-short"></div>
                    </div>
                    <div className="step">4</div>
                    <div className="step-divider">
                        <div className="line-long"></div>
                        <div className="line-short"></div>
                    </div>
                    <div className="step">5</div>
                </div>
            </div>
        </section>
    );
}