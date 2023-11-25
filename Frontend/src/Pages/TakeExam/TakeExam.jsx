import React from "react";
import { useRef, useState, useEffect, useContext } from "react";
import TopBar from "../../DashBoard/Components/TopBar";

const TakeExam = () => {
  const [questions, setQuestions] = useState([
    {
      question: "que 1",
      questionType: "radio",
      options: { 1: "option1", 2: "option2" },
    },
    {
      question: "que 2",
      questionType: "multiselect",
      options: { 1: "option1", 2: "option2", 3: "option3" },
    },
  ]);

  const renderOptions = (options, questionType, questionIndex) => {
    return (
      <div style={{ display: "flex" }}>
        {Object.entries(options).map(([id, value]) => (
        <div style={{width: "110px"}} key={id}>
          {questionType === "radio" ? (
            <input type="radio" name={`question${questionIndex}`} value={id} />
          ) : (
            <input
              type="checkbox"
              name={`question${questionIndex}`}
              value={id}
            />
          )}
          <label >{value}</label>
        </div>
        ))}
      </div>
    );
  };

  return (
    <>
    <TopBar></TopBar>
      <h1>Exam</h1>
      {questions && questions.length > 0 ? (
        questions.map(({ question, questionType, options }, index) => {
          return (
            <div key={index}>
              <p>
                {index + 1}. {question}
              </p>
              {renderOptions(options, questionType)}
            </div>
          );
        })
      ) : (
        <div>Error Loading the Exam Questions</div>
      )}
      <button>Submit Answers</button>
    </>
  );
};

export default TakeExam;
