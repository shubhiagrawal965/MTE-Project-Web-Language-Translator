
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [text, setText] = useState('');
  const [translated, setTranslated] = useState('');
  const [language, setLanguage] = useState('hi');

  const translate = async () => {
    const res = await axios.post('http://localhost:5000/translate', {
      text,
      target: language
    });
    setTranslated(res.data.translatedText);
  };

  return (
    <div style={{padding: 20}}>
      <h2>Language Translator</h2>
      <textarea value={text} onChange={(e)=>setText(e.target.value)} />
      <br/>
      <select onChange={(e)=>setLanguage(e.target.value)}>
        <option value="hi">Hindi</option>
        <option value="fr">French</option>
        <option value="es">Spanish</option>
      </select>
      <br/>
      <button onClick={translate}>Translate</button>
      <h3>{translated}</h3>
    </div>
  );
}

export default App;
