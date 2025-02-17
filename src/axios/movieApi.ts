import itemConfig from "../configs/movie";
import authConfig from "../configs/auth";
import instance from ".";
import {  Movie, MovieFilter} from "../types/movie";
import { AppDispatch } from "../store";
import { addToUserFavorite, addToUserWatchList, removeFromUserFavorite, removeFromUserWatchList } from "../store/slices/userSlice";
import toast from "react-hot-toast";

export const toggleFavorite = (fav:Array<Movie>,item:Movie|null ,dispatch:AppDispatch) => {
  if(fav?.findIndex(mov=>mov.id ==item?.id) > -1){
    item && dispatch(removeFromUserFavorite(item))
    toast.success("removed successfully from favorite")
  }
  else{
    item && dispatch(addToUserFavorite(item))
    toast.success("added successfully to favorite");
  }
  };
  export const toggleWatchList = (watchlist:Array<Movie>,item:Movie|null ,dispatch:AppDispatch) => {
    if((watchlist.findIndex(mov=>mov.id == item?.id) > -1)){
      item && dispatch(removeFromUserWatchList(item))
      toast.success("removed successfully from watchlist")
    }
    else{
      item && dispatch(addToUserWatchList(item))
      toast.success("added successfully to watchlist");
    }
    };
