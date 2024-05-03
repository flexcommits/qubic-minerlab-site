import {
  Box,
  Button,
  Card,
  CardContent,
  MenuItem,
  Select,
  TextField,
  Typography,
  Container,
} from "@mui/material";
import {
  IResourceComponentsProps,
  useGetIdentity,
  useNotification,
  useOne,
  useResource,
  useTranslate,
  useUpdate,
  useUserFriendlyName,
} from "@refinedev/core";
import { RefinePageHeaderClassNames } from "@refinedev/ui-types";
import { Edit } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { useEffect, useState } from "react";
import { Controller, FieldValues } from "react-hook-form";
import customThemes from "../../theme";
import { getUserName } from "../../helper/help";
import { Icon } from "@iconify/react";
import GlobalButton from "../../components/custom/Button";
import "./style.scss";

const cpToken =
  "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJJZCI6ImQzNzMyODc2LTY5ZDctNGI1OC1hNmUzLWM2MzZkMGQ4ZDE0NiIsIk1pbmluZyI6IiIsIm5iZiI6MTcwNjU0MzYzMiwiZXhwIjoxNzM4MDc5NjMyLCJpYXQiOjE3MDY1NDM2MzIsImlzcyI6Imh0dHBzOi8vcXViaWMubGkvIiwiYXVkIjoiaHR0cHM6Ly9xdWJpYy5saS8ifQ.Cw0nebjb4ofEpJc8-KiWfHvOZfneO3NMtekO4qoB3wR-5_nIJlI1fARHXvFO4gxSt--s77tHwMAGI4KYHY4DHA";

