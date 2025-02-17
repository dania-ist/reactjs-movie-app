import { Box, Grid } from "@mui/material";
import MovieListSkeleton from "../movie-list-skeleton/MovieListSkeleton";
import MovieCard from "../movie-card/MovieCard";
import { Movie } from "src/types/movie";

interface IProps {
  loading: boolean;
  count: number;
  items: Array<Movie> | undefined;
  bg: string;
  msg: string;
}
const MovieListGrid = ({ loading, count, items, bg, msg }: IProps) => {
  return (
    <>
      {loading ? (
        <Grid container spacing={2} sx={{ marginTop: 5 }}>
          {[...new Array(count)].map((_, i) => (
            <Grid item xs={6} sm={4} lg={3} xl={2} key={i}>
              <MovieListSkeleton bg={bg} />
            </Grid>
          ))}
        </Grid>
      ) : (
        //
        <Grid container spacing={2} sx={{ marginTop: 5 }}>
          {items && items?.length < 1 ? (
            <Box sx={{ marginLeft: 2 }}>{msg}</Box>
          ) : (
            items?.map((item) => (
              <Grid key={item.id} item xs={6} sm={4} lg={3} xl={2}>
                <MovieCard movie={item} />
              </Grid>
            ))
          )}
        </Grid>
      )}
    </>
  );
};
export default MovieListGrid;
