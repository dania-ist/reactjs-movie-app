import { Box, Skeleton } from "@mui/material";

const MovieDetailsSkeleton = () => {
  return (
    <>
      <Box>
        <Skeleton variant="rectangular" height={500} width="100%" />
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
        <Skeleton variant="text" height={80} width="70%" />
        <Skeleton variant="text" height={80} width="70%" />
      </Box>
    </>
  );
};
export default MovieDetailsSkeleton;
