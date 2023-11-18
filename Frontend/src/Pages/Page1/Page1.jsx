import React from 'react';
import { useRef, useState, useEffect, useContext } from 'react';
import './MyForm.css';

const Page1 = () => {
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
        // You can perform actions with the form data here, like making an API request
      };
    
      return (
        <div className="form-container">
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
              <input
                type="file"
                name="file"
                onChange={handleFileChange}
              />
            </label>
            <br />
            <button type="submit">Submit</button>
          </form>
        </div>
      );
    };

export default Page1