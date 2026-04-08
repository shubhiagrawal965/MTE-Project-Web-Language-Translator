
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/translate', async (req, res) => {
  const { text, target } = req.body;

  try {
    const response = await axios.post('https://translate.argosopentech.com/translate', {
      q: text,
      source: 'auto',
      target: target,
      format: 'text'
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error translating');
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
