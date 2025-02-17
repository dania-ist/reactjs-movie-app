import { Container, Grid, useTheme } from "@mui/material";
import AppBreadcrumbs from "../../../components/common/AppBreadcrumbs";
import { keepPreviousData } from "@tanstack/react-query";
import AppPagination from "../../../components/common/Apppagination";
import MovieFilter from "../../../components/movie/movie-filter/MovieFilter";
import { TabContext, TabPanel } from "@mui/lab";
import MovieListTable from "../../../components/movie/movie-list-table/MovieListTable";
import MovieListGrid from "../../../components/movie/movie-list-grid/MovieListGrid";
import { useState } from "react";
import {
  Country,
  Genre,
  Language,
  Movie,
  ReturnedGenres,
  ReturnedMovies,
} from "../../../types/movie";
import { useFetch } from "../../../hooks/react-query";

import movieConfig from "../../../configs/movie";
import authConfig from "../../../configs/auth";
import { toggleFavorite, toggleWatchList } from "../../../axios/movieApi";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../store";
import {
  setWatchListState,
  setFavoritState,
} from "../../../store/slices/userSlice";

const MovieList = () => {
  const fav = useSelector((state: AppState) => state.userSlice.favorite);
  const watchlistState = useSelector(
    (state: AppState) => state.userSlice.watchlistState
  );
  const dispatch = useDispatch();
  const theme = useTheme();
  const [page, setPage] = useState<number>(1);
  const [languageFilter, setLanguageFilter] = useState("");
  const [genresFilter, setGenresFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [displayMode, setDisplayMode] = useState<"grid" | "table">("grid");

  const handleChangeDisplayMode = (newValue: "grid" | "table") => {
    setDisplayMode(newValue);
  };

  const handleChange = (e: React.ChangeEvent<unknown>, newValue: number) => {
    console.log("new", newValue, typeof newValue);
    setPage(newValue);
  };
  const handleChangeLanguage = (value: Language | null) => {
    setLanguageFilter(value ? value.iso_639_1 : "");
  };

  const handleChangeGenres = (value: Array<Genre>) => {
    let str = "";
    value.forEach((genre) => {
      str += `${genre.id},`;
    });
    setGenresFilter(str);
  };

  const handleChangeCountry = (value: Country | null) => {
    setCountryFilter(value ? value.iso_3166_1.toLowerCase() : "");
  };

  const { isLoading, isError, error, data, isFetching, isPlaceholderData } =
    useFetch<ReturnedMovies>(movieConfig.getAll, {
      page: page,
      with_genres: genresFilter,
      with_original_language: languageFilter,
      with_origin_country: countryFilter,
    });

  const { isPending: loading_genres, data: genres } = useFetch<
    ReturnedGenres | undefined
  >(movieConfig.getGenre);

  const { isPending: loading_languages, data: languages } = useFetch<
    Array<Language> | undefined
  >(movieConfig.getLanguages);

  const { isPending: loading_countries, data: countries } = useFetch<
    Array<Country> | undefined
  >(movieConfig.getCountries);

  const moviesList = data?.results;
  const { data: favorite, isSuccess } = useFetch<ReturnedMovies>(
    authConfig.myFavoriteEndpoint,
    {
      page: page,
    }
  );
  if (isSuccess) {
    dispatch(setFavoritState(favorite.results));
  }

  const { data: watchlist, isSuccess: isSuccessWatchList } =
    useFetch<ReturnedMovies>(authConfig.myListEndpoint, {
      page: page,
    });
  if (isSuccessWatchList) {
    dispatch(setWatchListState(watchlist.results));
  }

  return (
    <>
      <TabContext value={displayMode}>
        <Container>
          <AppBreadcrumbs title="Movie List" />
          <Grid container spacing={4} sx={{ marginTop: 5 }}>
            <Grid item xs={12}>
              <MovieFilter
                loading_countries={loading_countries}
                loading_genres={loading_genres}
                loading_languages={loading_languages}
                genres={genres}
                languages={languages}
                countries={countries}
                handleChangeCountry={handleChangeCountry}
                handleChangeLanguage={handleChangeLanguage}
                handleChangeGenres={handleChangeGenres}
                handleChangeDisplayMode={handleChangeDisplayMode}
              />
            </Grid>

            <Grid item xs={12}>
              <TabPanel
                value="grid"
                sx={{
                  "&.MuiTabPanel-root": {
                    padding: "0 !important",
                  },
                }}
              >
                <MovieListGrid
                  loading={isLoading}
                  count={24}
                  items={moviesList}
                  bg={theme?.palette?.background?.default}
                  msg="There is no Movies"
                />
              </TabPanel>
              <TabPanel
                sx={{
                  "&.MuiTabPanel-root": {
                    padding: "0 !important",
                  },
                }}
                value="table"
              >
                <MovieListTable rows={moviesList} loading={isLoading} />
              </TabPanel>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "end",
                marginTop: 3,
                marginBottom: 5,
              }}
            >
              {data?.results && data?.results?.length > 0 && (
                <AppPagination
                  page={page}
                  count={data?.total_pages > 500 ? 500 : data?.total_pages}
                  handleChange={handleChange}
                />
              )}
            </Grid>
          </Grid>
        </Container>
      </TabContext>
    </>
  );
};
export default MovieList;
