import {
  Box,
  Button,
  Card,
  CardContent,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import {
  IResourceComponentsProps,
  useGetIdentity,
  useNotification,
  useOne,
  useSelect,
  useResource,
  useTranslate,
  useUpdate,
  useUserFriendlyName,
} from "@refinedev/core";

import { RefinePageHeaderClassNames } from "@refinedev/ui-types";
import { Edit } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { useEffect } from "react";
import { Controller, FieldValues } from "react-hook-form";
import customThemes from "../../theme";
import { getUserName } from "../../helper/help";


// {(identity?.username) ? identity?.username.toUpperCase() : userName}

const text = {
  profile_t1: <Typography variant="blueText" >Calculating the current Epoch probability.</Typography>,
  profile_t1_1: "Qubic wallet address for receiving $Qubic reward",

};

//1.06 and 13000000 

export const Calculator: React.FC<IResourceComponentsProps> = () => {
  
  const userName = getUserName();
  
  const { data: identity }: any = useGetIdentity();
  
  const { data: siteSetting } = useOne({
    resource: "siteSetting",
    id: 1,
  });
  
  const { data: epochScoreRecords } = useOne({
    resource: "epochScoreRecords",
    
  });

console.log("epochScoreRecords", epochScoreRecords);

  const { open } = useNotification();
  
  const translate = useTranslate();
  
  const getUserFriendlyName = useUserFriendlyName();
  
  const {
    resource,
    action,
    id: idFromParams,
    identifier,
  } = useResource("profile");

  const form = useForm();
  const { mutate } = useUpdate();

  // useEffect(() => {
  //   if (identity) {
  //     form.setValue("wallet_address", identity.wallet_address);
  //     form.setValue("idType", identity.idType);
  //   }
  // }, [identity]);

  const formHandleSubmit = (data: FieldValues) => {

    // debug data
    console.log("formHandleSubmit", data);
    // console.log("formHandleSubmit", data);
    // mutate({
    //   resource: "userprofiles",
    //   values: data,
    //   id: identity.minerId,
    //   meta: {
    //     idColumnName: "minerId",
    //   },
    // });
  };

  const copyToClipboard = (copyText: string, message?: string) => {
    navigator.clipboard.writeText(copyText);
    open?.({
      type: "success",
      message: message ?? "Copied to Clipboard",
      description: "",
      key: "unique-id",
    });
  };

  return (
    <>
      <Edit
        saveButtonProps={{
          disabled: form.saveButtonProps.disabled,
          onClick: (e) => {
            form.handleSubmit(formHandleSubmit)(e);
          },
        }}
        footerButtonProps={{ sx: { justifyContent: "flex-start" } }}
        goBack={<></>}
        headerButtons={<></>}
        title={
          <Typography
            variant="fontL"
            className={RefinePageHeaderClassNames.Title}
          >
            {translate(
              `${identifier}.titles.edit`,
              `Edit ${getUserFriendlyName(
                resource?.meta?.label ??
                  resource?.options?.label ??
                  resource?.label ??
                  identifier,
                "singular"
              )}`
            )}
          </Typography>
        }
      >
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column" }}
          autoComplete="off"
        >
          <Card>
            <CardContent sx={{ "background-color": "#272727" }}>
              <Typography gutterBottom variant="fontL">
                {text.profile_t1}
                {/* <Typography component={"span"} variant={"fontL"} sx={customThemes.blueText}></Typography> */}
              </Typography>
              <Typography gutterBottom variant={"fontM"} component={"p"}>
                {text.profile_t1_1}
              </Typography>
              <TextField
                {...form.register("Solution", {
                  required: "This field is required",
                })}
                error={!!(form.formState.errors as any)?.wallet_address}
                helperText={
                  (form.formState.errors as any)?.wallet_address?.message
                }
                margin="normal"
                fullWidth
                InputLabelProps={{ shrink: true }}
                type="Solution"
                label={"Solution"}
                name="Solution"
              />
            </CardContent>
          </Card>

        </Box>
      </Edit>
    </>
  );
};
