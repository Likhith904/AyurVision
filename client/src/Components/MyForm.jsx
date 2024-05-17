import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyForm = () => {
  const [formData, setFormData] = useState({});
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Mock dataset (replace with your actual data)
    const data = {
      Gender: ['Male', 'Female'],
      bodyBuild_Size: ['Weaklydeveloped', 'Welldeveloped', 'Moderatelydeveloped'],
      bodyFrame_Breadth: ['Thin/Narrow', 'Broad', 'Medium'],
      hair_Nature: ['Normal', 'Seasonal/Variable', 'Dry', 'Oily'],
      skin_Nature: ['Dry', 'Normal', 'Oily', 'Seasonal/Variable'],
      skin_Color: ['Whitish', 'FairPaleYellow', 'Dark', 'FairReddish', 'FairPink'],
      weight_Changes: ['Gainandloseeasily', 'Difficultyingaining', 'Gaineasilyandlosewithdifficulty', 'Stable'],
      nails_color: ['Pink', 'Reddish', 'PaleYellow'],
      nails_Length: ['Long', 'Medium', 'Tooshort/TooLong'],
      nails_nature: ['Non_Brittle', 'Brittle'],
      teeth_Color: ['MilkyWhite', 'Yellowish', 'Dull/Blackish'],
      teeth_Shape: ['Regular', 'Irregular'], // Excluding null options
      teeth_Size: ['Medium', 'Large', 'TooSmall', 'TooLarge'],
      recalling_speed: ['Moderately', 'Slowly', 'Variably', 'Quickly'],
      memorizing_speed: ['Moderately', 'Quickly', 'Slowly', 'Variably'],
      working_Speed: ['Quick/Fast/Brisk', 'Medium', 'Slow', 'Variable'],
      sleep_Amount: ['Medium', 'High', 'Low', 'Variable'],
      sleep_Quality: ['Sound', 'Deep', 'Shallow'],
      speaking_Amount: ['Moderate', 'Less', 'Excessive'],
      speaking_Speed: ['Medium', 'Quick', 'Slow', 'Variable'],
      walking_Speed: ['Quick/Fast/Brisk', 'Medium', 'Slow', 'Variable'],
      walking_steps: ['Medium', 'Large', 'Small'],
      bowel_Freq: ['Regular', 'Irregular', 'Variable'],
      bowel_Tendency: ['Constipation', 'Loosemotion'], // Excluding null options
      Anger_Freq: ['Good', 'Poor', 'Medium'],
      Irritability_speed: ['Quickly', 'Slowly', 'Moderately', 'Variably'],
      speech_Argumentative: ['Non_Argumentative', 'Argumentative'],
    };

    // Convert dataset into array of objects for easier mapping
    const questionsArray = Object.entries(data).map(([key, options]) => ({
      key,
      label: key.replace(/_/g, ' '),
      options,
    }));

    // Set questions and initialize form data
    setQuestions(questionsArray);
    const initialFormData = {};
    questionsArray.forEach(question => {
      initialFormData[question.key] = '';
    });
    setFormData(initialFormData);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // const dataArray = [];
    // for (let i = 1; i <= 34; i++) {
    //     dataArray.push(formData['data[i]`]);
    // }

    // Send the form data to the server
    axios.post('http://localhost:5173/submit', formData)
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
        {/* Display questions and options */}
        {questions.map((question, index) => (
          <div key={index}>
            <h3>{question.label}</h3>
            {question.options.map((option, optionIndex) => (
              <label key={optionIndex}>
                <input
                  type="radio"
                  name={question.key}
                  value={option}
                  checked={formData[question.key] === option}
                  onChange={handleChange}
                />
                {option}
              </label>
            ))}
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default MyForm;
