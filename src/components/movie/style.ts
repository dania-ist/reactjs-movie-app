import {  Card } from "@mui/material";
import {  styled } from "@mui/material/styles";

export const MovieCardStyle = styled(Card)(({ theme }) => ({
    
  width: "100%",
  backgroundColor: theme.palette.background.paper,
  position: "relative",
  // transition: "10000s ease",
  // transitionProperty:"all",
  // transitionDelay:"1000s",
  // transition: theme.transitions.create(['background-color', 'transform'], {
  //   duration: theme.transitions.duration.standard,
  //   delay:"1000s"
  // }),
  "&:hover img": {
    transform: "scale(1.06)",
    filter: "blur(4px)",
    transition:"0.5s",
  },
  "&:hover h5": {
    color: theme.palette.text.primary,
    transition:"0.5s",
  },
  "&:hover svg": {
    backgroundColor:theme.palette.background.default,
    borderRadius:'50%',
    padding:"5px",
    opacity: 1,
    transition:"0.5s",
  },
}));

