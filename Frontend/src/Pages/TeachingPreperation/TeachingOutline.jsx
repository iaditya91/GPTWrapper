import React from "react";
import { useRef, useState, useEffect, useContext } from "react";
import { styled } from "@mui/material/styles";
import TopBar from "../../DashBoard/Components/TopBar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import CircleIcon from '@mui/icons-material/Circle';

const TeachingOutline = () => {
  const [dense, setDense] = React.useState(true);

  function generate(element) {
    return [0, 1, 2].map((value) =>
      React.cloneElement(element, {
        key: value,
      })
    );
  }

  const Demo = styled("div")(({ theme }) => ({
    backgroundColor: "white",
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
  return (
    <div style={{backgroundColor: "lightgreen", minHeight: "100vh",}}>
      <TopBar />
      <h1 style={{color:"black"}}>Teaching Outline</h1>
      <Typography sx={{ mt: 4, mb: 2 }} style={{color:"black"}} variant="h6" component="div">
        Topic Headlines
      </Typography>
      <GenerateList />

      <Typography sx={{ mt: 4, mb: 2 }} style={{color:"black"}} variant="h6" component="div">
        Topic Relation with other fields
      </Typography>
      <GenerateList />

      <Typography sx={{ mt: 4, mb: 2 }} style={{color:"black"}} variant="h6" component="div">
        Topic Examples
      </Typography>
      <GenerateList />
    </div>
  );
};

export default TeachingOutline;
