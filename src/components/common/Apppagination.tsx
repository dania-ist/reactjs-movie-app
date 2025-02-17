import { Pagination } from "@mui/material";

interface IProps{
  count:number,
  page:number,
  handleChange:(event: React.ChangeEvent<unknown>,value:number)=>void
}
const AppPagination = ({ count,handleChange,page }:IProps) => {
  return (
    <>
      <Pagination sx={{ "& .MuiPaginationItem-root":{
        minWidth:'42px',
        minHeight:'42px',
        fontSize: {
          md:'24px',
          xs:"18px"
        }

      }}} page={page} count={count} variant="outlined" shape="rounded" color="primary" onChange={handleChange} />
    </>
  );
};
export default AppPagination;
