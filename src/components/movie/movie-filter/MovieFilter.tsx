import { TabList } from "@mui/lab";
import {
  Autocomplete,
  Box,
  CircularProgress,
  Paper,
  Tab,
  TextField,
} from "@mui/material";
import { Country, Genre, Language, ReturnedGenres } from "src/types/movie";

interface IProps {
  genres: ReturnedGenres | undefined;
  languages: Array<Language>|undefined;
  countries: Array<Country>|undefined;
  loading_countries: boolean;
  loading_genres: boolean;
  loading_languages: boolean;
  handleChangeCountry: (value: Country|null) => void;
  handleChangeGenres: (value: Array<Genre>) => void;
  handleChangeLanguage: (value: Language |null) => void;
  handleChangeDisplayMode: (value: "grid" | "table") => void;
}
const MovieFilter = ({
  genres,
  countries,
  languages,
  loading_countries,
  loading_genres,
  loading_languages,
  handleChangeCountry,
  handleChangeGenres,
  handleChangeLanguage,
  handleChangeDisplayMode,
}: IProps) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row",
          },

          justifyContent: "flex-start",
          alignItems: "flex-start",
          backgroundColor: "#151f30",
          padding: {
            xs: "10px 20px 20px",
            md: "20px 30px;",
          },
          borderRadius: "16px",
        }}
      >
        <Box
          sx={{
            marginBottom: {
              xs: "24px",
              md: "0px",
            },
            width: "100%",
            display: "flex",
            flexDirection: {
              xs: "column",
              md: "row",
            },
            justifyContent: "flexStart",
            alignItems: "center",
          }}
        >
          <Autocomplete
            PaperComponent={({ children }) => (
              <Paper style={{ background: "#151f30" }}>{children}</Paper>
            )}
            onChange={(event, value: Array<Genre>) => handleChangeGenres(value)}
            multiple
            limitTags={1}
            sx={{
              width: {
                xs:"100%",
                md:"35%"
              },
              marginRight: "24px",
              marginTop: {
                xs:"24px",
                md:0
              },
              "& .MuiInputBase-root": {
                borderBottom: "none !important",
                color: "white",
                backgroundColor: "background.paper",
              },
              "& .MuiInputBase-root::after": {
                borderBottom: "none !important",
                color: "white",
              },
              "& .MuiInputBase-root::before": {
                //   borderBottom: "none !important",
                borderBottomColor: "white !important",
                color: "white",
              },
              "& .MuiInputBase-input": {
                color: "white",
              },
              "& .MuiButtonBase-root": {
                color: "white",
              },
              "& .MuiChip-deleteIcon": {
                color: "text.primary",
              },
              "& .MuiChip-label": {
                paddingLeft: "0 !important",
              },
            }}
            id="tags-standard"
            options={genres?.genres || []}
            loading={loading_genres}
            getOptionLabel={(option: Genre) => option?.name}
            renderInput={(params) => (
              <TextField
                {...params}
                label="All genres"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading_genres ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />
          <Autocomplete
            PaperComponent={({ children }) => (
              <Paper style={{ background: "#151f30" }}>{children}</Paper>
            )}
            sx={{
              width: {
                xs:"100%",
                md:"35%"
              },
              marginRight: "24px",
              marginTop: {
                xs:"24px",
                md:0
              },
              "& .MuiInputBase-root": {
                borderBottom: "none !important",
                color: "white",
                backgroundColor: "background.paper",
              },
              "& .MuiInputBase-root::after": {
                borderBottom: "none !important",
                color: "white",
              },
              "& .MuiInputBase-root::before": {
                //   borderBottom: "none !important",
                borderBottomColor: "white !important",
                color: "white",
              },
              "& .MuiInputBase-input": {
                color: "white",
              },
              "& .MuiButtonBase-root": {
                color: "white",
              },
              "& .MuiChip-deleteIcon": {
                color: "text.primary",
              },
              "& .MuiChip-label": {
                paddingLeft: "0 !important",
              },
            }}
            onChange={(event, value: Language|null) =>
              handleChangeLanguage(value)
            }
            limitTags={1}
            id="tags-standardd"
            options={languages || []}
            loading={loading_languages}
            getOptionLabel={(option:Language) => option.english_name}
            renderInput={(params) => (
              <TextField
                {...params}
                label="All Languages"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading_languages ? (
                        <CircularProgress color="primary" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />

          <Autocomplete
            PaperComponent={({ children }) => (
              <Paper style={{ background: "#151f30" }}>{children}</Paper>
            )}
            sx={{
              width: {
                xs:"100%",
                md:"35%"
              },
              marginRight: "24px",
              marginTop: {
                xs:"24px",
                md:0
              },
              "& .MuiInputBase-root": {
                borderBottom: "none !important",
                color: "white",
                backgroundColor: "background.paper",
              },
              "& .MuiInputBase-root::after": {
                borderBottom: "none !important",
                color: "white",
              },
              "& .MuiInputBase-root::before": {
                //   borderBottom: "none !important",
                borderBottomColor: "white !important",
                color: "white",
              },
              "& .MuiInputBase-input": {
                color: "white",
              },
              "& .MuiButtonBase-root": {
                color: "white",
              },
              "& .MuiChip-deleteIcon": {
                color: "text.primary",
              },
              "& .MuiChip-label": {
                paddingLeft: "0 !important",
              },
            }}
            onChange={(event, value: Country|null) =>
              handleChangeCountry(value)
            }
            id="country-select-demo"
            options={countries || []}
            loading={loading_countries}
            autoHighlight
            getOptionLabel={(option: Country) => option.english_name}
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                {...props}
              >
                <img
                  loading="lazy"
                  width="20"
                  srcSet={`https://flagcdn.com/w40/${option.iso_3166_1.toLowerCase()}.png 2x`}
                  src={`https://flagcdn.com/w20/${option.iso_3166_1.toLowerCase()}.png`}
                  alt=""
                />
                {option.english_name} ({option.iso_3166_1})
                {/* +{option.phone} */}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Choose a country"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password",
                  // disable autocomplete and autofill
                  endAdornment: (
                    <>
                      {loading_countries ? (
                        <CircularProgress color="primary" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />
        </Box>
        <TabList
          onChange={(event, value) => handleChangeDisplayMode(value)}
          aria-label="lab API tabs example"
        >
          <Tab label="Grid" value="grid" />
          <Tab label="Table" value="table" />
        </TabList>
      </Box>
    </>
  );
};

export default MovieFilter;
