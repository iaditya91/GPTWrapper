import React from "react";
import { useRef, useState, useEffect, useContext } from "react";
import "../../css/MyForm.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import TopBar from "../../DashBoard/Components/TopBar";

const Page1 = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    chapterNumber: null,
    file: null,
  });

  const handleInputChange = (e) => {
    const { chapterNumber, value } = e.target;
    setFormData({
      ...formData,
      [chapterNumber]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      file: file,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    history.push("/output");
  };

  return (
    <>
      <TopBar />
      <div
        style={{
          display: "grid",
          alignItems: "center",
          justifyContent: "center",
          height: "70vh",
          marginRight: "1%",
          backgroundColor: "lightgreen",
        }}
      >
        <section style={{ justifyContent: "center" }}>
          <form onSubmit={handleSubmit} className="my-form">
            <label>
              Chapter Number:
              <input
                type="text"
                name="chapterNumber"
                value={formData.chapterNumber}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label>
              File Upload:
              <input type="file" name="file" onChange={handleFileChange} />
            </label>
            <br />
            <button type="submit">Submit</button>
          </form>
        </section>
      </div>
    </>
  );
};

export default Page1;
