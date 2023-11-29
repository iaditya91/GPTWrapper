import React from "react";
import { useRef, useState, useEffect, useContext } from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import TopBar from "../../DashBoard/Components/TopBar";

const QuestionsRepository = () => {
  const [alignment, setAlignment] = React.useState('paper');

  const handleChange = (
    event,
    newAlignment,
  ) => {
    setAlignment(newAlignment);
  };

  return (
    <>
    <TopBar/>
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="paper">Paper</ToggleButton>
      <ToggleButton value="quiz">Quiz</ToggleButton>
      <ToggleButton value="assignment">Assignment</ToggleButton>
    </ToggleButtonGroup>
    </>
  );
};

export default QuestionsRepository;
