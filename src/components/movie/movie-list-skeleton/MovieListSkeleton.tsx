
import {
  Card,
  CardActionArea,
  CardContent,
  Skeleton,
  useTheme,
} from "@mui/material";

const MovieListSkeleton = ({ bg }:{bg:string}) => {
    const theme=useTheme()
  return (
    <>
      <Card>
        <CardActionArea>
          <Skeleton
            sx={{ bgcolor: bg }}
            animation="wave"
            variant="rectangular"
            width="100%"
            height={250}
          />
          <CardContent sx={{ bgcolor: bg }}>
            <Skeleton
              animation="wave"
              variant="text"
              width="80%"
              height={20}
              sx={{ bgcolor: bg == theme.palette.background.paper ? "background.default" :"background.paper" }}
            />
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};
export default MovieListSkeleton;
