import * as React from "react";
import { styled } from "@mui/material/styles";
import { DataGrid, gridClasses, GridColDef, GridRowId, GridRowParams } from "@mui/x-data-grid";
import AppPagination from "../../common/Apppagination";
import movieConfig from "../../../configs/movie";
import { Rating } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import CreateNewFolderOutlinedIcon from "@mui/icons-material/CreateNewFolder";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { usePost } from "../../../hooks/react-query";
import { Movie, ToggleParams } from "../../../types/movie";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../store";
import { toggleFavorite, toggleWatchList } from "../../../axios/movieApi";
import { BorderColor } from "@mui/icons-material";

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  "&.MuiDataGrid-root": {
    border: "none",
  },
  "& .MuiDataGrid-footerContainer": {
    border: "none",
    display: "none",
  },
  "& .MuiDataGrid-cell": {
    padding: "5px 10px",
    color: "white",
    width: "20%",
    cursor: "pointer",
    borderColor:theme.palette.background.default,
    borderWidth:"7px"
  },
  "& .MuiPagination-root": {
    margin: "40px 0",
  },
  "& .MuiDataGrid-row": {
    border: "none",
  },
  ".MuiDataGrid-columnSeparator": {
    display: "none",
  },
  "& .MuiDataGrid-sortIcon": {
    opacity: "inherit !important",
  },

  "& .MuiIconButton-root": {
    color: theme.palette.text.secondary,
  },
  "& .MuiList-root": {
    backgroundColor: "red",
  },
  "& .MuiList-root .MuiSvgIcon-root": {
    color: "text.primary",
  },

  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.background.paper,
  },
  [`& .${gridClasses.row}.odd`]: {
    backgroundColor: theme.palette.background.default,
  },
}));


interface IProps{
  rows:Array<Movie>|undefined,
  loading:boolean
}
export default function MovieListTable({ rows, loading }:IProps) {
  const fav = useSelector((state: AppState) => state.userSlice.favorite);
  const watchlist = useSelector(
    (state: AppState) => state.userSlice.watchlistState
  );
  const dispatch = useDispatch();
const [movie,setMovie]=React.useState<Movie|null>(null)
  const navigate = useNavigate();
  
  // const { mutate: addToWatch, isLoading: isAdding } = useApiSend(
  //   (params) => addToWatchList(params),
  //   () => {
  //     toast.success("added successfully to watchlist");
  //     navigate("/my-profile#list");
  //   },
  //   (e) => {
  //     toast.error({
  //       type: "error",
  //       text1: `Couldn't add post ${e.message}`,
  //     });
  //   }
  // );
  const handleAddFavoriteSuccess = () => {
    toggleFavorite(fav,movie,dispatch)  
    
  };
  const handleAddWatchListSuccess = () => {
    toggleWatchList(watchlist,movie,dispatch)
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
  const handleAddToFvorite = (params:ToggleParams,row:GridRowParams) => {
    console.log(row,"row")
    setMovie(row.row)
    mutate(params);
  };
  const handleAddToWatchList = (params:ToggleParams,row:GridRowParams) => {
    setMovie(row.row)
    addToWatch(params);
  };
  const handleRowClick = (params:GridRowParams) => {
    // console.log("row",params)
    navigate(`/movie/${params.id}`);
  };
  const columns:GridColDef[] = [
    { field: "id", headerName: "ID",
    //  flex: 1
    width:190
     },
    {
      field: "title",
      headerName: "Title",
      // flex: 1,
      width:190
    },
    {
      field: "vote_average",
      headerName: "vote average",

      // flex: 1.5,
      width:290,
      renderCell: (params) => {
        return (
          <>
            <Rating
              max={10}
              sx={{
                "& .MuiRating-icon": {
                  color: "text.primary",
                },
              }}
              name="hover-feedback"
              value={params.value}
              readOnly
            />

            {/* {params.value} */}
          </>
        );
      },
    },
    {
      field: "poster_path",

      headerName: "Image",

      // flex: 1,
      width:190,
      renderCell: (params) => (
        <img
          src={`${movieConfig.imgUrl}/${params.value}`}
          style={{
            width: "50%",
            height: "100%",
          }}
        />
      ),
    },

    {
      field: "release_date",
      headerName: "Release Date",
      // flex: 1,
      width:190
    },
    {
      field: "actions",
      type: "actions",
      width: 80,
      getActions: (params:GridRowParams) => [
        <GridActionsCellItem
          icon={fav?.findIndex((mov) => mov.id == params.id) > -1 ?<FavoriteIcon/>:<FavoriteBorderIcon />}
          label={fav?.findIndex((mov) => mov.id == params.id) > -1?"remove From Favorite":"Add To Favorite"}
          onClick={() =>
            handleAddToFvorite({
              media_type: "movie",
              media_id: params.id,
              favorite: fav?.findIndex((mov) => mov.id == params.id) > -1 ?false:true,
              
            },params)
          }
          showInMenu
        />,
        <GridActionsCellItem
          icon={watchlist?.findIndex((mov) => mov.id == params.id) > -1 ?<CreateNewFolderIcon />:<CreateNewFolderOutlinedIcon />}
          label={watchlist?.findIndex((mov) => mov.id == params.id) > -1?"remove From WatchList":"Add To WatchList"}
          onClick={() =>
            handleAddToWatchList({
              media_type: "movie",
              watchlist: watchlist?.findIndex((mov) => mov.id == params.id) > -1 ?false:true,

              media_id: params.id,
            },params)
          }
          showInMenu
        />,
      ],
    },
  ];

  return (
    <div 
    // style={{ width: "100%"}}
    >
      <StripedDataGrid
        rowHeight={130}
        loading={loading}
        rows={rows || []}
        columns={columns}
        disableColumnFilter
        onRowClick={(params) => handleRowClick(params)}
      />
    </div>
  );
}
