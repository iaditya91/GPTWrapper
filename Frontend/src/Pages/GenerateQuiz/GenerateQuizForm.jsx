import React from "react";
import { useRef, useState, useEffect, useContext } from "react";
import "../../css/MyForm.css";
import { useHistory } from 'react-router-dom';
import TopBar from "../../DashBoard/Components/TopBar";
import axios from "../../api/axios";
import AuthContext from "../../Authentication/context/AuthProvider";
import {Spinner} from "../../DashBoard/Components/Spinner";

const GenerateQuizForm = () => {
  const GENERATE_QUESTIONS_URL = "/generate_quiz_sample";
  const history = useHistory();
  const { auth } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    token: auth.token,
    textbook: null,
    chapter_from: null,
    chapter_to: null,
    paper_name: null,
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setFormData({
      ...formData,
      textbook: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      // setLoading(true);
      // const response = await axios.post(
      //   GENERATE_QUESTIONS_URL,
      //   JSON.stringify(formData),
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //       Accept: "*/*",
      //       Connection: "keep-alive",
      //     },
      //   }
      // );
      // setLoading(false);
      const data = {
        paperName: "Paper Name",
        questions: [
          {
            id: 1,
            question: "question 1",
            answer: "answer 1",
            showAnswer: false,
          },
          {
            id: 2,
            question: "question 2",
            answer: "answer 2",
            showAnswer: false,
          },
          {
            id: 3,
            question: "question 3",
            answer: "answer 3",
            showAnswer: false,
          },
        ],
      };
      history.push({
        pathname: "/generateQuizOutput", 
        state: data,
      });
    } catch (err) {
      setLoading(false);
      //throw new Error(err);
    }
    //history.push("/generateQuizOutput");
  };

  return (
    <>
      <TopBar />
      {loading ? (
        <Spinner />
      ) : (
        <div
          style={{
            display: "grid",
            alignItems: "center",
            justifyContent: "center",
            // height: "90vh",
            // marginRight: "1%",
            backgroundColor: "lightgreen",
          }}
        >
          <section style={{ justifyContent: "center" }}>
            <h1 style={{ color: "black" }}>Generate Quiz</h1>
            <br />
            <p style={{ color: "black" }}>
              Upload the Text Book and mention the chapter number to Generate
              Quiz
            </p>
            <form onSubmit={handleSubmit} className="my-form">
              <label>
                Question Number:
                <input
                  type="text"
                  name="paperName"
                  value={formData.chapterNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, paper_name: e.target.value })
                  }
                />
              </label>
              <label>Chapter Number:</label>
              From:
              <input
                type="number"
                name="chapterFrom"
                value={formData.chapterNumber}
                onChange={(e) =>
                  setFormData({ ...formData, chapter_from: e.target.value })
                }
              />
              To:
              <input
                type="number"
                name="chapterTo"
                value={formData.chapterNumber}
                onChange={(e) =>
                  setFormData({ ...formData, chapter_to: e.target.value })
                }
              />
              <label>TextBook:</label>
              <input type="file" name="file" onChange={handleFileChange} />
              <br />
              <button type="submit">Generate Quiz Questions</button>
            </form>
          </section>
        </div>
      )}
    </>
  );
};

export default GenerateQuizForm;
