import { alpha, styled } from "@mui/material/styles";
import { InputBase, Box, Card, TextField } from "@mui/material";

export const CustomInput = styled(TextField)(({ theme }) => ({
  width: "100%",
  marginBottom: "24px",
  "label + &": {
    marginTop: theme.spacing(3),
  },

  "& .MuiOutlinedInput-notchedOutline": {},
  "& .MuiInputBase-root": {
    borderRadius: "16px",
    height: "44px",
    position: "relative",
    color: "#fff !important",
    fontSize: "14px",
    width: "100%",

    backgroundColor: " #151f30",
    border: "1px solid transparent",

    padding: "30px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),

    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-error": {
      borderColor: "red",
    },
    "&.Mui-error:focus": {
      borderColor: "red",
    },
  },
}));
export const LoginWrapper = styled(Box)(({ theme }) => ({
  height: "100vh",
  backgroundImage: `url(${"src/assets/bg.jpg"})`,
}));
export const LoginContent = styled(Box)(({ theme }) => ({
  width: "100%",
  hight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "40px 0",
}));
export const LoginCard = styled(Card)(({ theme }) => ({
  width: "100%",
  borderRadius: "16px",
  maxWidth: "400px",
  backgroundColor: "#131720",
  border: "1px solid #151f30",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "30px 20px",
}));
