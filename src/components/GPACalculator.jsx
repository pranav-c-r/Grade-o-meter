import React, { useState } from "react";
import SubjectInput from "./SubjectInput";

const GPACalculator = () => {
  const [grades, setGrades] = useState({});
  const [prevSemGPA, setPrevSemGPA] = useState("");
  const [showCGPAInput, setShowCGPAInput] = useState(false);
  const [result, setResult] = useState(null);

  const subjects = [
    { name: "EC - Digital Design & Electric Circuits", credits: 5 },
    { name: "CO - Computer Organization", credits: 4 },
    { name: "DS - Data Structures I", credits: 5 },
    { name: "MA - Calculus & Linear Algebra", credits: 4 },
    { name: "IT - IT Workshop 2", credits: 4 },
    { name: "PD - Personality Development", credits: 1 },
  ];

  const handleGradeChange = (subject, grade) => {
    setGrades({ ...grades, [subject]: grade });
  };

  const calculateSGPA = () => {
    let totalCredits = 0;
    let weightedSum = 0;

    subjects.forEach((sub) => {
      if (grades[sub.name]) {
        weightedSum += grades[sub.name] * sub.credits;
        totalCredits += sub.credits;
      }
    });

    if (totalCredits === 0) return 0;
    return (weightedSum / totalCredits).toFixed(2);
  };

  const calculateCGPA = () => {
    const sgpa = parseFloat(calculateSGPA());
    const prevGPA = parseFloat(prevSemGPA);
    if (isNaN(prevGPA)) return sgpa;
    return ((prevGPA + sgpa) / 2).toFixed(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const sgpa = calculateSGPA();
    const cgpa = showCGPAInput ? calculateCGPA() : sgpa;
    setResult(cgpa);
  };

  return (
    <div className="gpa-calculator">
      <h1>SGPA/CGPA Calculator</h1>
      <form onSubmit={handleSubmit}>
        {subjects.map((sub) => (
          <SubjectInput
            key={sub.name}
            subject={sub.name}
            credits={sub.credits}
            onGradeChange={handleGradeChange}
          />
        ))}

        <div className="cgpa-toggle">
          <label>
            <input
              type="checkbox"
              checked={showCGPAInput}
              onChange={() => setShowCGPAInput(!showCGPAInput)}
            />
            Include Previous Semester GPA for CGPA
          </label>
        </div>

        {showCGPAInput && (
          <div className="prev-gpa-input">
            <label>
              Previous Semester GPA:
              <input
                type="number"
                step="0.01"
                min="0"
                max="10"
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

export default GPACalculator;