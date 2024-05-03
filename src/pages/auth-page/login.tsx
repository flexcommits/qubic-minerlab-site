import * as React from "react";
import {
  LoginPageProps,
  LoginFormTypes,
  useActiveAuthProvider,
} from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { FormProvider } from "react-hook-form";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";
import MuiLink from "@mui/material/Link";
import Stack from "@mui/material/Stack";

import type { BoxProps } from "@mui/material/Box";
import type { CardContentProps } from "@mui/material/CardContent";

import {
  BaseRecord,
  HttpError,
  useLogin,
  useTranslate,
  useRouterContext,
  useRouterType,
  useLink,
} from "@refinedev/core";
import {
  layoutStyles,
  titleStyles,
} from "@refinedev/mui/src/components/pages/auth/components/styles";
import { FormPropsType } from "../../components/custom/auth-page";
import { ThemedTitleV2 } from "../../components/custom/theme-title-v2";
import { Grid } from "@mui/material";
import customThemes from "../../theme";

type LoginProps = LoginPageProps<BoxProps, CardContentProps, FormPropsType>;

/**
 * login will be used as the default type of the <AuthPage> component. The login page will be used to log in to the system.
 * @see {@link https://refine.dev/docs/api-reference/mui/components/mui-auth-page/#login} for more details.
 */
export const LoginPage: React.FC<LoginProps> = ({
  providers,
  registerLink,
  forgotPasswordLink,
  rememberMe,
  contentProps,
  wrapperProps,
  renderContent,
  formProps,
  title,
  hideForm,
}) => {
  const rememberMeUsername = localStorage.getItem("username");

  if (rememberMeUsername) {
    formProps = {
      ...formProps,
      defaultValues: {
        email: rememberMeUsername,
      },
    };
  }

  const { onSubmit, ...useFormProps } = formProps || {};
  const methods = useForm<BaseRecord, HttpError, LoginFormTypes>({
    ...useFormProps,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const authProvider = useActiveAuthProvider();
  const { mutate: login, isLoading } = useLogin<LoginFormTypes>({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });
  // const theme = useTheme();
  const translate = useTranslate();
  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();

  const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

  const PageTitle =
    title === false ? null : (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "32px",
          fontSize: "20px",
        }}
      >
        {title ?? (
          // <ThemedTitleV2
          //   collapsed={false}
          //   wrapperStyles={{
          //     gap: "8px",
          //   }}
          // />
          <></>
        )}
      </div>
    );

  const renderProviders = () => {
    if (providers && providers.length > 0) {
      return (
        <>
          <Stack spacing={1}>
            {providers.map((provider: any) => {
              return (
                <Button
                  key={provider.name}
                  variant="outlined"
                  fullWidth
                  sx={{
                    color: "primary.light",
                    borderColor: "primary.light",
                    textTransform: "none",
                  }}
                  onClick={() => login({ providerName: provider.name })}
                  startIcon={provider.icon}
                  className="bg-primary"
                >
                  {provider.label}
                  
                </Button>
              );
            })}
          </Stack>
          {!hideForm && (
            <Divider
              sx={{
                fontSize: "12px",
                marginY: "16px",
              }}
            >
              {translate("pages.login.divider", "or")}
            </Divider>
          )}
        </>
      );
    }
    return null;
  };

  const Content = (
    <Card {...(contentProps ?? {})}>
      <CardContent sx={{ p: "32px", "&:last-child": { pb: "32px" } }}>
        <Typography
          component="h1"
          variant="h5"
          align="center"
          style={titleStyles}
          color="primary"
          fontWeight={700}
          className="primary"
        >
          {translate("pages.login.title", "Sign in to your account")}
        </Typography>
        {renderProviders()}
        {!hideForm && (
          <Box
            component="form"
            onSubmit={handleSubmit((data) => {
              if (onSubmit) {
                return onSubmit(data);
              }

              return login(data);
            })}
          >
            <TextField
              {...register("email", {
                required: true,
              })}
              // focused
              id="email"
              margin="normal"
              fullWidth
              label={translate("pages.login.fields.email", "Username")}
              error={!!errors.email}
              name="email"
              type="text"
              autoComplete="email"
              sx={{
                mt: 0,
              }}
            />
            <TextField
              {...register("password", {
                required: true,
              })}
              id="password"
              margin="normal"
              fullWidth
              name="password"
              label={translate("pages.login.fields.password", "Password")}
              helperText={errors?.password?.message}
              error={!!errors.password}
              type="password"
              placeholder="●●●●●●●●"
              autoComplete="current-password"
              sx={{
                mb: 0,
              }}
            />
            <Box
              component="div"
              sx={{
                mt: "24px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {rememberMe ?? (
                <FormControlLabel
                  sx={{
                    span: {
                      fontSize: "14px",
                      color: "text.secondary",
                    },
                  }}
                  color="secondary"
                  control={
                    <Checkbox
                      size="small"
                      id="remember"
                      {...register("remember")}
                    />
                  }
                  label={translate(
                    "pages.login.buttons.rememberMe",
                    "Remember me"
                  )}
                />
              )}
              {forgotPasswordLink ?? (
                <MuiLink
                  variant="body2"
                  color="primary"
                  fontSize="12px"
                  component={ActiveLink}
                  underline="none"
                  to="/forgot-password"
                  className="primary"
                >
                  {translate(
                    "pages.login.buttons.forgotPassword",
                    "Forgot password?"
                  )}
                </MuiLink>
              )}
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              sx={{ mt: "24px" }}
              className="bg-primary"
            >
              {translate("pages.login.signin", "Sign in")}
            </Button>
          </Box>
        )}
        {registerLink ?? (
          <Box
            sx={{
              mt: "24px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              textAlign="center"
              variant="body2"
              component="span"
              fontSize="12px"
            >
              {translate(
                "pages.login.buttons.noAccount",
                "Don’t have an account?"
              )}
            </Typography>
            <MuiLink
              ml="4px"
              fontSize="12px"
              variant="body2"
              color="primary"
              component={ActiveLink}
              underline="none"
              to="/register"
              fontWeight="bold"
              className="primary"
            >
              {translate("pages.login.signup", "Sign up")}
            </MuiLink>
          </Box>
        )}
      </CardContent>
    </Card>
  );

  return (
    <FormProvider {...methods}>
      <Box component="div" style={layoutStyles} {...(wrapperProps ?? {})}>
        <Container
          component="main"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: hideForm ? "flex-start" : "center",
            alignItems: "center",
            minHeight: "100dvh",
            padding: "16px",
            width: "100%",
            // maxWidth: "400px"
          }}
        >
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              md={6}
             
              className="flex items-center justify-center"
            >
              <a href="/">
                <img
                  src="/assets/logo_only.png"
                  alt="logo"
                  className="h-[100%] w-[350px] lg:mx-10 object-contain"

                />
              </a>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              sx={(theme) => ({
                [theme.breakpoints.down("sm")]: {
                  display: "flex",
                  justifyContent: "center",
                },
                [theme.breakpoints.down("md")]: {
                  display: "flex",
                  justifyContent: "center",
                },
              })}
            >
              <Box
                sx={{
                  width: "100%",
                  maxWidth: "400px",
                  display: "flex",
                  flexDirection: "column",
                  paddingTop: hideForm ? "15dvh" : 0,
                }}
              >
                {renderContent ? (
                  renderContent(Content, PageTitle)
                ) : (
                  <>
                    {PageTitle}
                    {Content}
                  </>
                )}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </FormProvider>
  );
};
