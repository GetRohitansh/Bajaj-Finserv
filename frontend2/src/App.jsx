import React, { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import './App.css';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: 'Numbers', label: 'Numbers' },
    { value: 'Alphabets', label: 'Alphabets' },
    { value: 'Highest Lowercase Alphabet', label: 'Highest Lowercase Alphabet' },
  ];

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedInput = JSON.parse(jsonInput);
      const { data } = await axios.post('https://bajaj-finserv-backend-fcqa.onrender.com/bfhl', parsedInput);
      setResponse(data);
      setError('');
    } catch (err) {
      setError('Invalid JSON input');
      setResponse(null);
    }
  };

  const handleMultiSelectChange = (selected) => {
    setSelectedOptions(selected ? selected.map(option => option.value) : []);
  };

  const renderResponse = () => {
    if (!response) return null;

    const { numbers, alphabets, highest_lowercase_alphabet } = response;
    const renderData = [];

    if (selectedOptions.includes('Numbers')) {
      renderData.push(<div key="numbers">Numbers: {numbers.join(', ')}</div>);
    }

    if (selectedOptions.includes('Alphabets')) {
      renderData.push(<div key="alphabets">Alphabets: {alphabets.join(', ')}</div>);
    }

    if (selectedOptions.includes('Highest Lowercase Alphabet')) {
      renderData.push(<div key="highestLowercase">Highest Lowercase Alphabet: {highest_lowercase_alphabet.join(', ')}</div>);
    }

    return renderData;
  };

  return (
    <div className="App">
      <h1>21BCE2338</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder='Enter JSON input'
          value={jsonInput}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
      {error && <div className="error">{error}</div>}
      {response && (
        <div className="response">
          <Select
            isMulti
            options={options}
            onChange={handleMultiSelectChange}
            placeholder="Select options"
          />
          <div className="response-data">
            {renderResponse()}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
