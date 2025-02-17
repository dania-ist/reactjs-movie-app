import { useTheme } from "@emotion/react";
import { Skeleton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AddToQueueIcon from "@mui/icons-material/AddToQueue";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CreateNewFolderOutlinedIcon from "@mui/icons-material/CreateNewFolderOutlined";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import { MovieCardStyle } from "../style";
import toast from "react-hot-toast";
import movieConfig from "../../../configs/movie";
import { Movie } from "../../../types/movie";
import { usePost } from "../../../hooks/react-query";
import { useSelector } from "react-redux";
import { AppState } from "../../../store";
import { useDispatch } from "react-redux";
import { toggleFavorite, toggleWatchList } from "../../../axios/movieApi";

interface IProps {
  movie: Movie;
}
const MovieCard = ({ movie }: IProps) => {
  const fav = useSelector((state: AppState) => state.userSlice.favorite);
  const watchlist = useSelector(
    (state: AppState) => state.userSlice.watchlistState
  );
  const dispatch = useDispatch();
  const { hash } = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const LinkStyled = styled(Link)(({ theme }) => ({}));

  const handleAddFavoriteSuccess = () => {
    toggleFavorite(fav, movie, dispatch);
  };
  const handleAddWatchListSuccess = () => {
    toggleWatchList(watchlist, movie, dispatch);
  };
  const { mutate } = usePost(
    "/account/21281567/favorite",
    handleAddFavoriteSuccess,
    ["/account/21281567/favorite"]
  );
  const { mutate: addToWatch } = usePost(
    "/account/21281567/watchlist",
    handleAddWatchListSuccess,
    ["/account/21281567/watchlist"]
  );

  const handleAddToFvorite = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    e.preventDefault();
    mutate({
      media_type: "movie",
      media_id: movie.id,
      favorite: fav?.findIndex((mov) => mov.id == movie.id) > -1 ? false : true,
    });
  };
  const handleAddToWatchList = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    e.preventDefault();
    addToWatch({
      watchlist:
        watchlist?.findIndex((mov) => mov.id == movie.id) > -1 ? false : true,
      media_id: movie.id,
      media_type: "movie",
    });
  };

  return (
    <MovieCardStyle>
      <LinkStyled to={`/movie/${movie?.id}`}>
        <img
          style={{ width: "100%", height: "100%" }}
          src={`${movieConfig?.imgUrl}/${movie?.poster_path}`}
        />

        {fav?.findIndex((mov) => mov.id == movie.id) > -1 && (
          <FavoriteIcon
            onClick={(e) => handleAddToFvorite(e)}
            sx={{ position: "absolute", top: 4, left: 10, opacity: 0 }}
            color="primary"
          />
        )}
        {fav?.findIndex((mov) => mov.id == movie.id) < 0 && (
          <FavoriteBorderIcon
            onClick={(e) => handleAddToFvorite(e)}
            sx={{ position: "absolute", top: 4, left: 10, opacity: 0 }}
            color="primary"
          />
        )}
        {watchlist?.findIndex((mov) => mov.id == movie.id) > -1 && (
          <CreateNewFolderIcon
            onClick={(e) => handleAddToWatchList(e)}
            sx={{ position: "absolute", top: 40, left: 10, opacity: 0 }}
            color="primary"
          />
        )}
        {watchlist?.findIndex((mov) => mov.id == movie.id) < 0 && (
          <CreateNewFolderOutlinedIcon
            onClick={(e) => handleAddToWatchList(e)}
            sx={{ position: "absolute", top: 40, left: 10, opacity: 0 }}
            color="primary"
          />
        )}
      </LinkStyled>
      <Typography
        variant="h5"
        color="text.secondary"
        sx={{
          maxHeight: "50px",
          whiteSpace: "nowrap",
          marginBottom: 1,
          textOverflow: "ellipsis",
          overflow: "hidden",
        }}
      >
        {movie?.title}
      </Typography>
    </MovieCardStyle>
  );
};

export default MovieCard;
