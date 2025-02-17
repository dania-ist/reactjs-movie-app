import { Box, Container, Button } from "@mui/material";
import logo from "../../../assets/logo.svg";
import { CustomInput, LoginCard, LoginContent, LoginWrapper } from "./style";
import { useAuth } from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";

const Login = () => {
  const auth = useAuth();
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {},
  });
  const { errors } = formState;

  function onSubmit() {
    auth?.login();
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <LoginWrapper>
          <Container sx={{ height: "100vh", alignContent: "center" }}>
            <LoginContent>
              <LoginCard>
                <Box>
                  <img src={logo} style={{ marginBottom: "24px" }} />
                </Box>

                {/* <CustomInput
                  defaultValue="Email"
                  id="email"
                  {...register("email", {
                    required: "This field is required",
                  })}
                  error={!!errors?.email}
                  helperText={errors?.email?.message}
                />
                <CustomInput
                  defaultValue="Password"
                  id="password"
                  {...register("password", {
                    required: "This field is required",
                  })}
                  error={!!errors?.password}
                  helperText={errors?.password?.message}
                /> */}

                <Box sx={{ width: "100%" }}>
                  <Button
                    type="submit"
                    sx={{
                      width: "100%",
                      borderRadius: "16px",
                    }}
                    variant="contained"
                  >
                    Get Started
                  </Button>
                </Box>
              </LoginCard>
            </LoginContent>
          </Container>
        </LoginWrapper>
      </form>
    </>
  );
};

export default Login;
