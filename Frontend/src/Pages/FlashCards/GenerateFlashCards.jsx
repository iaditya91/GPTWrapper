import React from 'react';
import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "../../Authentication/context/AuthProvider";
import { useHistory } from 'react-router-dom';
import TopBar from '../../DashBoard/Components/TopBar';
import { Spinner} from '../../DashBoard/Components/Spinner'

const GenerateFlashCards = () => {
    const GENERATE_FLASHCARDS_URL = "/generate_flashcards";
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
        //   GENERATE_FLASHCARDS_URL,
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
          paperName: "FlashCard Name",
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
          pathname: "/viewFlashCards", 
          state: data,
        });
      } catch (err) {
        setLoading(false);
        //throw new Error(err);
      }
      //history.push("/viewFlashCards");
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
            minHeight: "90vh",
            }}
          >
            <section style={{ justifyContent: "center" }}>
              <h1 style={{ color: "black" }}>Generate FlashCards</h1>
              <br />
              <p style={{ color: "black" }}>
                Upload the Text Book and mention the chapter number to Generate
                FlashCards
              </p>
              <form onSubmit={handleSubmit} className="my-form">
                <label>
                  FlashCard Name:
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
                <button type="submit">Generate FlashCards</button>
              </form>
            </section>
          </div>
        )}
      </>);
}

export default GenerateFlashCards