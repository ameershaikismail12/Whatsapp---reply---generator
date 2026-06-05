import { useState, useEffect } from "react";

const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Familjen+Grotesk:wght@400;500;600;700&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg: #0a0f0d;
      --surface: #111a14;
      --surface2: #162019;
      --border: rgba(255,255,255,0.07);
      --green: #25D366;
      --green-dim: rgba(37,211,102,0.15);
      --green-glow: rgba(37,211,102,0.25);
      --gold: #f5c842;
      --text: #e2ede6;
      --muted: #5a7a62;
      --radius: 16px;
    }

    body {
      background: var(--bg);
      color: var(--text);
      font-family: 'Plus Jakarta Sans', sans-serif;
      min-height: 100vh;
    }

    body::after {
      content: '';
      position: fixed; inset: 0;
      background:
        radial-gradient(ellipse 60% 50% at 10% 20%, rgba(37,211,102,0.07) 0%, transparent 70%),
        radial-gradient(ellipse 50% 40% at 90% 80%, rgba(37,211,102,0.05) 0%, transparent 70%);
      pointer-events: none; z-index: 0;
    }

    body::before {
      content: '';
      position: fixed; inset: 0;
      background-image: repeating-linear-gradient(
        0deg, transparent, transparent 2px,
        rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px
      );
      pointer-events: none; z-index: 0;
    }

    .wrap {
      position: relative; z-index: 1;
      max-width: 780px;
      margin: 0 auto;
      padding: 44px 20px 80px;
    }

    .header {
      display: flex; flex-direction: column; align-items: center;
      text-align: center; margin-bottom: 40px;
    }

    .logo-ring {
      width: 64px; height: 64px;
      border-radius: 50%;
      background: var(--green-dim);
      border: 1.5px solid var(--green);
      display: flex; align-items: center; justify-content: center;
      font-size: 28px;
      margin-bottom: 20px;
      box-shadow: 0 0 30px var(--green-glow);
      animation: pulse 3s ease-in-out infinite;
    }
    @keyframes pulse {
      0%, 100% { box-shadow: 0 0 20px var(--green-glow); }
      50%       { box-shadow: 0 0 45px var(--green-glow); }
    }

    .header h1 {
      font-family: 'Familjen Grotesk', sans-serif;
      font-size: clamp(1.8rem, 5vw, 2.8rem);
      font-weight: 700;
      letter-spacing: -0.5px;
      line-height: 1.15;
    }
    .header h1 span { color: var(--green); }
    .header p { color: var(--muted); font-size: 14px; margin-top: 10px; max-width: 420px; }

    .usage-bar-wrap {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 14px 20px;
      margin-bottom: 24px;
      display: flex; align-items: center; justify-content: space-between; gap: 16px;
      flex-wrap: wrap;
    }
    .usage-label { font-size: 13px; color: var(--muted); }
    .usage-label strong { color: var(--text); }
    .usage-dots { display: flex; gap: 6px; }
    .usage-dot {
      width: 10px; height: 10px; border-radius: 50%;
      background: var(--green);
      transition: background .3s;
    }
    .usage-dot.used { background: rgba(255,255,255,0.1); }

    .card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 28px;
      margin-bottom: 20px;
    }

    .card-title {
      font-family: 'Familjen Grotesk', sans-serif;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: var(--muted);
      margin-bottom: 18px;
    }

    .bubble-wrap {
      background: var(--surface2);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 18px;
      position: relative;
    }
    .bubble-header {
      display: flex; align-items: center; gap: 8px;
      margin-bottom: 10px;
    }
    .avatar {
      width: 32px; height: 32px; border-radius: 50%;
      background: var(--green-dim);
      border: 1px solid var(--green);
      display: flex; align-items: center; justify-content: center;
      font-size: 14px;
    }
    .bubble-sender { font-size: 12px; font-weight: 600; color: var(--green); }
    .bubble-time { font-size: 11px; color: var(--muted); margin-left: auto; }

    textarea {
      width: 100%;
      background: transparent;
      border: none;
      outline: none;
      color: var(--text);
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 14px;
      line-height: 1.7;
      resize: vertical;
      min-height: 90px;
    }
    textarea::placeholder { color: var(--muted); }

    .controls { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 20px; }
    @media(max-width:520px){ .controls { grid-template-columns: 1fr; } }

    .field { display: flex; flex-direction: column; gap: 7px; }
    label {
      font-size: 11px; font-weight: 600;
      letter-spacing: 1.5px; text-transform: uppercase;
      color: var(--muted);
    }
    select {
      background: var(--surface2);
      border: 1px solid var(--border);
      border-radius: 9px;
      padding: 10px 14px;
      color: var(--text);
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 13px;
      outline: none;
      cursor: pointer;
      transition: border-color .2s;
    }
    select:focus { border-color: var(--green); }
    select option { background: #111a14; }

    .btn-generate {
      width: 100%;
      padding: 15px;
      background: var(--green);
      color: #0a0f0d;
      border: none;
      border-radius: 11px;
      font-family: 'Familjen Grotesk', sans-serif;
      font-size: 15px;
      font-weight: 700;
      letter-spacing: .3px;
      cursor: pointer;
      transition: opacity .2s, transform .15s, box-shadow .2s;
      display: flex; align-items: center; justify-content: center; gap: 10px;
    }
    .btn-generate:hover:not(:disabled) {
      opacity: 0.9;
      transform: translateY(-1px);
      box-shadow: 0 8px 25px var(--green-glow);
    }
    .btn-generate:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }

    .spinner {
      width: 17px; height: 17px;
      border: 2px solid rgba(10,15,13,0.3);
      border-top-color: #0a0f0d;
      border-radius: 50%;
      animation: spin .65s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    .replies-wrap { display: flex; flex-direction: column; gap: 14px; }

    .reply-card {
      background: var(--surface2);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 20px 22px;
      animation: fadeUp .35s ease both;
    }
    .reply-card:nth-child(2) { animation-delay: .08s; }
    .reply-card:nth-child(3) { animation-delay: .16s; }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(10px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .reply-header {
      display: flex; align-items: center; justify-content: space-between;
      margin-bottom: 12px;
    }
    .reply-label {
      font-size: 11px; font-weight: 700;
      letter-spacing: 1.5px; text-transform: uppercase;
      color: var(--green);
    }
    .reply-text {
      font-size: 14px; line-height: 1.75;
      color: #c8dace;
      white-space: pre-wrap;
    }

    .btn-copy {
      padding: 6px 14px;
      border-radius: 7px;
      border: 1px solid var(--border);
      background: transparent;
      color: var(--muted);
      font-size: 12px;
      font-family: 'Plus Jakarta Sans', sans-serif;
      cursor: pointer;
      transition: all .2s;
    }
    .btn-copy:hover { border-color: var(--green); color: var(--green); }
    .btn-copy.copied { border-color: var(--green); color: var(--green); background: var(--green-dim); }

    .error-box {
      background: rgba(239,68,68,0.08);
      border: 1px solid rgba(239,68,68,0.25);
      border-radius: 10px;
      padding: 14px 18px;
      color: #fca5a5;
      font-size: 13px;
      margin-top: 14px;
    }

    .modal-overlay {
      position: fixed; inset: 0;
      background: rgba(0,0,0,0.85);
      backdrop-filter: blur(6px);
      z-index: 100;
      display: flex; align-items: center; justify-content: center;
      padding: 20px;
      animation: fadeIn .25s ease;
    }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

    .modal {
      background: var(--surface);
      border: 1px solid rgba(37,211,102,0.2);
      border-radius: 22px;
      padding: 40px 36px;
      max-width: 420px; width: 100%;
      text-align: center;
      box-shadow: 0 0 60px rgba(37,211,102,0.12);
      animation: slideUp .3s ease;
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .modal-icon { font-size: 48px; margin-bottom: 16px; }

    .modal h2 {
      font-family: 'Familjen Grotesk', sans-serif;
      font-size: 1.6rem; font-weight: 700;
      margin-bottom: 10px;
    }
    .modal h2 span { color: var(--green); }

    .modal p { color: var(--muted); font-size: 14px; line-height: 1.6; margin-bottom: 28px; }

    .price-tag {
      display: inline-block;
      background: var(--green-dim);
      border: 1px solid var(--green);
      border-radius: 999px;
      padding: 6px 20px;
      color: var(--green);
      font-family: 'Familjen Grotesk', sans-serif;
      font-size: 1.1rem; font-weight: 700;
      margin-bottom: 24px;
    }

    .perks {
      text-align: left;
      background: var(--surface2);
      border-radius: 12px;
      padding: 16px 20px;
      margin-bottom: 26px;
      display: flex; flex-direction: column; gap: 10px;
    }
    .perk { display: flex; align-items: center; gap: 10px; font-size: 13px; color: var(--text); }
    .perk-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--green); flex-shrink: 0; }

    .btn-pay {
      width: 100%;
      padding: 15px;
      background: var(--green);
      color: #0a0f0d;
      border: none;
      border-radius: 11px;
      font-family: 'Familjen Grotesk', sans-serif;
      font-size: 15px; font-weight: 700;
      cursor: pointer;
      transition: opacity .2s, box-shadow .2s;
      margin-bottom: 12px;
    }
    .btn-pay:hover { opacity: 0.88; box-shadow: 0 8px 25px var(--green-glow); }

    .modal-dismiss {
      background: none; border: none;
      color: var(--muted); font-size: 13px;
      cursor: pointer; text-decoration: underline;
      font-family: 'Plus Jakarta Sans', sans-serif;
    }
    .modal-dismiss:hover { color: var(--text); }

    .footer-note {
      text-align: center;
      color: var(--muted);
      font-size: 12px;
      margin-top: 32px;
    }
    .footer-note span { color: var(--green); }
  `}</style>
);

const FREE_LIMIT = 5;
const STORAGE_KEY = "wapp_uses";

const PAYFAST = {
  merchant_id: "YOUR_MERCHANT_ID",
  merchant_key: "YOUR_MERCHANT_KEY",
  return_url: "https://yourapp.vercel.app/success",
  cancel_url: "https://yourapp.vercel.app/",
  notify_url: "https://yourapp.vercel.app/api/notify",
  amount: "79.00",
  item_name: "WhatsReply Pro - Monthly",
};

function redirectToPayFast() {
  const form = document.createElement("form");
  form.method = "POST";
  form.action = "https://sandbox.payfast.co.za/eng/process";
  Object.entries(PAYFAST).forEach(([key, value]) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = key;
    input.value = value;
    form.appendChild(input);
  });
  document.body.appendChild(form);
  form.submit();
}

export default function WhatsAppReplyGenerator() {
  const [message, setMessage] = useState("");
  const [tone, setTone] = useState("Professional");
  const [relationship, setRelationship] = useState("Client");
  const [loading, setLoading] = useState(false);
  const [replies, setReplies] = useState(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");
  const [usesLeft, setUsesLeft] = useState(FREE_LIMIT);
  const [showPaywall, setShowPaywall] = useState(false);

  useEffect(() => {
    const stored = parseInt(localStorage.getItem(STORAGE_KEY) || "0");
    setUsesLeft(Math.max(0, FREE_LIMIT - stored));
  }, []);

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopied(idx);
    setTimeout(() => setCopied(""), 2000);
  };

  const handleGenerate = async () => {
    if (!message.trim()) {
      setError("Please paste a WhatsApp message first.");
      return;
    }

    const used = parseInt(localStorage.getItem(STORAGE_KEY) || "0");
    if (used >= FREE_LIMIT) {
      setShowPaywall(true);
      return;
    }

    setLoading(true);
    setError("");
    setReplies(null);

    const prompt = `
You are a WhatsApp reply expert.
Someone received this WhatsApp message: "${message}"
Their relationship with the sender: ${relationship}
Desired tone: ${tone}
Write 3 different WhatsApp reply options. Each should feel natural for WhatsApp — concise, conversational, and human.
Return ONLY valid JSON (no markdown, no explanation):
{"reply1": "First reply here", "reply2": "Second reply here", "reply3": "Third reply here"}
Guidelines: Keep replies short and punchy (1–4 sentences max). Match the tone: ${tone}. Match the relationship context: ${relationship}. No formal sign-offs unless tone is Professional. Sound like a real person, not a robot.
    `.trim();

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
        }),
      });

      const data = await response.json();
      const rawText = data.content.map((b) => (b.type === "text" ? b.text : "")).join("");
      const clean = rawText.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setReplies([parsed.reply1, parsed.reply2, parsed.reply3]);

      const newCount = used + 1;
      localStorage.setItem(STORAGE_KEY, newCount.toString());
      setUsesLeft(Math.max(0, FREE_LIMIT - newCount));

      if (newCount >= FREE_LIMIT) {
        setTimeout(() => setShowPaywall(true), 1500);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <GlobalStyle />
      {showPaywall && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-icon">🔒</div>
            <h2>You've used your <span>5 free replies</span></h2>
            <p>Upgrade to Pro and never run out of smart replies again.</p>
            <div className="price-tag">R79 / month</div>
            <div className="perks">
              <div className="perk"><span className="perk-dot" />Unlimited reply generations</div>
              <div className="perk"><span className="perk-dot" />All tones & relationships</div>
              <div className="perk"><span className="perk-dot" />Priority speed</div>
              <div className="perk"><span className="perk-dot" />Cancel anytime</div>
            </div>
            <button className="btn-pay" onClick={redirectToPayFast}>Upgrade with PayFast →</button>
            <button className="modal-dismiss" onClick={() => setShowPaywall(false)}>Maybe later</button>
          </div>
        </div>
      )}
      <div className="wrap">
        <div className="header">
          <div className="logo-ring">💬</div>
          <h1>WhatsApp <span>Reply</span><br />Generator</h1>
          <p>Paste any message. Get 3 perfect replies in seconds.</p>
        </div>
        <div className="usage-bar-wrap">
          <div className="usage-label">Free replies left: <strong>{usesLeft} / {FREE_LIMIT}</strong></div>
          <div className="usage-dots">
            {Array.from({ length: FREE_LIMIT }).map((_, i) => (
              <div key={i} className={`usage-dot ${i >= usesLeft ? "used" : ""}`} />
            ))}
          </div>
        </div>
        <div className="card">
          <div className="card-title">📩 The message you received</div>
          <div className="bubble-wrap">
            <div className="bubble-header">
              <div className="avatar">👤</div>
              <div className="bubble-sender">{relationship}</div>
              <div className="bubble-time">now</div>
            </div>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)}
              placeholder="Paste the WhatsApp message here…" />
          </div>
          <div className="controls">
            <div className="field">
              <label>Tone of Reply</label>
              <select value={tone} onChange={(e) => setTone(e.target.value)}>
                <option>Professional</option><option>Friendly</option>
                <option>Funny</option><option>Blunt</option><option>Apologetic</option>
              </select>
            </div>
            <div className="field">
              <label>Sender is my...</label>
              <select value={relationship} onChange={(e) => setRelationship(e.target.value)}>
                <option>Client</option><option>Boss</option><option>Friend</option>
                <option>Supplier</option><option>Colleague</option><option>Stranger</option>
              </select>
            </div>
          </div>
          <button className="btn-generate" onClick={handleGenerate} disabled={loading}>
            {loading ? <><span className="spinner" /> Generating replies…</> : "💬 Generate Replies"}
          </button>
          {error && <div className="error-box">⚠ {error}</div>}
        </div>
        {replies && (
          <div className="card">
            <div className="card-title">✨ Your replies — tap to copy</div>
            <div className="replies-wrap">
              {replies.map((reply, i) => (
                <div className="reply-card" key={i}>
                  <div className="reply-header">
                    <div className="reply-label">Option {i + 1}</div>
                    <button className={`btn-copy ${copied === i ? "copied" : ""}`} onClick={() => handleCopy(reply, i)}>
                      {copied === i ? "✓ Copied!" : "Copy"}
                    </button>
                  </div>
                  <p className="reply-text">{reply}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="footer-note">Powered by <span>Claude AI</span> · Built for South Africa 🇿🇦</div>
      </div>
    </>
  );
}
