
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post("/translate", async (req, res) => {
  const { text, target } = req.body;

  try {
    const response = await axios.get(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${target}`
    );

    res.json({
      translatedText: response.data.responseData.translatedText,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Translation failed" });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
