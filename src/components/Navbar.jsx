import { memo } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useLocation, useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const location = useLocation();

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        width: "100%",
        flexGrow: 1,
        display:
          location.pathname == "/login" || location.pathname == "/register"
            ? "none"
            : "block",
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <Button
            variant="contained"
            sx={{ mr: "auto" }}
            onClick={() => navigate(user ? "/todos" : "/")}
          >
            TODO LIST
          </Button>
          {!user ? (
            <>
              <Button
                variant="outlined"
                color="inherit"
                sx={{ marginRight: 1 }}
                onClick={() => navigate("/login")}
              >
                Sign-In
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => navigate("/register")}
              >
                Sign-Up
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outlined"
                color="inherit"
                sx={{ marginRight: 1 }}
                onClick={() => navigate("/profile")}
              >
                Profile
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => logout()}
              >
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default memo(Navbar);
