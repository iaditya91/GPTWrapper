import React from "react";
import { useRef, useState, useEffect, useContext } from "react";
import { styled } from "@mui/material/styles";
import TopBar from "../../DashBoard/Components/TopBar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import CircleIcon from "@mui/icons-material/Circle";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";

const ExploreTopic = () => {
  const [dense, setDense] = React.useState(true);

  const topics = [
    { title: "topic 1" },
    { title: "topic 2" },
    { title: "topic 3" },
    { title: "topic 4" },
  ];

  function generate(element) {
    return [0, 1, 2].map((value) =>
      React.cloneElement(element, {
        key: value,
      })
    );
  }

  const Demo = styled("div")(({ theme }) => ({
    backgroundColor: "grey",
    // backgroundColor: theme.palette.background.paper,
  }));

  const GenerateList = () => {
    return (
      <>
        <Demo>
          <List dense={dense}>
            {generate(
              <ListItem>
                <ListItemIcon>
                  <CircleIcon />
                </ListItemIcon>
                <ListItemText secondary="list item" />
              </ListItem>
            )}
          </List>
        </Demo>
      </>
    );
  };


  const SearchBarWithAutoSuggestions = () => {
    return (
      <div style={{backgroundColor:"grey", marginLeft:"20px"}}>
        <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={topics.map((option) => option.title)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search input"
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
      />
      </div>
    );
  };

  return (
    <>
      <TopBar />
      Search Another Topic: <SearchBarWithAutoSuggestions />
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        Topic Name
      </Typography>
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        Topic Main & Interesting Points
      </Typography>
      <GenerateList />
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        Topic latest advancements
      </Typography>
      <GenerateList />
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        Topic latest news
      </Typography>
      <GenerateList />
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        Topic career options
      </Typography>
      <GenerateList />
    </>
  );
};

export default ExploreTopic;
