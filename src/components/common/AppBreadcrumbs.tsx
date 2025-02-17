
import { Box, Breadcrumbs, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";


interface IProps{
  title:string
}
const AppBreadcrumbs = ({ title}:IProps) => {
  const theme = useTheme()
  return (
    <>
      <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:"136px"}}>
        <Typography variant="h4" color="text.primary">{title}</Typography>
        <Breadcrumbs
          sx={{
            "& .MuiBreadcrumbs-separator": {
              color: "white",
            },
            "& .MuiBreadcrumbs-li a": {
              color: "white",
            },
          }}
          aria-label="breadcrumb"
        >
          <Link  color={theme?.palette?.text?.primary} to="/">
            Home
          </Link>

          <Typography color="text.primary">{title}</Typography>
        </Breadcrumbs>
      </Box>
    </>
  );
};
export default AppBreadcrumbs;
