import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Tooltip,
} from "@mui/material";
import logo from "../../assets/logo.svg";
import { useAuth } from "../../hooks/useAuth";
import PersonIcon from "@mui/icons-material/Person";
import { useState } from "react";
import { Link } from "react-router-dom";

interface IProps{
  handleChangeSearch?:(e: React.ChangeEvent<HTMLInputElement |HTMLTextAreaElement> | undefined) => void;
}
const AppHeader = ({ handleChangeSearch }:IProps) => {
  const auth = useAuth();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    auth.logout();
  };
  return (
    <>
      <Box
        sx={{
          width:"100%",
          marginBottom: 5,
          marginTop: 5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ marginRight: "24px" }}>
          <Link to="/">
            <img src={logo} />
          </Link>
        </Box>
        <TextField
          onChange={(event) => handleChangeSearch && handleChangeSearch(event)}
          id="outlined-basic"
          label="Search for movie.."
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root fieldset": {
              backgroundColor: "transparent",
            },
            "& .MuiInputBase-root": {
              borderRadius: "50px",
            },
            "& .MuiInputBase-input": {
              color: "text.secondary",
            },
            backgroundColor: "background.default",
            borderRadius: "50px",
            flexGrow: 0.5,
          }}
        />

        <Box>
          <Tooltip title="">
            <IconButton
              onClick={handleClick}
              size="medium"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <PersonIcon color="primary" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            backgroundColor: "background.default",
            "&.MuiPaper-root::before": {
              backgroundColor: "background.default",
            },
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};
export default AppHeader;
