import { useTheme }  from '@mui/material'
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Tab,
  Typography,
} from "@mui/material";
import AppBreadcrumbs from "../../../components/common/AppBreadcrumbs";
import { useEffect, useState } from "react";
import { TabContext } from "@mui/lab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import profileImage from "../../../assets/avatar.svg";
import { useAuth } from "../../../hooks/useAuth";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import MovieListGrid from "../../../components/movie/movie-list-grid/MovieListGrid";
import { useFetch } from "../../../hooks/react-query";
import { ReturnedMovies } from "../../../types/movie";
import authConfig from '../../../configs/auth'
import { useDispatch } from 'react-redux';
import { setFavoritState, setWatchListState } from '../../../store/slices/userSlice';
const UserProfile = () => {
 
  const dispatch = useDispatch();
  const theme = useTheme();
  const [value, setValue] = useState("1");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    newValue == "2"
      ? navigate("/my-profile/#fav")
      : newValue == "3"
      ? navigate("/my-profile/#list")
      : navigate("/my-profile");
  };

  const {
    isLoading: loading_favorites,
    isError,
    error,
    data,
    isFetching,
    isSuccess,
    isPlaceholderData,
  } = 
  useFetch<ReturnedMovies>(authConfig.myFavoriteEndpoint, {
    page: page,
  });
  if (isSuccess) {
    dispatch(setFavoritState(data.results));
  }

  const { isPending: loading_watchlist, data: lists ,isSuccess:isSuccessWatchList} =useFetch<ReturnedMovies>(authConfig.myListEndpoint, {
    page: page,
  });
  if (isSuccessWatchList) {
    dispatch(setWatchListState(lists.results));
  }
  const myList = lists?.results;
  const auth = useAuth();
  const { hash } = useLocation();
  useEffect(() => {
    hash == "#fav"
      ? setValue("2")
      : hash == "#list"
      ? setValue("3")
      : setValue("1");
  }, [hash]);

  return (
    <>
      <Container>
        <AppBreadcrumbs title="Profile" />
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Card
              sx={{
                backgroundColor: theme.palette.background.default,
                marginTop: 5,
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="User Info" value="1" />
                    <Tab label="My Favorites" value="2" />
                    <Tab label="My List" value="3" />
                  </TabList>
                </Box>
              </CardContent>
            </Card>
            <Card
              sx={{
                marginTop: 5,
                backgroundColor: theme.palette.background.default,
                // minHeight: "300px",
              }}
            >
              <CardContent>
                <TabPanel
                  value="1"
                  sx={{
                    "&.MuiTabPanel-root": {
                      padding: "0 !important",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100px",
                    }}
                  >
                    <Avatar
                      alt="Remy Sharp"
                      src={profileImage}
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: "10px",
                        marginRight: "10px",
                      }}
                    />
                    <Box>
                      {auth?.user ? (
                        <>
                          <Typography variant="h6" color="text.secondary">
                            {auth?.user?.username}
                          </Typography>
                          <Typography variant="h6" color="text.primary">
                            {auth?.user?.id}
                          </Typography>
                        </>
                      ) : (
                        <CircularProgress />
                      )}
                    </Box>
                  </Box>
                </TabPanel>
                <TabPanel
                  value="2"
                  sx={{
                    "&.MuiTabPanel-root": {
                      padding: "0 !important",
                    },
                  }}
                >
                  <MovieListGrid
                    loading={loading_favorites}
                    count={6}
                    items={data?.results}
                    bg={theme.palette.background.paper}
                    msg="No Movies Added To Favorite Yet"
                  />
                </TabPanel>
                <TabPanel
                  value="3"
                  sx={{
                    "&.MuiTabPanel-root": {
                      padding: "0 !important",
                    },
                  }}
                >
                  <MovieListGrid
                    loading={loading_watchlist}
                    count={6}
                    items={myList}
                    bg={theme.palette.background.paper}
                    msg="No Movies Added To WatchList Yet"
                  />
                </TabPanel>
              </CardContent>
            </Card>
          </TabContext>
        </Box>
      </Container>
    </>
  );
};

export default UserProfile;
