import { useState, useEffect } from "react";
import axios from "axios";

const MyForm = () => {
  const [formData, setFormData] = useState({});
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
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
      healthproblem_in_temp: ["Both", "Cold", "Warm", null],
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

    const questionsArray = Object.entries(data).map(([key, options]) => ({
      key,
      label: key.replace(/_/g, " "),
      options,
    }));

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
    }
    console.log(dataArray);
    axios
      .post("http://localhost:3000/predict", { data: dataArray })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">Prakriti Identification</h1>
      <div className="flex w-full max-w-6xl bg-white p-8 rounded shadow-md">
        <form onSubmit={handleSubmit} className="w-1/2 pr-4">
          {questions.map((question, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-lg font-semibold mb-2">{question.label}</h3>
              <div className="flex flex-col">
                {question.options.map((option, optionIndex) => (
                  <label key={optionIndex} className="flex items-center mb-2">
                    <input
                      type="radio"
                      name={question.key}
                      value={optionIndex}
                      checked={
                        formData[question.key] === optionIndex.toString()
                      }
                      onChange={handleChange}
                      className="form-radio text-indigo-600"
                    />
                    <span className="ml-2">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-green-500 transition duration-200"
          >
            Submit
          </button>
        </form>
        <div className="w-1/2 pl-4 border-l border-gray-300">
          <h2 className="text-2xl font-bold mb-4">Chatbot</h2>
          <div className="flex flex-col items-center justify-center h-full">
            <div className="w-full h-full bg-gray-100 flex items-center justify-center rounded">
              {/* Placeholder for chatbot */}
              <p className="text-gray-600">Chatbot interface coming soon...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyForm;
