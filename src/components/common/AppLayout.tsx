import * as React from "react";
import { CSSObject, styled, Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link, Outlet } from "react-router-dom";
import AppHeader from "./AppHeader";
import { useMediaQuery } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme?.transitions?.create("width", {
    easing: theme?.transitions?.easing?.sharp,
    duration: theme?.transitions?.duration?.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    // marginLeft: drawerWidth,
    // width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState<boolean>(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const drawerList = [
    {
      text: "Profile",
      to: "/my-profile",
    },
    {
      text: "Favorite",
      to: "/my-profile#fav",
    },
    {
      text: "Watch List",
      to: "/my-profile#list",
    },
  ];
  const LinkStyled = styled(Link)(({ theme }) => ({
    color: theme.palette.text.primary,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  }));
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));
  return (
    // <Box>
    <Box
      sx={{
        display: "flex",
        "& .MuiPaper-root": {
          backgroundColor: "background.paper",
          borderRightColor: "background.default",
          boxShadow:
            "0px 2px 4px -1px background.default,0px 4px 5px 0px background.default,0px 1px 10px 0px background.default",
        },
        "& .MuiSvgIcon-root": {
          color: "text.primary",
        },
        "& .MuiList-root": {
          backgroundColor: "background.paper",
        },
        "& .MuiDivider-root": {
          borderColor: "background.default",
        },
      }}
    >
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          ...(hidden && { zIndex: 9999, position: "fixed" }),
          ...(!open && hidden && { display: "none" }),
        }}
      >
        <DrawerHeader sx={{ minHeight: "136px!important" }}></DrawerHeader>
        <Divider />
        <IconButton
          onClick={handleDrawerOpen}
          sx={{
            ...(open && { display: "none" }),
          }}
        >
          <ChevronRightIcon />
          {/* )} */}
        </IconButton>
        <IconButton
          onClick={handleDrawerClose}
          sx={{
            ...(!open && { display: "none" }),
          }}
        >
          {hidden ? <CloseIcon /> : <ChevronLeftIcon />}
        </IconButton>
        <List
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {drawerList.map((drawerListItem, index) => (
            <LinkStyled key={index} to={drawerListItem.to}>
              {" "}
              <ListItem
                key={drawerListItem?.text}
                disablePadding
                sx={{ display: "block" }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {index === 0 ? (
                      <PersonIcon />
                    ) : index === 1 ? (
                      <FavoriteIcon />
                    ) : (
                      <CreateNewFolderIcon />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={drawerListItem.text}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </LinkStyled>
          ))}
        </List>
        <Divider />
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          maxWidth: hidden
            ? `calc(100vw -  3px)`
            : open
            ? `calc(100vw - (${drawerWidth}px + 3px))`
            : `calc(100vw - (65px + 3px))`,
        }}
      >
        <DrawerHeader />
        <AppBar
          position="fixed"
          open={open}
          sx={{
            backgroundColor: "background.paper",
            "& .MuiButtonBase-root": {
              color: "text.primary",
            },
          }}
        >
          <Toolbar>
            {hidden ? (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
            ) : null}

            <AppHeader />
          </Toolbar>
        </AppBar>
        <Outlet />
      </Box>
    </Box>
  );
}
