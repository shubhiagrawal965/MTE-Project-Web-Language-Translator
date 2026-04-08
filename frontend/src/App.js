import React, { useState } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [translated, setTranslated] = useState("");
  const [targetLang, setTargetLang] = useState("hi");
  const [sourceLang, setSourceLang] = useState("auto");
  const [loading, setLoading] = useState(false);

  const languages = [
    { code: "auto", name: "Auto Detect 🌐" },
    { code: "en", name: "English 🇺🇸" },
    { code: "hi", name: "Hindi 🇮🇳" },
    { code: "fr", name: "French 🇫🇷" },
    { code: "es", name: "Spanish 🇪🇸" },
    { code: "de", name: "German 🇩🇪" },
    { code: "it", name: "Italian 🇮🇹" },
    { code: "pt", name: "Portuguese 🇵🇹" },
    { code: "ru", name: "Russian 🇷🇺" },
    { code: "ja", name: "Japanese 🇯🇵" },
    { code: "ko", name: "Korean 🇰🇷" },
    { code: "zh", name: "Chinese 🇨🇳" },
    { code: "ar", name: "Arabic 🇸🇦" }
  ];

  const translate = async () => {
    if (!text) return;

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/translate", {
        text,
        target: targetLang,
        source: sourceLang
      });

      setTranslated(res.data.translatedText || "No translation found");
    } catch (err) {
      setTranslated("Error translating text");
    }
    setLoading(false);
  };

  const copyText = () => {
    navigator.clipboard.writeText(translated);
    alert("Copied!");
  };

  const swapLanguages = () => {
    setText(translated);
    setTranslated(text);
    setSourceLang(targetLang);
    setTargetLang(sourceLang === "auto" ? "en" : sourceLang);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>🌐 Language Translator</h2>

        <textarea
          placeholder="Enter text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={styles.textarea}
        />

        <div style={styles.row}>
          <select
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
            style={styles.select}
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>

          <button onClick={swapLanguages} style={styles.swapBtn}>
            🔁
          </button>

          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            style={styles.select}
          >
            {languages
              .filter((l) => l.code !== "auto")
              .map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
          </select>
        </div>

        <button onClick={translate} style={styles.button}>
          Translate
        </button>

        {loading ? (
          <p>⏳ Translating...</p>
        ) : (
          <div style={styles.outputBox}>
            <p>{translated}</p>
            {translated && (
              <button onClick={copyText} style={styles.copyBtn}>
                📋 Copy
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f8"
  },
  card: {
    width: "450px",
    padding: "20px",
    borderRadius: "12px",
    background: "#fff",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    textAlign: "center"
  },
  textarea: {
    width: "100%",
    height: "100px",
    marginBottom: "10px",
    padding: "10px"
  },
  select: {
    padding: "8px",
    flex: 1,
    margin: "5px"
  },
  button: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px"
  },
  row: {
    display: "flex",
    alignItems: "center"
  },
  swapBtn: {
    padding: "8px",
    margin: "0 5px"
  },
  outputBox: {
    marginTop: "15px",
    padding: "10px",
    background: "#f1f1f1",
    borderRadius: "5px"
  },
  copyBtn: {
    marginTop: "5px"
  }
};

export default App;
