const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const userInfo = {
  user_id: "john_doe_17091999",
  email: "john@xyz.com",
  roll_number: "ABCD123"
};

app.post('/bfhl', (req, res) => {
  const { data } = req.body;

  if (!Array.isArray(data)) {
    return res.status(400).json({ is_success: false, message: "Invalid input format" });
  }

  const numbers = data.filter(item => !isNaN(item));
  const alphabets = data.filter(item => isNaN(item));
  const lowercaseAlphabets = alphabets.filter(char => char >= 'a' && char <= 'z');

  // Find the highest lowercase alphabet using a reduce function
  const highestLowercaseAlphabet = lowercaseAlphabets.length 
    ? [lowercaseAlphabets.reduce((max, char) => char > max ? char : max, 'a')] 
    : [];

  const response = {
    is_success: true,
    ...userInfo,
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet
  };

  res.json(response);
});

app.get('/bfhl', (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
