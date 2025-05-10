import React, { useState } from "react";

import { Link } from "react-router-dom";
import {
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Box,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import PostIcon from "@mui/icons-material/Article";
import SignOutIcon from "@mui/icons-material/Login";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import { Outlet } from "react-router-dom";
export default function Root() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  return (
    <Box className="bg-zinc-400 min-h-screen">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              C M S
            </Typography>

            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                component={Link}
                to="/profile"
              >
                <AccountCircle />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer
        variant="temporary"
        open={isDrawerOpen}
        onClose={handleDrawerClose}
      >
        <List>
          <MenuItem component={Link} to="/">
            <ListItemIcon color="primary">
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </MenuItem>
          <MenuItem component={Link} to="/posts">
            <ListItemIcon>
              <PostIcon />
            </ListItemIcon>
            <ListItemText primary="Posts" />
          </MenuItem>
          <MenuItem component={Link} to="/races">
            <ListItemIcon>
              <PostIcon />
            </ListItemIcon>
            <ListItemText primary="Corridas" />
          </MenuItem>
          <MenuItem component={Link} to="/login">
            <ListItemIcon>
              <SignOutIcon />
            </ListItemIcon>
            <ListItemText primary="Log Out" />
          </MenuItem>
        </List>
      </Drawer>
      <Outlet></Outlet>
    </Box>
  );
}
