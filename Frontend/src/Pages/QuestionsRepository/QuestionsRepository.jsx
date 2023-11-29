import React from "react";
import { useRef, useState, useEffect, useContext } from "react";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import MuiToggleButton from "@mui/material/ToggleButton";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import TopBar from "../../DashBoard/Components/TopBar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

const QuestionsRepository = () => {
  const [alignment, setAlignment] = React.useState("paper");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const ToggleButton = styled(MuiToggleButton)(({ selectedColor }) => ({
    "&.Mui-selected, &.Mui-selected:hover": {
      color: "white",
      backgroundColor: selectedColor,
    },
  }));

  const theme = createTheme({
    palette: {
      text: {
        primary: "#000000",
      },
    },
  });

  const RepositoryList = () => {
    return (
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            primaryTypographyProps={{ color: "black" }}
            primary="Brunch this weekend?"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Ali Connors
                </Typography>
                {" — I'll be in your neighborhood doing errands this…"}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          </ListItemAvatar>
          <ListItemText
            primaryTypographyProps={{ color: "black" }}
            primary="Summer BBQ"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  to Scott, Alex, Jennifer
                </Typography>
                {" — Wish I could come, but I'm out of town this…"}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
          </ListItemAvatar>
          <ListItemText
            primaryTypographyProps={{ color: "black" }}
            primary="Oui Oui"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Sandra Adams
                </Typography>
                {" — Do you have Paris recommendations? Have you ever…"}
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
    );
  };

  return (
    <div style={{ backgroundColor: "white", minHeight: "100vh" }}>
      <TopBar />
      <ThemeProvider theme={theme}>
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton selectedColor="#00abc0" value="paper">
            Paper
          </ToggleButton>
          <ToggleButton selectedColor="#00abc0" value="quiz">
            Quiz
          </ToggleButton>
          <ToggleButton selectedColor="#00abc0" value="assignment">
            Assignment
          </ToggleButton>
        </ToggleButtonGroup>
        <RepositoryList />
      </ThemeProvider>
    </div>
  );
};

export default QuestionsRepository;
