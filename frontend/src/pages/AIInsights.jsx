import { useState } from "react";

export default function EarthquakePage() {
    const [messages, setMessages] = useState([
        {
            from: "bot",
            text: "Hi 👋 — I can help analyze earthquakes & oceans. Ask anything!"
        }
    ]);

    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSend(e) {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { from: "user", text: input };

        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch("http://127.0.0.1:8000/ai/ask", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question: userMessage.text })
            });

            const data = await res.json();

            setMessages(prev => [
                ...prev,
                { from: "bot", text: data.answer || "I'm not sure — try asking differently!" }
            ]);

        } catch (err) {
            setMessages(prev => [
                ...prev,
                { from: "bot", text: "⚠ Error contacting AI backend." }
            ]);
        }

        setLoading(false);
    }

    return (
        <div
            style={{
                maxWidth: "900px",
                margin: "0 auto",
                padding: "24px",
                color: "white"
            }}
        >
            <h2 style={{ fontSize: "22px", marginBottom: "10px", fontWeight: 700 }}>
                AI Research Assistant
            </h2>

            {/* CHAT WINDOW */}
            <div
                style={{
                    background: "rgba(18,24,38,.92)",
                    border: "1px solid rgba(255,255,255,.12)",
                    borderRadius: "18px",
                    padding: "14px",
                    height: "460px",
                    overflowY: "auto",
                    boxShadow: "0 20px 40px rgba(0,0,0,.35)"
                }}
            >
                {messages.map((m, i) => (
                    <div
                        key={i}
                        style={{
                            display: "flex",
                            justifyContent: m.from === "user" ? "flex-end" : "flex-start",
                            marginBottom: "10px"
                        }}
                    >
                        <div
                            style={{
                                maxWidth: "70%",
                                padding: "10px 14px",
                                borderRadius: "16px",
                                lineHeight: "1.5",
                                background:
                                    m.from === "user"
                                        ? "#46c3ff"
                                        : "rgba(255,255,255,.12)",
                                color: m.from === "user" ? "black" : "white",
                                border:
                                    m.from === "user"
                                        ? "none"
                                        : "1px solid rgba(255,255,255,.18)"
                            }}
                        >
                            {m.text}
                        </div>
                    </div>
                ))}
            </div>

            {/* INPUT BAR */}
            <form onSubmit={handleSend} style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Ask something about earthquakes or oceans…"
                    style={{
                        flex: 1,
                        padding: "10px",
                        borderRadius: "10px",
                        border: "1px solid #bbb",
                        outline: "none",
                        color: "black"
                    }}
                />

                <button
                    disabled={loading}
                    style={{
                        padding: "10px 16px",
                        borderRadius: "10px",
                        background: "#3cb7ff",
                        border: "none",
                        cursor: "pointer",
                        opacity: loading ? 0.6 : 1
                    }}
                >
                    {loading ? "Thinking…" : "Send"}
                </button>
            </form>
        </div>
    );
}