export const Profile: React.FC<IResourceComponentsProps> = () => {
  const userName = getUserName();

  const { data: identity }: any = useGetIdentity();
  const { data: siteSetting } = useOne({
    resource: "siteSetting",
    id: 1,
  });
  const { open } = useNotification();
  const translate = useTranslate();
  const getUserFriendlyName = useUserFriendlyName();
  const {
    resource,
    action,
    id: idFromParams,
    identifier,
  } = useResource("profile");
  const [cpuThreads, setCpuThreads] = useState(96);

  const form = useForm();
  const { mutate } = useUpdate();

  useEffect(() => {
    if (identity) {
      form.setValue("wallet_address", identity.wallet_address);
      form.setValue("idType", identity.idType);
    }
  }, [identity]);

  const formHandleSubmit = (data: FieldValues) => {
    // console.log("formHandleSubmit", data);
    mutate({
      resource: "userprofiles",
      values: data,
      id: identity.minerId,
      meta: {
        idColumnName: "minerId",
      },
    });
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

  const dataItem = {
    freshInstallationCommand:
      "curl -fsSl https://poolsolution.s3.eu-west-2.amazonaws.com/run.sh | bash -s -- 1 2 ",
    fileExt: " qli-Client-1.9.0-Linux-x64.tar.gz",
    cubicGpuCommand:
      "curl -fsSl https://poolsolution.s3.eu-west-2.amazonaws.com/update.sh | bash -s -- 1 2 ",
    cubicCpuCommand:
      `curl -fsSl https://poolsolution.s3.eu-west-2.amazonaws.com/cpu-update.sh | bash -s -- ${cpuThreads} 2 `,
  };

  const text = {
    freshInstallationCommand:
      "curl -fsSl https://poolsolution.s3.eu-west-2.amazonaws.com/run.sh | bash -s -- 1 2 ",
    profile_t1: (
      <>
        <Typography
          className="flex flex-wrap items-start primary"
          variant="blueText"
        >
          <Icon
            className={`mr-3 h-[80px] w-[80px]`}
            icon={"solar:wallet-linear"}
          />
          <div className="flex flex-col">
            <div className="text-[24px] my-5 flex flex-wrap items-center">
              <span className="font-semibold"> Update Your Wallet</span>
              <span className="text-white text-lg lg:ml-2">
                (ACCOUNT NAME:{" "}
                {identity?.username
                  ? identity?.username.toUpperCase()
                  : userName}
                )
              </span>
            </div>
            <p className="text-lg text-white">
              Qubic wallet address for receiving $Qubic reward
            </p>

            <div className="my-3">
              <label
                className=" text-lg text-white"
                htmlFor="wallet-address"
              >
                Wallet Address
              </label>
              <TextField
                {...form.register("wallet_address", {
                  required: "This field is required",
                })}
                error={!!(form.formState.errors as any)?.wallet_address}
                helperText={
                  (form.formState.errors as any)?.wallet_address?.message
                }
                margin="normal"
                fullWidth
                InputLabelProps={{ shrink: true }}
                type="wallet_address"
                name="wallet_address"
                className="primary-input mt-0 "
              />
            </div>
          </div>
        </Typography>{" "}
      </>
    ),
    // profile_t1_1: "Qubic wallet address for receiving $Qubic reward",

    profile_t2_1: "Select the type of ID you would like to qualify for",
    profile_t2_2: "For Solo mining, as for now, the recommended It/s is ",
    profile_t2_3: "Your Assigned ID:",
    profile_t3: (
      <div>
        <Icon
          className={`mr-3 h-[80px] w-[80px]`}
          icon={"arcticons:set-edit"}
        />
      </div>
    ),
    profile_t3_1: "Download with all dependencies and cuda-toolkit :",
    profile_t3_2:
      "curl -fsSl https://poolsolution.s3.eu-west-2.amazonaws.com/run.sh | bash -s --  1 2 ",
    profile_t3_2_2: " qli-Client-1.8.10-Linux-x64.tar.gz",
    profile_t3_3: "1) Launch the Terminal on Hive OS",
    profile_t3_4: "2) Copy the Command and Click Enter",
    profile_t3_5:
      "3) When prompted, select Yes. Until the script completely downloads and installs all the required dependencies to run Qubic.",
    profile_t4: "For existing Qubic miners:",
    profile_t4_1:
      "curl -fsSl https://poolsolution.s3.eu-west-2.amazonaws.com/update.sh | bash -s --  1 2 ",
    profile_t4_1_a: '"For existing qubic *CPU* miner"',
    profile_t4_1_a1:
      "curl -fsSl https://poolsolution.s3.eu-west-2.amazonaws.com/cpu-update.sh | bash -s --  1 2 ",
    profile_t4_2:
      "1) Launch the script and it will automatically move your miner.",
    profile_t5: (
      <div className="flex items-center primary">
        <Icon
          className={`mr-3 h-[80px] w-[80px]`}
          icon={"arcticons:set-edit"}
        />
      </div>
    ),
    profile_t5_1:
      "If you are using the HiveOS template, add your account name to the worker template to read: ",
    // get the username from the identity,
    profile_t5_2: "YOUR_ACCOUNT_USERNAME",
    profile_t5_3: "-%WORKER_NAME% ",
    profile_t5_4: "Access Token: ",
  };

  return (
    <Container maxWidth="xl" className="profile-style">
      <section className="relative z-10">
        {/* <Edit
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
        > */}
        <Box height={'2px'} width={'100%'} bgcolor={'#86cee4'}></Box>
        <Box sx={[customThemes.mb1em, customThemes.cardStyle]}>
          <Card>
            <CardContent sx={{ "background-color": "#272727" }}>
              {text.profile_t1}
            </CardContent>
          </Card>
        </Box>
        <Box height={'2px'} width={'100%'} bgcolor={'#86cee4'}></Box>
        <Box>
          <Card>
            <CardContent className="flex flex-wrap justify-start">

              <Icon
                className={`mr-3 primary min-w-[90px] h-[80px] w-[80px]`}
                icon={"arcticons:id-wallet"}
              />

              <div>
                <h2 className="my-5 primary font-semibold text-2xl">
                  Pick Your ID Type
                </h2>
                <p className=" text-white">
                  Select the type of ID you would like to qualify for
                </p>

                <Controller
                  name="idType"
                  control={form.control}
                  render={({ field }) => {
                    return (
                      <Select
                        {...field}
                        value={field?.value || "solo"}
                        className="primary-input my-3"
                      // label={text.profile_t2_1}
                      >
                        <MenuItem value="solo">Solo</MenuItem>
                        <MenuItem value="pool">Pool</MenuItem>
                      </Select>
                    );
                  }}
                />

                <div className="flex flex-wrap items-center">
                  <p className="mr-1">For Solo mining, as for now, the recommended IT/s is</p>
                  <span className="text-red-500">
                    {siteSetting?.data?.recommandedIts !== undefined
                      ? siteSetting?.data?.recommandedIts
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " it/s" || ""
                      : ""}
                  </span>
                </div>

                <div className="flex flex-col my-2 mb-10">
                  <span className="mr-2">Your Assigned ID:</span>

                  <code className="code-snippet lg:max-w-full max-w-96 my-3">
                    {identity?.miningId || ""}
                  </code>
                </div>

                <GlobalButton
                  text="Save"
                  className="my-5"
                  icon={<Icon icon={"material-symbols-light:save-outline"} />}
                  disabled={form.saveButtonProps.disabled}
                  // @ts-ignore
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    form.handleSubmit(formHandleSubmit)(e);
                  }}
                ></GlobalButton>
              </div>

            </CardContent>
          </Card>
        </Box>
        <Box height={'2px'} width={'100%'} bgcolor={'#86cee4'}></Box>
        {/* </Edit> */}
        <Box sx={[customThemes.mb1em, customThemes.cardStyle]}>
          <Card>
            <CardContent sx={{ "background-color": "#272727" }}>
              <div className="flex lg:flex-nowrap flex-wrap justify-start primary">
                {text.profile_t3}
                <section className="flex flex-col">
                  <span className="font-semibold text-2xl my-5">
                    Miner Setup (Linux)
                  </span>

                  <p className="mb-3">
                    <div className="flex flex-col">
                      <span className="goldenText font-bold my-3">
                        Download with all dependencies and cuda-toolkit :
                      </span>
                      <code className="code-snippet">
                        {dataItem.freshInstallationCommand +
                          (identity?.username
                            ? identity?.username.toUpperCase()
                            : userName) +
                          dataItem.fileExt}
                      </code>
                      <Box sx={{ marginBottom: "8px" }}>
                        <GlobalButton
                          text="Copy"
                          className="my-5"
                          icon={<Icon icon={"iconamoon:copy-thin"} />}
                          onClick={() => {
                            copyToClipboard(
                              dataItem.freshInstallationCommand +
                              (identity?.username
                                ? identity?.username.toUpperCase()
                                : userName) +
                              dataItem.fileExt
                            );
                          }}
                        >
                          Copy
                        </GlobalButton>
                      </Box>
                      <p className="mb-5">
                        <ul className="list-decimal ml-5">
                          <li>Launch the Terminal on Hive OS</li>
                          <li>Copy the Command and Click Enter</li>
                          <li>
                            When prompted, select Yes. Until the script
                            completely downloads and installs all the required
                            dependencies to run Qubic.
                          </li>
                        </ul>
                      </p>
                    </div>
                  </p>
                  <Box height={'2px'} width={'100%'} bgcolor={'#86cee4'}></Box>
                  <p className="flex flex-row flex-wrap md:flex-nowrap">
                    <div className="flex flex-col mt-8 mr-8">
                      <img src="/assets/gpu_transparent.png" width="250px" alt="gpu-transparent" />
                    </div>
                    <div>
                      <div className="flex flex-col">
                        <span className="goldenText font-bold my-3">
                          For existing Qubic miners:
                        </span>
                        <span className="goldenText my-1 font-semibold">
                          For existing qubic *GPU* Mining
                        </span>
                        <code className="code-snippet">
                          {`${dataItem.cubicGpuCommand}${identity?.username
                            ? identity?.username.toUpperCase()
                            : userName
                            }${dataItem.fileExt}`}
                        </code>
                        <Box sx={{ marginBottom: "8px" }}>
                          <GlobalButton
                            className="my-5"
                            text="copy"
                            icon={<Icon icon={"iconamoon:copy-thin"} />}
                            onClick={() => {
                              copyToClipboard(
                                `${dataItem.cubicGpuCommand}${identity?.username
                                  ? identity?.username.toUpperCase()
                                  : userName
                                }${dataItem.fileExt}`
                              );
                            }}
                          >
                            Copy
                          </GlobalButton>
                        </Box>
                      </div>
                      <div className="flex flex-col">
                        <span className="goldenText font-bold my-3">
                          Commands to operate : 
                        </span>
                        <span className="goldenText my-1 font-semibold">
                          Enable miner: 
                        </span>
                        <code className="code-snippet">
                          systemctl enable qli
                        </code>
                        {/* <Box sx={{ marginBottom: "8px" }}>
                          <GlobalButton
                            className="my-5"
                            text="copy"
                            icon={<Icon icon={"iconamoon:copy-thin"} />}
                            onClick={() => {
                              copyToClipboard(
                                `${dataItem.cubicGpuCommand}${identity?.username
                                  ? identity?.username.toUpperCase()
                                  : userName
                                }${dataItem.fileExt}`
                              );
                            }}
                          >
                            Copy
                          </GlobalButton>
                        </Box> */}
                      </div>
                      <div className="flex flex-col">
                        <span className="goldenText my-1 font-semibold">
                          Restart miner: 
                        </span>
                        <code className="code-snippet">
                          systemctl stop qli --no-block
                        </code>
                        {/* <Box sx={{ marginBottom: "8px" }}>
                          <GlobalButton
                            className="my-5"
                            text="copy"
                            icon={<Icon icon={"iconamoon:copy-thin"} />}
                            onClick={() => {
                              copyToClipboard(
                                `${dataItem.cubicGpuCommand}${identity?.username
                                  ? identity?.username.toUpperCase()
                                  : userName
                                }${dataItem.fileExt}`
                              );
                            }}
                          >
                            Copy
                          </GlobalButton>
                        </Box> */}
                      </div>
                      <div className="flex flex-col">
                        <span className="goldenText my-1 font-semibold">
                          Stop miner:
                        </span>
                        <code className="code-snippet">
                            systemctl stop qli
                        </code>
                        {/* <Box sx={{ marginBottom: "8px" }}>
                          <GlobalButton
                            className="my-5"
                            text="copy"
                            icon={<Icon icon={"iconamoon:copy-thin"} />}
                            onClick={() => {
                              copyToClipboard(
                                `${dataItem.cubicGpuCommand}${identity?.username
                                  ? identity?.username.toUpperCase()
                                  : userName
                                }${dataItem.fileExt}`
                              );
                            }}
                          >
                            Copy
                          </GlobalButton>
                        </Box> */}
                      </div>
                      <div className="flex flex-col">
                        <span className="goldenText my-1 font-semibold">
                          View logs: 
                        </span>
                        <div className="flex flex-row mt-4 flex-wrap md:flex-nowrap">
                          <div className="mr-4 flex flex-col">
                            <code className="code-snippet">
                              tail -f /var/log/qli.log (live feed on SSH)
                            </code>
                            {/* <Box sx={{ marginBottom: "8px"}}>
                              <GlobalButton
                                className="my-5"
                                text="copy"
                                icon={<Icon icon={"iconamoon:copy-thin"} />}
                                onClick={() => {
                                  copyToClipboard(
                                    `${dataItem.cubicGpuCommand}${identity?.username
                                      ? identity?.username.toUpperCase()
                                      : userName
                                    }${dataItem.fileExt}`
                                  );
                                }}
                              >
                                Copy
                              </GlobalButton>
                            </Box> */}
                          </div>
                          <div className="flex flex-col">
                            <code className="code-snippet">
                              tail -n 100 /var/log/qli.log (as a report)
                            </code>
                            {/* <Box sx={{ marginBottom: "8px" }}>
                              <GlobalButton
                                className="my-5"
                                text="copy"
                                icon={<Icon icon={"iconamoon:copy-thin"} />}
                                onClick={() => {
                                  copyToClipboard(
                                    `${dataItem.cubicGpuCommand}${identity?.username
                                      ? identity?.username.toUpperCase()
                                      : userName
                                    }${dataItem.fileExt}`
                                  );
                                }}
                              >
                                Copy
                              </GlobalButton>
                            </Box> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </p>
                  <Box height={'2px'} width={'100%'} bgcolor={'#86cee4'}></Box>
                  <p className="flex flex-row flex-wrap md:flex-nowrap my-5">
                    <div className="flex flex-col mr-8">
                      <img src="/assets/cpu_possible.png" width="250px" alt="cpu-possible" />
                    </div>
                    <div>
                      <div className="flex flex-col">
                        <span className="goldenText font-semibold my-3">
                          For existing qubic *CPU* miner
                        </span>
                        <code className="code-snippet">
                          {`${dataItem.cubicCpuCommand}${identity?.username
                            ? identity?.username.toUpperCase()
                            : userName
                            }${dataItem.fileExt}`}
                        </code>
                        <Box className="flex items-center" sx={{ marginBottom: "8px" }}>
                          <TextField
                            label="CPU Threads"
                            name="CPU Threads"
                            type="number"
                            size="medium"
                            sx={{ width: "150px" }}
                            className="cpu-threads-input"
                            value={cpuThreads}
                            onChange={(e: any) => setCpuThreads(+e.target.value)}
                          />
                          <GlobalButton
                            text="copy"
                            className="my-5 ml-5"
                            icon={<Icon icon={"iconamoon:copy-thin"} />}
                            onClick={() => {
                              copyToClipboard(
                                `${dataItem.cubicCpuCommand}${identity?.username
                                  ? identity?.username.toUpperCase()
                                  : userName
                                }${dataItem.fileExt}`
                              );
                            }}
                          >
                            Copy
                          </GlobalButton>

                        </Box>
                        <ul className="list-decimal ml-5">
                          <li>
                            Launch the script and it will automatically move your
                            miner.
                          </li>
                        </ul>
                      </div>
                      <div className="flex flex-col">
                        <span className="goldenText font-bold my-3">
                          Commands to operate : 
                        </span>
                        <span className="goldenText my-1 font-semibold">
                          Enable miner: 
                        </span>
                        <code className="code-snippet">
                          systemctl enable qli-cpu
                        </code>
                        {/* <Box sx={{ marginBottom: "8px" }}>
                          <GlobalButton
                            className="my-5"
                            text="copy"
                            icon={<Icon icon={"iconamoon:copy-thin"} />}
                            onClick={() => {
                              copyToClipboard(
                                `${dataItem.cubicGpuCommand}${identity?.username
                                  ? identity?.username.toUpperCase()
                                  : userName
                                }${dataItem.fileExt}`
                              );
                            }}
                          >
                            Copy
                          </GlobalButton>
                        </Box> */}
                      </div>
                      <div className="flex flex-col">
                        <span className="goldenText my-1 font-semibold">
                          Restart miner: 
                        </span>
                        <code className="code-snippet">
                          systemctl stop qli-cpu --no-block
                        </code>
                        {/* <Box sx={{ marginBottom: "8px" }}>
                          <GlobalButton
                            className="my-5"
                            text="copy"
                            icon={<Icon icon={"iconamoon:copy-thin"} />}
                            onClick={() => {
                              copyToClipboard(
                                `${dataItem.cubicGpuCommand}${identity?.username
                                  ? identity?.username.toUpperCase()
                                  : userName
                                }${dataItem.fileExt}`
                              );
                            }}
                          >
                            Copy
                          </GlobalButton>
                        </Box> */}
                      </div>
                      <div className="flex flex-col">
                        <span className="goldenText my-1 font-semibold">
                          Stop miner:
                        </span>
                        <code className="code-snippet">
                          systemctl stop qli-cpu
                        </code>
                        {/* <Box sx={{ marginBottom: "8px" }}>
                          <GlobalButton
                            className="my-5"
                            text="copy"
                            icon={<Icon icon={"iconamoon:copy-thin"} />}
                            onClick={() => {
                              copyToClipboard(
                                `${dataItem.cubicGpuCommand}${identity?.username
                                  ? identity?.username.toUpperCase()
                                  : userName
                                }${dataItem.fileExt}`
                              );
                            }}
                          >
                            Copy
                          </GlobalButton>
                        </Box> */}
                      </div>
                      <div className="flex flex-col">
                        <span className="goldenText my-1 font-semibold">
                          View logs: 
                        </span>
                        <div className="flex flex-row mt-4 flex-wrap md:flex-nowrap">
                          <div className="mr-4 flex flex-col">
                            <code className="code-snippet">
                              tail -f /var/log/qli-cpu.log (live feed on SSH)
                            </code>
                            {/* <Box sx={{ marginBottom: "8px"}}>
                              <GlobalButton
                                className="my-5"
                                text="copy"
                                icon={<Icon icon={"iconamoon:copy-thin"} />}
                                onClick={() => {
                                  copyToClipboard(
                                    `${dataItem.cubicGpuCommand}${identity?.username
                                      ? identity?.username.toUpperCase()
                                      : userName
                                    }${dataItem.fileExt}`
                                  );
                                }}
                              >
                                Copy
                              </GlobalButton>
                            </Box> */}
                          </div>
                          <div className="flex flex-col">
                            <code className="code-snippet">
                              tail -n 100 /var/log/qli-cpu.log (as a report)
                            </code>
                            {/* <Box sx={{ marginBottom: "8px" }}>
                              <GlobalButton
                                className="my-5"
                                text="copy"
                                icon={<Icon icon={"iconamoon:copy-thin"} />}
                                onClick={() => {
                                  copyToClipboard(
                                    `${dataItem.cubicGpuCommand}${identity?.username
                                      ? identity?.username.toUpperCase()
                                      : userName
                                    }${dataItem.fileExt}`
                                  );
                                }}
                              >
                                Copy
                              </GlobalButton>
                            </Box> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </p>
                </section>
              </div>
            </CardContent>
          </Card>
          <Box height={'2px'} width={'100%'} bgcolor={'#86cee4'}></Box>
          <Card className="my-10" sx={[customThemes.cardStyle]}></Card>
          <Card className="my-10">
            <CardContent
              className="flex flex-wrap items-start"
              sx={{ "background-color": "#272727" }}
            >
              <div>{text.profile_t5}</div>

              <div className="flex flex-col">
                <span className="font-semibold text-2xl primary my-5">
                  Miner Setup (HiveOS)
                </span>
                <Typography gutterBottom variant="fontM" component={"p"}>
                  {text.profile_t5_1}
                  <Typography
                    component={"span"}
                    variant="fontM"
                    sx={customThemes.blueText}
                  >
                    {identity?.username
                      ? identity?.username.toUpperCase()
                      : userName}
                    {text.profile_t5_3}
                  </Typography>
                  {/* <Typography sx={customThemes.blueText}>
              {text.profile_t5_3} </Typography> */}
                  <>
                    <p>and use the below Access Token</p>
                  </>
                </Typography>
                <div>
                  <img
                    src="/assets/hiveos.png"
                    alt="flightsheet"
                    className="object-contain lg:h-[523px] w-auto"
                    style={{ marginBottom: "8px" }}
                  />
                </div>

                <Box className="my-10" sx={{ marginBottom: "8px" }}>
                  <Typography
                    gutterBottom
                    variant="fontM"
                    sx={customThemes.redText}
                    component={"p"}
                  >
                    {text.profile_t5_4}
                  </Typography>
                  <GlobalButton
                    text="Generate Token (Copy)"
                    width="262px"
                    icon={<Icon icon={"iconamoon:copy-thin"} />}
                    onClick={() => {
                      copyToClipboard(
                        cpToken
                      );
                    }}
                  ></GlobalButton>
                </Box>
              </div>
            </CardContent>
          </Card>
        </Box>
      </section>
    </Container>
  );
};