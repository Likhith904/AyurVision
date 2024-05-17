import { useState, useEffect } from "react";
import axios from "axios";

const MyForm = () => {
  const [formData, setFormData] = useState({});
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Mock dataset (replace with your actual data)
    const data = {
      Gender: ["Female", "Male"],
      bodyFrame_Breadth: ["Broad", "Medium", "Thin/Narrow"],
      skin_Nature: ["Dry", "Normal", "Oily", "Seasonal/Variable"],
      skin_Color: [
        "Dark",
        "FairPaleYellow",
        "FairPink",
        "FairReddish",
        "Whitish",
      ],
      weight_Changes: [
        "Difficultyingaining",
        "Gainandloseeasily",
        "Gaineasilyandlosewithdifficulty",
        "Stable",
      ],
      nails_color: ["PaleYellow", "Pink", "Reddish"],
      teeth_Color: ["Dull/Blackish", "MilkyWhite", "Yellowish"],
      teeth_Shape: ["Irregular", "Regular"],
      recalling_speed: ["Moderately", "Quickly", "Slowly", "Variably"],
      memorizing_speed: ["Moderately", "Quickly", "Slowly", "Variably"],
      sleep_Amount: ["High", "Low", "Medium", "Variable"],
      sleep_Quality: ["Deep", "Shallow", "Sound"],
      speaking_Amount: ["Excessive", "Less", "Moderate"],
      speaking_Speed: ["Medium", "Quick", "Slow", "Variable"],
      walking_Speed: ["Medium", "Quick/Fast/Brisk", "Slow", "Variable"],
      bowel_Freq: ["Irregular", "Regular", "Variable"],
      retainingFriends_quality: ["Good", "Medium", "Poor"],
      dreams_Amount: ["High", "Low", "Medium", "Variable"],
      voice_clear: ["Clear", "Non_Clear"],
      eye_Color: ["Black", "DarkBrown", "Grayish", "LightBrown"],
      healthproblem_in_temp: ["Both", "Cold", "Warm", null], // assuming nan should be converted to null
      hair_Growth: ["Dense", "Moderate", "Scanty"],
      hair_Type: ["Thick", "Thin"],
      hair_Nature2: ["Falling", "Non_Falling"],
      appetite_Amount: ["High", "Low", "Medium", "Variable"],
      appetite_Frequency: ["Irregular", "Regular"],
      bladder_Frequency: ["Irregular", "Regular"],
      perspiration_Amount: ["High", "Low", "Medium"],
      stool_Consistency: ["Hard", "Loose/Soft/Semisolid", "Medium"],
      mental_Power: ["Grade1", "Grade2", "Grade3"],
      physical_Power: ["Grade1", "Grade2", "Grade3"],
      Anger_Freq: ["Good", "Medium", "Poor"],
      Irritability_speed: ["Moderately", "Quickly", "Slowly", "Variably"],
      speech_Argumentative: ["Argumentative", "Non_Argumentative"],
    };

    // Convert dataset into array of objects for easier mapping
    const questionsArray = Object.entries(data).map(([key, options]) => ({
      key,
      label: key.replace(/_/g, " "),
      options,
    }));

    // Set questions and initialize form data
    setQuestions(questionsArray);
    const initialFormData = {};
    questionsArray.forEach((question) => {
      initialFormData[question.key] = "";
    });
    setFormData(initialFormData);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const dataArray = [];
    for (const key in formData) {
      dataArray.push(parseInt(formData[key], 10));
      // console.log(`${key}: ${formData[key]}`;;
      //
    }
    console.log(dataArray);
    // Send the form data to the server
    axios
      .post("http://localhost:3000/predict", {
        data: dataArray,
      })
      .then((response) => {
        // Handle response from server if needed
        console.log(response.data);
      })
      .catch((error) => {
        // Handle error if request fails
        console.error("Error:", error);
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
                  value={optionIndex}
                  checked={formData[question.key] === optionIndex.toString()}
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
