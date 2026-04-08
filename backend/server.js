
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
      "https://translate.googleapis.com/translate_a/single",
      {
        params: {
          client: "gtx",
          sl: "auto",
          tl: target,
          dt: "t",
          q: text,
        },
      }
    );

    // Extract translated text
    const translatedText = response.data[0]
      .map((item) => item[0])
      .join("");

    res.json({ translatedText });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Translation failed" });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
