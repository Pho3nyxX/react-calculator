function History({ history, historyRef }) {
    return (
        <div className="history" ref={historyRef}>
            {history.map((item, index) => (
                <div key={index} className="history-item">
                    {item}
                </div>
            ))}
        </div>
    );
}

export default History;