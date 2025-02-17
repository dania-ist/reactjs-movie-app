import { createTheme } from "@mui/material/styles";
import { ThemeOptions } from "@mui/material/styles/createTheme";
import { TypographyOptions } from "@mui/material/styles/createTypography";
import { TransitionProps } from "@mui/material/transitions";
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    span: true;
  }
}

interface ExtendedTypographyOptions extends TypographyOptions {
  span: React.CSSProperties;
}
  const themeConfigs={
    palette: {
      
        primary: {
          main: "#0A8FDC",
          contrastText: "#fff",
        },
        background:{
            default:'#151f30',
            paper:'#131720'
        },
        text:{
            // primary:'#fff'
            primary: "#1976d2",
            // primary:"red",
            secondary: "white",
        }
    },
    typography:{
        fontFamily: '"Rubik", sans-serif',
        span: {
          color: "red"
        }
    }  as ExtendedTypographyOptions,     
    
  }
export const theme = createTheme(themeConfigs);
  