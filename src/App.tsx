import {
  BrowserRouter,
  Route,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Login from "./pages/auth/login";
import { theme } from "./theme";
import { Palette, ThemeProvider } from "@mui/material";
import UserProfile from "./pages/user/profile";
import MovieList from "./pages/movie/list/list";
import { AuthProvider } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MovieDetais from "./pages/movie/movie-details";
import { Toaster } from "react-hot-toast";
import AppLayout from "./components/common/AppLayout";
import { Provider } from "react-redux";
import { store } from "./store";


function App() {
  const queryClient = new QueryClient();
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<AuthProvider />}>
        <Route index path="/" element={<MovieList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/movie/:movieId" element={<MovieDetais />} />
      </Route>
    )
  );

  return (
    <>
      <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Routes>
             <Route element={<AuthProvider/>}> <Route
                path="/login"
                element={<Login />}
              />
              <Route element={<AppLayout />}>
                <Route
                  index
                  path="/"
                  element={<MovieList />}
                />
               

                <Route
                  path="/my-profile"
                  element={<UserProfile />}
                />
                <Route
                  path="/movie/:movieId"
                  element={ <MovieDetais />}
                />
              </Route></Route>
            </Routes>
          </BrowserRouter>
          <Toaster
            position="top-right"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              success: {
                duration: 3000,
              },
              error: {
                duration: 5000,
              },
              style: {
                fontSize: "16px",
                maxWidth: "500px",
                padding: "16px 24px",
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.secondary,
              },
              iconTheme: {
                primary: theme.palette.background.default,
                secondary: theme.palette.text.primary,
              },
            }}
          />

        </ThemeProvider>
        </Provider>
      </QueryClientProvider>
    </>
  );
}

export default App;
