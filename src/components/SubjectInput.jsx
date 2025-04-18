import React from "react";

const SubjectInput = ({ subject, credits, onGradeChange }) => {
  const grades = [
    { label: "A", value: 10 },
    { label: "A-", value: 9 },
    { label: "B", value: 8 },
    { label: "B-", value: 7 },
    { label: "C", value: 6 },
    { label: "C-", value: 5 },
    { label: "D", value: 4 },
  ];

  return (
    <div className="subject-input">
      <label>
        {subject} ({credits} credits):
        <select onChange={(e) => onGradeChange(subject, parseInt(e.target.value))}>
          <option value="">Select Grade</option>
          {grades.map((grade) => (
            <option key={grade.label} value={grade.value}>
              {grade.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default SubjectInput;