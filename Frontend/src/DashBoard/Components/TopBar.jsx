import React, { useContext } from "react";
import AuthContext from "../../Authentication/context/AuthProvider";
import "./TopBar.css";
import Grid from '@mui/material/Grid';
import HomeIcon from "@mui/icons-material/Home";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useHistory } from "react-router-dom";
import Logout from "@mui/icons-material/Logout";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import NotificationsIcon from "@mui/icons-material/Notifications";
import * as utils from "../../utils/utils";
import ChatIcon from "@mui/icons-material/Chat";
import { Button } from "@mui/material";

const TopBar = () => {
  const [profileMenuAnchorEl, setProfileMenuAnchorEl] = React.useState(null);
  const [notificationMenuAnchorEl, setNotificationMenuAnchorEl] =
    React.useState(null);

  const [notifications, setNotifications] = React.useState([
    { message: "You have an assignment deadline on 24th Nov", data: "data" },
    { message: "You have an quiz deadline on 30th Nov", data: "data" },
  ]);

  const { auth, setAuth } = useContext(AuthContext);
  const history = useHistory();

  const textStyle = {
    margin: "0 5px",
    height: "45px",
    justifyContent: "center",
    textAlign: "center",
  };

  const logoutHandler = () => {
    setAuth({});
    history.push("/login");
    setProfileMenuAnchorEl(null);
  };

  const profileOpen = Boolean(profileMenuAnchorEl);
  const notificationOpen = Boolean(notificationMenuAnchorEl);

  const handleProfileClick = (event) => {
    setProfileMenuAnchorEl(event.currentTarget);
  };
  const handleProfileClose = () => {
    setProfileMenuAnchorEl(null);
  };

  const handleNotificationClick = (event) => {
    setNotificationMenuAnchorEl(event.currentTarget);
  };
  const handleNotificationClose = () => {
    setNotificationMenuAnchorEl(null);
  };

  const handleAccountProfileClick = () => {
    history.push("/profile");
    setProfileMenuAnchorEl(null);
  };

  const handleAccountChatClick = () => {
    history.push("/chat");
    setProfileMenuAnchorEl(null);
  };

  return (
    <>
      <div className="topbar__barContent">
        <Grid container>
          <Grid
            item
            xs={3}
            style={{ display: "flex", justifyContent: "flex-start" }}
          >
            <h1>GPT Wrapper</h1>
          </Grid>
          <Grid
            item
            xs={9}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            {!utils.isObjectEmpty(auth) ? (
              <>
                <HomeIcon
                  className="topbar__img"
                  style={{ maxWidth: "25px", maxHeight: "25px" }}
                  onClick={() => {
                    history.push("/dashboard");
                  }}
                />
                <CircleNotificationsIcon
                  onClick={handleNotificationClick}
                  aria-controls={
                    notificationOpen ? "notification-menu" : undefined
                  }
                  aria-haspopup="true"
                  aria-expanded={notificationOpen ? "true" : undefined}
                  className="topbar__img"
                  style={{ maxWidth: "25px", maxHeight: "25px" }}
                />
                <Avatar
                  onClick={handleProfileClick}
                  aria-controls={profileOpen ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={profileOpen ? "true" : undefined}
                  className="topbar__img"
                  style={{ maxWidth: "25px", maxHeight: "25px" }}
                  src={AccountCircleIcon}
                />
              </>
            ) : (
              <>
                <Button
                  style={textStyle}
                  size="small"
                  variant="contained"
                  onClick={() => history.push("/login")}
                >
                  SignIn
                </Button>
                <Button
                  style={textStyle}
                  size="small"
                  onClick={() => history.push("/signup")}
                >
                  SignUp
                </Button>
              </>
            )}
          </Grid>
        </Grid>
        <Menu
          anchorEl={profileMenuAnchorEl}
          id="account-menu"
          open={profileOpen}
          onClose={handleProfileClose}
          onClick={handleProfileClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleAccountProfileClick}>
            <ListItemIcon>
              <AccountCircleIcon fontSize="small" />
            </ListItemIcon>
            Profile
          </MenuItem>
          <MenuItem onClick={handleAccountChatClick}>
            <ListItemIcon>
              <ChatIcon fontSize="small" />
            </ListItemIcon>
            Chat
          </MenuItem>
          <MenuItem onClick={logoutHandler}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>

        <Menu
          anchorEl={notificationMenuAnchorEl}
          id="notification-menu"
          open={notificationOpen}
          onClose={handleNotificationClose}
          onClick={handleNotificationClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          {notifications && notifications.length === 0 ? (
            <MenuItem onClick={handleNotificationClose}>
              <ListItemIcon>
                <NotificationsIcon fontSize="small" />
              </ListItemIcon>
              <p>You have No New Notifications!</p>
            </MenuItem>
          ) : (
            notifications.map((notification, index) => {
              return (
                <MenuItem
                  onClick={(e) => {
                    e.preventDefault();
                    history.push("/takeExam");
                  }}
                  key={index}
                >
                  <ListItemIcon>
                    <NotificationsActiveIcon fontSize="small" />
                  </ListItemIcon>
                  <p>{notification.message}</p>
                </MenuItem>
              );
            })
          )}
        </Menu>
      </div>
    </>
  );
};

export default TopBar;
