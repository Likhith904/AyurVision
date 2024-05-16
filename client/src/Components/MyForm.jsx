import React, { useState } from 'react';
import axios from 'axios';

const MyForm = () => {
  const [formData, setFormData] = useState({
    // Initialize state for each question
    q1:0,
    q2:0,
    q3:0,
    q4: 0,
    q5: 0,
    q6: 0,
    q7: 0,
    q8: 0,
    q9: 0,
    q10: 0,
    q11: 0,
    q12: 0,
    q13: 0,
    q14: 0,
    q15: 0,
    q16: 0,
    q17: 0,
    q18: 0,
    q19: 0,
    q20: 0,
    q21: 0,
    q22: 0,
    q23: 0,
    q24: 0,
    q25: 0,
    q26: 0,
    q27: 0,
    q28: 0,
    q29: 0,
    q30: 0,
    q31: 0,
    q32: 0,
    q33: 0,
    q34:0
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Process form data and create an array
    const dataArray = [];
    for (let i = 1; i <= 34; i++) {
      dataArray.push(formData[`q${i}`]);
    }

    // Send the array to the server
    axios.post('http://localhost:5173/submit', { data: dataArray })
      .then(response => {
        // Handle response from server if needed
        console.log(response.data);
      })
      .catch(error => {
        // Handle error if request fails
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <h1>Prakriti</h1>
      <form onSubmit={handleSubmit}>
        {/* Questions with options */}
        {[...Array(34)].map((_, index) => (
          <div key={index}>
            <h3>Question {index + 1}</h3>
            <label>
              <input type="radio" name={`q${index + 1}`} value="1" checked={formData[`q${index + 1}`] === 'Option 1'} onChange={handleChange} />
              Option 1
            </label>
            <label>
              <input type="radio" name={`q${index + 1}`} value="2" checked={formData[`q${index + 1}`] === 'Option 2'} onChange={handleChange} />
              Option 2
            </label>
            <label>
              <input type="radio" name={`q${index + 1}`} value="3" checked={formData[`q${index + 1}`] === 'Option 3'} onChange={handleChange} />
              Option 3
            </label>
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default MyForm;
