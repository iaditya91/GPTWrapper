import React from "react";
import { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import TopBar from "../../DashBoard/Components/TopBar";
import { Button } from "@mui/material";
import axios from "../../api/axios";
import {Spinner} from "../../DashBoard/Components/Spinner";

const GenerateQuestionsOutput = () => {
  const DOWNLOAD_PAPER_URL = "/download_question_paper";
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [paperName, setPaperName] = useState("");
  useEffect(() => {
    console.log(location);
    setPaperName(location.state.paperName);
    setQuestions(location.state.questions);
  }, [location.state]);

  const itemList = [
    { id: 1, displayText: "Item 1" },
    { id: 2, displayText: "Item 2" },
    // Add more items as needed
  ];
  const [selectedValues, setSelectedValues] = useState({});
  const [dummy, setDummy] = useState(false);

  const handleCheckboxChange = (itemId) => {
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [itemId]: !prevValues[itemId],
    }));
  };

  const handleDropdownChange = (itemId, selectedValue) => {
    // Handle dropdown value change
    console.log(`Item ${itemId} - Selected value: ${selectedValue}`);
  };

  const handleButtonClick = (item) => {
    item.showAnswer ? (item.showAnswer = false) : (item.showAnswer = true);
    dummy ? setDummy(false) : setDummy(true);
  };

  const handleDownloadPaper = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        DOWNLOAD_PAPER_URL,
        JSON.stringify({paperName, selectedValues}),
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            Connection: "keep-alive",
          },
        }
      );
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <>
      <TopBar />
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <h>{paperName && paperName}</h>
          {questions &&
            questions.length >= 0 &&
            questions.map((item) => (
              <div key={item.id} style={{ marginBottom: "10px" }}>
                <input
                  type="checkbox"
                  checked={selectedValues[item.id] || false}
                  onChange={() => handleCheckboxChange(item.id)}
                />
                <span>{item.question}</span>

                {item.showAnswer && <span>{item.answer}</span>}
                <button onClick={() => handleButtonClick(item)}>
                  {item.showAnswer ? "Hide" : "Show"}
                </button>

                <select
                  onChange={(e) =>
                    handleDropdownChange(item.id, e.target.value)
                  }
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="4">4</option>
                  <option value="6">6</option>
                </select>
              </div>
            ))}

          <Button onClick={handleDownloadPaper}>Download Paper</Button>
        </div>
      )}
    </>
  );
};

export default GenerateQuestionsOutput;
