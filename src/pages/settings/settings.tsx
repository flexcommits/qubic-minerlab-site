import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Container,
  CardActions,
} from "@mui/material";
import {
  BaseRecord,
  HttpError,
  IResourceComponentsProps,
  UpdatePasswordFormTypes,
  useActiveAuthProvider,
  useGetIdentity,
  useNotification,
  useResource,
  useTranslate,
  useUpdate,
  useUpdatePassword,
  useUserFriendlyName,
} from "@refinedev/core";
import { RefinePageHeaderClassNames } from "@refinedev/ui-types";
import { Edit } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import customThemes from "../../theme";
import { useEffect, useState } from "react";
import GlobalButton from "../../components/custom/Button";

const text = {
  setting_t1: "General settings",
  setting_t2: "Change Password",
};

export interface UpdateProfileFormTypes {
  email2?: string;
  discord?: string;
}

export interface CustomUpdatePasswordFormTypes extends UpdatePasswordFormTypes {
  redirectTo: string;
}

export const Settings: React.FC<IResourceComponentsProps> = (props) => {
  const translate = useTranslate();
  const { data: identity }: any = useGetIdentity();
  const { open } = useNotification();
  const getUserFriendlyName = useUserFriendlyName();
  const { mutate } = useUpdate();
  const {
    resource,
    action,
    id: idFromParams,
    identifier,
  } = useResource("profile");
  const [profileFormIsLoading, setProfileFormIsLoading] = useState(false);
  const updatePassowrdForm = useForm<
    BaseRecord,
    HttpError,
    CustomUpdatePasswordFormTypes
  >({});
  const authProvider = useActiveAuthProvider();
  const { mutate: update, isLoading } =
    useUpdatePassword<CustomUpdatePasswordFormTypes>({
      v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
    });

  const profileForm = useForm<BaseRecord, HttpError, UpdateProfileFormTypes>(
    {}
  );

  useEffect(() => {
    if (identity) {
      profileForm.setValue("email2", identity.email2);
      profileForm.setValue("discord", identity.discord || "");
    }
  }, [identity]);

  const handleProfileFormSubmit = (e: any) => {
    // console.log("profileForm", profileForm.getValues());
    mutate({
      resource: "userprofiles",
      values: profileForm.getValues(),
      id: identity.minerId,
      meta: {
        idColumnName: "minerId",
      },
      successNotification: (data, values, resource) => {
        return {
          message: `User profile update Successfully.`,
          type: "success",
        };
      },
      errorNotification(error, values, resource) {
        return {
          message: `User profile update failed.`,
          type: "error",
        };
      },
    });
  };

  const updatePasswordContent = (
    <Box
      component="form"
      onSubmit={updatePassowrdForm.handleSubmit((data) => {
        return update({ password: data.password, redirectTo: "/settings" });
      })}
    >
      <TextField
        {...updatePassowrdForm.register("password", {
          required: true,
        })}
        id="password"
        margin="normal"
        fullWidth
        name="password"
        label={translate(
          "pages.updatePassword.fields.password",
          "New Password"
        )}
        helperText={updatePassowrdForm.formState.errors?.password?.message}
        error={!!updatePassowrdForm.formState.errors?.password}
        type="password"
        placeholder="●●●●●●●●"
        autoComplete="current-password"
        sx={{
          m: 0,
        }}
        InputLabelProps={{ shrink: true }}
      />

      <TextField
        {...updatePassowrdForm.register("confirmPassword", {
          required: true,
          validate: (value?: string) => {
            if (updatePassowrdForm.watch("password") !== value) {
              return translate(
                "pages.updatePassword.errors.confirmPasswordNotMatch",
                "Passwords do not match"
              );
            }
            return true;
          },
        })}
        id="confirmPassword"
        margin="normal"
        fullWidth
        name="confirmPassword"
        label={translate(
          "pages.updatePassword.fields.confirmPassword",
          "Confirm New Password"
        )}
        helperText={
          updatePassowrdForm.formState.errors?.confirmPassword?.message
        }
        error={!!updatePassowrdForm.formState.errors?.confirmPassword}
        type="password"
        placeholder="●●●●●●●●"
        autoComplete="current-confirm-password"
        sx={{
          mb: 0,
        }}
        InputLabelProps={{ shrink: true }}
      />

      <Box
        sx={{
          marginTop: "16px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        {/* <Button type="submit" variant="contained" disabled={isLoading}>
          {translate("pages.updatePassword.buttons.submit", "Update")}
        </Button> */}

        <GlobalButton text="Update" type="submit" disabled={isLoading} />
      </Box>
    </Box>
  );

  return (
    <Container maxWidth="xl">
      <h1 className="text-lg primary font-semibold my-2">{translate(
        `${identifier}.titles.edit`,
        `${getUserFriendlyName(
          resource?.meta?.label ??
          resource?.options?.label ??
          resource?.label ??
          identifier,
          "singular"
        )}`, 'Settings'
      )}</h1>
      <div className="">
        {/* <Edit
          saveButtonProps={{
            disabled: profileForm.saveButtonProps.disabled,
            onClick: (e) => {
              profileForm.handleSubmit(handleProfileFormSubmit)(e);
            },
          }}
          goBack={<></>}
          headerButtons={<></>}
          breadcrumb={<></>}
          footerButtonProps={{
            sx: {
              justifyContent: "flex-end",
              paddingTop: "0px !important",
              paddingBottom: "16px !important",
              paddingRight: "16px !important",
              paddingLeft: "16px !important"
            },
          }}
          title={
            <Typography
              variant="fontL"
              className={RefinePageHeaderClassNames.Title}
            >
              {translate(
                `${identifier}.titles.edit`,
                `${getUserFriendlyName(
                  resource?.meta?.label ??
                  resource?.options?.label ??
                  resource?.label ??
                  identifier,
                  "singular"
                )}`, 'Settings'
              )}
            </Typography>
          }
        >
          
        </Edit> */}

        <Box
          sx={{ display: "flex", flexDirection: "column" }}
        // autoComplete="off"
        >
          <Card>
            <CardContent>
              <Grid container spacing={1} sx={customThemes.mt0}>
                <Grid item xs={12} sm={4}>
                  <Typography variant="fontM" className="primary" component="p">
                    {/* {translate("profile.titles.edit")} */}
                    {text.setting_t1}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Box>
                    {/* <Typography
                    variant="fontL"
                    component="p"
                    sx={customThemes.mb1em}
                  >
                    {translate("Email")}
                  </Typography> */}
                    <TextField
                      {...profileForm.register("email2")}
                      id="email2"
                      type="email"
                      margin="normal"
                      fullWidth
                      name="email2"
                      label={translate("profile.fields.email2", "Email")}
                      error={!!profileForm.formState.errors.email2}
                      placeholder="Email"
                      sx={{
                        m: 0,
                        ...customThemes.mb1em,
                      }}
                      InputLabelProps={{ shrink: true }}
                    />
                    {/* <Typography
                    variant="fontL"
                    component="p"
                    sx={customThemes.mb1em}
                  >
                    {translate("Discord Name")}
                  </Typography> */}
                    <TextField
                      {...profileForm.register("discord")}
                      // id="discord"
                      margin="normal"
                      fullWidth
                      name="discord"
                      label={translate(
                        "profile.fields.discord",
                        "Discord Name"
                      )}
                      error={!!profileForm.formState.errors.discord}
                      InputLabelProps={{ shrink: true }}
                      placeholder="Discord Name"
                      type="text"
                      sx={{
                        m: 0,
                        marginTop: "16px",
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions className="flex items-center justify-end px-10">
              <GlobalButton
                text="Save"
                disabled={profileForm.saveButtonProps.disabled}
                onClick={(e) => {
                  profileForm.handleSubmit(handleProfileFormSubmit)(e);
                }}
              />
            </CardActions>
          </Card>
        </Box>


        <Card sx={customThemes.cardStyle}>
          <CardContent>
            <Box>
              <Card>
                <CardContent>
                  <Grid container spacing={1} sx={customThemes.mt0}>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="fontM" className="primary" component="p">
                        {/* {translate("profile.titles.edit")} */}
                        {text.setting_t2}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      {updatePasswordContent}
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
};
