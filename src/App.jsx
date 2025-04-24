import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [grades, setGrades] = useState({});
  const [prevSemGPA, setPrevSemGPA] = useState("");
  const [showCGPAInput, setShowCGPAInput] = useState(false);
  const [result, setResult] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState("1");

  const semesterSubjects = {
    "1": [
      { name: "EC - Electronic Circuits", credits: 5 },
      { name: "CP - Computer Programming", credits: 5 },
      { name: "IT - IT Workshop I", credits: 5 },
      { name: "MA - Discrete Mathematics", credits: 4 },
      { name: "CM - Communication Skills", credits: 3 },
      { name: "FL - Foreign Language - German", credits: 1 },
    ],
    "2": [
      { name: "EC - Digital Design & Electric Circuits", credits: 5 },
      { name: "CO - Computer Organization", credits: 4 },
      { name: "DS - Data Structures I", credits: 5 },
      { name: "MA - Calculus & Linear Algebra", credits: 4 },
      { name: "IT - IT Workshop 2", credits: 4 },
      { name: "PD - Personality Development", credits: 1 },
    ]
    // Add more semesters as needed
  };

  const gradeValues = {
    "A": 10,
    "A-": 9,
    "B": 8,
    "B-": 7,
    "C": 6,
    "C-": 5,
    "D": 4,
  };

  const handleGradeChange = (subject, grade) => {
    setGrades({ ...grades, [subject]: grade });
  };

  const calculateSGPA = () => {
    let totalCredits = 0;
    let weightedSum = 0;
    const currentSubjects = semesterSubjects[selectedSemester];

    currentSubjects.forEach((sub) => {
      if (grades[sub.name]) {
        weightedSum += gradeValues[grades[sub.name]] * sub.credits;
        totalCredits += sub.credits;
      }
    });

    return totalCredits > 0 ? (weightedSum / totalCredits).toFixed(2) : 0;
  };

  const calculateCGPA = () => {
    const sgpa = parseFloat(calculateSGPA());
    const prevGPA = parseFloat(prevSemGPA);
    return isNaN(prevGPA) ? sgpa : ((prevGPA + sgpa) / 2).toFixed(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setResult(showCGPAInput ? calculateCGPA() : calculateSGPA());
  };

  const handleSemesterChange = (e) => {
    setSelectedSemester(e.target.value);
    // Reset grades when semester changes
    setGrades({});
    setResult(null);
  };

  return (
    <div className="app">
      <h1>CGPA Calculator</h1>
      <form onSubmit={handleSubmit}>
        <div className="semester-selector">
          <label>
            Select Semester:
            <select 
              value={selectedSemester} 
              onChange={handleSemesterChange}
              required
            >
              <option value="1">Semester 1</option>
              <option value="2">Semester 2</option>
              {/* Add more semesters as needed */}
            </select>
          </label>
        </div>

        {semesterSubjects[selectedSemester].map((sub) => (
          <div key={sub.name} className="subject-input">
            <label>
              {sub.name} ({sub.credits} credits):
              <select
                onChange={(e) => handleGradeChange(sub.name, e.target.value)}
                required
              >
                <option value="">Select Grade</option>
                {Object.keys(gradeValues).map((grade) => (
                  <option key={grade} value={grade}>
                    {grade}
                  </option>
                ))}
              </select>
            </label>
          </div>
        ))}

        <div className="toggle-cgpa">
          <label>
          <input
            type="checkbox"
            checked={showCGPAInput}
            onChange={() => setShowCGPAInput(!showCGPAInput)}
          />
            Include Previous Semester GPA
          </label>
        </div>

        {showCGPAInput && (
          <div className="prev-gpa-input">
            <label>
              Previous Semester GPA:
              <input
                type="number"
                min="0"
                max="10"
                step="0.01"
                value={prevSemGPA}
                onChange={(e) => setPrevSemGPA(e.target.value)}
                required
              />
            </label>
          </div>
        )}

        <button type="submit">Calculate</button>
      </form>

      {result !== null && (
        <div className="result">
          <h2>Your {showCGPAInput ? "CGPA" : "SGPA"}: {result}</h2>
        </div>
      )}
    </div>
  );
};

export default App;