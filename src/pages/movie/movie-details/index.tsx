import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import instance from "../../../axios";
import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import movieConfig from "../../../configs/movie";
import StarIcon from "@mui/icons-material/Star";
import { Fragment } from "react";
import MovieDetailsSkeleton from "../../../components/movie/movie-details-skeleton/MovieDetailsSkeleton";
import toast from "react-hot-toast";
import { Movie } from "../../../types/movie";
import { useFetch } from "../../../hooks/react-query";

const MovieDetais = () => {
  const navigate = useNavigate();
  const { movieId } = useParams();
  const { isLoading, data: movie } =
 useFetch<
    Movie| undefined
  >(`/movie/${movieId}`);
  console.log(movie,"mf")
  //  useApiGet(
  //   ["movie", movieId],
  //   () => instance.get(`/movie/${movieId}`),
  //   {},
  //   (error) => {
  //     console.log("err",error)
  //     if(error.response.status
  //        != '401'){
  //       toast.error(error.response.data.status_message);
  //     navigate("/");
  //     }
  //   }
  // );
  return (
    <>
      <Container sx={{ marginTop: "136px" }}>
        {isLoading ? (
          <MovieDetailsSkeleton />
        ) : (
          <>
          
            <Box>
              <img
                style={{ width: "100%", height: "500px" }}
                src={`${movieConfig.imgUrl}/${movie?.backdrop_path})`}
              />
            </Box>
            <Box
              sx={{
                marginTop: 5,
                "& hr": {
                  borderColor: "text.secondary",
                  mx: 1,
                },
              }}
            >
              <Typography variant="h4" color="text.secondary">
                {movie?.title}
              </Typography>
              <Typography sx={{ my: 2 }} color="text.secondary">
                {movie?.overview}
              </Typography>
              <Grid container sx={{ my: 4 }}>
                <Grid item md={3}>
                  <img
                    style={{
                      width: "100%",
                      height: "300px",
                      objectFit: "fill",
                    }}
                    src={`${movieConfig.imgUrl}/${movie?.poster_path})`}
                  />
                </Grid>
                <Grid item md={7} >
                  <Box
                    sx={{
                      display: "flex",
                      maxWidth:"100%",
                      flexWrap:"wrap",
                      "& svg": {
                        m: 1,
                      },
                    }}
                  >
                    <Typography
                      variant="span"
                      color="text.secondary"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <StarIcon color="primary" />
                      {movie?.vote_average}
                    </Typography>{" "}
                    <Typography
                      variant="span"
                      color="text.secondary"
                      sx={{ display: "flex", alignItems: "center", mx: 2 }}
                    >
                      {movie?.status}
                    </Typography>
                    <Typography
                      variant="span"
                      color="text.secondary"
                      sx={{ display: "flex", alignItems: "center", m: 2 }}
                    >
                      {movie?.release_date}
                    </Typography>
                    <Typography
                      variant="span"
                      color="text.secondary"
                      sx={{ display: "flex", alignItems: "center", mx: 2 }}
                    >
                      {movie?.vote_count}{" "}
                      {movie?.vote_count && movie?.vote_count > 1 ? "votes" : "vote"}
                    </Typography>
                    <Typography
                      variant="span"
                      color="text.secondary"
                      sx={{ display: "flex", alignItems: "center", mx: 2 }}
                    >
                      {movie?.runtime} runtime
                    </Typography>
                  </Box>
                  <Typography
                    variant="span"
                    color="text.secondary"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      m: 2,
                    }}
                  >
                    {movie?.genres?.map((genre, index) => (
                      <Fragment key={genre?.id}>
                        <Typography variant="span" color="text.secondary">
                          {genre?.name}
                        </Typography>
                        {index != movie?.genres.length - 1 && (
                          <Divider
                            orientation="vertical"
                            variant="middle"
                            flexItem
                          />
                        )}
                      </Fragment>
                    ))}
                  </Typography>
                  <Typography
                    variant="span"
                    color="text.secondary"
                    sx={{ display: "flex", alignItems: "center", m: 2 }}
                  >
                    Language: {movie?.original_language}
                  </Typography>
                  <Typography
                    variant="span"
                    color="text.secondary"
                    sx={{ display: "flex", alignItems: "center", m: 2 }}
                  >
                    Origin Title: {movie?.original_title}
                  </Typography>{" "}
                  <Typography
                    variant="span"
                    color="text.secondary"
                    sx={{ display: "flex", alignItems: "center", m: 2 }}
                  >
                    budget: {movie?.budget}
                  </Typography>{" "}
                </Grid>
              </Grid>
            </Box>
          </>
        )}
      </Container>
    </>
  );
};
export default MovieDetais;
