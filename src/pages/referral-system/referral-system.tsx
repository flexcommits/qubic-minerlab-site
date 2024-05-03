import {
  FacebookOutlined,
  SkypeOutlined,
  TwitterOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { Icon } from "@iconify/react";
import { Container, Typography } from "@mui/material";
import { RefreshButton, getDefaultSortOrder, useTable } from "@refinedev/antd";
import {
  useGetIdentity,
  useNotification,
  useResource,
  useTranslate,
  useUserFriendlyName,
} from "@refinedev/core";
import { List } from "@refinedev/mui";
import { RefinePageHeaderClassNames } from "@refinedev/ui-types";
import { Table } from "antd";
import moment from "moment";
import React, { useEffect } from "react";
import { useQrious } from "react-qrious";
import GlobalButton from "../../components/custom/Button";
import { IUser } from "../../components/header";

const ReferralSystem = () => {
  const { data: identity } = useGetIdentity<IUser>();
  const { open } = useNotification();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isPayoutLoading, setIsPayoutLoading] = React.useState(false);
  const [isrUserLoading, setIsrUserLoading] = React.useState(false);
  const translate = useTranslate();
  const getUserFriendlyName = useUserFriendlyName();
  const { resource, identifier } = useResource("profile");
  const copyToClipboard = (copyText: string, message?: string) => {
    navigator.clipboard.writeText(copyText);
    open?.({
      type: "success",
      message: message ?? "Copied to Clipboard",
      description: "",
      key: "unique-id",
    });
  };

  const referralUserDataTable = useTable({
    resource: "my_referral_list",
    liveMode: "auto",
    pagination: {
      pageSize: 10,
    },
  });

  const dataTable = useTable({
    resource: "my_referral",
    liveMode: "auto",
    pagination: {
      pageSize: 500,
    },
  });
  const payoutDataTable = useTable({
    resource: "payout_referral",
    liveMode: "auto",
    pagination: {
      pageSize: 500,
    },
  });

  
  const value = `https://qubic.minerlab.io/register?referral=${identity?.username}`;
  const [dataUrl, _qrious] = useQrious({ size: 250, value });
  useEffect(() => {}, [dataTable?.tableProps?.dataSource]);

  const refreshButtonClick = async (type?: string) => {
    try {
      switch (type) {
        case "referral_user_list":
          setIsrUserLoading(true);
          await referralUserDataTable.tableQueryResult?.refetch();
          setTimeout(() => {
            setIsrUserLoading(false);
          }, 500);
          break;
        case "payout":
          setIsPayoutLoading(true);
          await payoutDataTable.tableQueryResult?.refetch();
          setTimeout(() => {
            setIsPayoutLoading(false);
          }, 500);
          break;
        default:
          setIsLoading(true);
          await dataTable.tableQueryResult?.refetch();
          setTimeout(() => {
            setIsLoading(false);
          }, 500);
          break;
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Container maxWidth="xl">
      <List title="">
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-12">
            <div className="pt-5 mx-auto">
              <img src={dataUrl} />
            </div>
            <div className="space-y-4 grid justify-center mx-auto">
              <div>Your referral code is: {identity?.username}</div>
              <div>Click the icon below to share</div>
              <div className="grid grid-cols-3 mx-auto gap-6">
                <GlobalButton
                  width="83px"
                  height="52px"
                  className="primary my-2"
                  onClick={() => {
                    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      value
                    )}`;
                    window.open(url, "_blank");
                  }}
                  icon={<FacebookOutlined />}
                />
                <GlobalButton
                  width="83px"
                  height="52px"
                  className="primary my-2"
                  onClick={() => {
                    const url = `https://api.whatsapp.com/send?text=Join%20me%20on%20Qubic%20MinerLab%20${encodeURIComponent(
                      value
                    )}`;
                    window.open(url, "_blank");
                  }}
                  icon={<WhatsAppOutlined />}
                />
                <GlobalButton
                  width="83px"
                  height="52px"
                  className="primary my-2"
                  onClick={() => {
                    const url = `https://twitter.com/intent/tweet?text=Join%20me%20on%20Qubic%20MinerLab&url=${encodeURIComponent(
                      value
                    )}`;
                    window.open(url, "_blank");
                  }}
                  icon={<TwitterOutlined />}
                />
                <GlobalButton
                  width="83px"
                  height="52px"
                  className="primary my-2"
                  onClick={() => {
                    const url = `https://web.skype.com/share?url=${encodeURIComponent(
                      value
                    )}&text=Join%20me%20on%20Qubic%20MinerLab`;
                    window.open(url, "_blank");
                  }}
                  icon={<SkypeOutlined />}
                />
                <GlobalButton
                  width="83px"
                  height="52px"
                  className="primary my-2"
                  onClick={() => {
                    const url = `https://t.me/share/url?url=${encodeURIComponent(
                      value
                    )}&text=Join%20me%20on%20Qubic%20MinerLab`;
                    window.open(url, "_blank");
                  }}
                  icon={<Icon icon={"akar-icons:telegram-fill"} />}
                />
                <GlobalButton
                  width="83px"
                  height="52px"
                  className="primary my-2"
                  onClick={() => {
                    const message = `https://qubic.minerlab.io/register?referral=${identity?.username}`;
                    copyToClipboard(message);
                  }}
                  icon={<Icon icon={"iconamoon:copy-thin"} />}
                />
              </div>
            </div>
            <List
              title={
                <Typography
                  variant="fontL"
                  className={`primary ${RefinePageHeaderClassNames.Title}`}
                >
                  {translate(
                    `${identifier}.titles.list`,
                    `${
                      (getUserFriendlyName(
                        resource?.meta?.label ??
                          resource?.options?.label ??
                          resource?.label ??
                          identifier,
                        "plural"
                      ),
                      "Referral user list")
                    }`
                  )}
                </Typography>
              }
              headerButtons={
                <RefreshButton
                  resource="miner_records_view"
                  className="primary"
                  hideText
                  onClick={() => refreshButtonClick("referral_user_list")}
                />
              }
            >
              <Table
                {...referralUserDataTable.tableProps}
                loading={isrUserLoading}
                pagination={{
                  defaultPageSize: 10,
                  pageSizeOptions: [20, 30, 40, 50, 100, 200, 500, 1000],
                }}
                rowKey="Username"
              >
                <Table.Column
                  dataIndex="Username"
                  title="Username"
                  key="Username"
                  sorter
                  defaultSortOrder={getDefaultSortOrder(
                    "Username",
                    dataTable.sorters
                  )}
                />
                <Table.Column
                  dataIndex="Joined at"
                  title="Joined at"
                  key="Joined at"
                  sorter
                  defaultSortOrder={getDefaultSortOrder(
                    "Joined at",
                    dataTable.sorters
                  )}
                  render={(value: string) =>
                    value ? moment(value).format("DD/MMM/YYYY") : ""
                  }
                />
              </Table>
            </List>
          </div>
        </div>
      </List>
      <div className="pt-5">
        <List
          title={
            <Typography
              variant="fontL"
              className={`primary ${RefinePageHeaderClassNames.Title}`}
            >
              {translate(
                `${identifier}.titles.list`,
                `${
                  (getUserFriendlyName(
                    resource?.meta?.label ??
                      resource?.options?.label ??
                      resource?.label ??
                      identifier,
                    "plural"
                  ),
                  "Referral records")
                }`
              )}
            </Typography>
          }
          headerButtons={
            <RefreshButton
              resource="miner_records_view"
              className="primary"
              hideText
              onClick={() => refreshButtonClick()}
            />
          }
        >
          <Table
            {...dataTable.tableProps}
            loading={isLoading}
            pagination={{
              defaultPageSize: 20,
              pageSizeOptions: [20, 30, 40, 50, 100, 200, 500, 1000],
            }}
            rowKey="epoch"
          >
            <Table.Column
              dataIndex="miner"
              title="Referral"
              key="miner"
              sorter
              defaultSortOrder={getDefaultSortOrder("miner", dataTable.sorters)}
            />
            <Table.Column
              dataIndex="epoch"
              title="Epoch"
              key="epoch"
              sorter
              defaultSortOrder={getDefaultSortOrder("epoch", dataTable.sorters)}
            />
            <Table.Column
              dataIndex="its"
              title="Total it/s"
              key="its"
              sorter
              defaultSortOrder={getDefaultSortOrder("its", dataTable.sorters)}
            />
            <Table.Column
              dataIndex="sol"
              title="Total Solutions"
              key="solutions"
              sorter
              defaultSortOrder={getDefaultSortOrder("sol", dataTable.sorters)}
            />
            <Table.Column
              dataIndex="avg_score"
              title="Avg score"
              key="avg_score"
              sorter
              responsive={["md"]}
              defaultSortOrder={getDefaultSortOrder(
                "avg_score",
                dataTable.sorters
              )}
            />
            <Table.Column
              dataIndex="pct"
              title="Percentage"
              key="pct"
              responsive={["md"]}
              sorter
              defaultSortOrder={getDefaultSortOrder("pct", dataTable.sorters)}
              render={(value: string) => <div>{value}%</div>}
            />
          </Table>
        </List>
      </div>
      <div className="pt-5">
        <List
          title={
            <Typography
              variant="fontL"
              className={`primary ${RefinePageHeaderClassNames.Title}`}
            >
              {translate(
                `${identifier}.titles.list`,
                `${
                  (getUserFriendlyName(
                    resource?.meta?.label ??
                      resource?.options?.label ??
                      resource?.label ??
                      identifier,
                    "plural"
                  ),
                  "Payout referral records")
                }`
              )}
            </Typography>
          }
          headerButtons={
            <RefreshButton
              resource="miner_records_view"
              className="primary"
              hideText
              onClick={() => refreshButtonClick("payout")}
            />
          }
        >
          <Table
            {...payoutDataTable.tableProps}
            loading={isPayoutLoading}
            pagination={{
              defaultPageSize: 20,
              pageSizeOptions: [20, 30, 40, 50, 100, 200, 500, 1000],
            }}
            rowKey="epoch"
          >
            <Table.Column
              dataIndex="ref_username"
              title="Earned From"
              key="ref_username"
              defaultSortOrder={getDefaultSortOrder(
                "ref_username",
                payoutDataTable.sorters
              )}
            />
            <Table.Column
              dataIndex="epoch"
              title="Epoch"
              key="epoch"
              defaultSortOrder={getDefaultSortOrder(
                "epoch",
                payoutDataTable.sorters
              )}
            />
            <Table.Column
              dataIndex="amount"
              title="Qubic"
              key="amount"
              sorter
              defaultSortOrder={getDefaultSortOrder(
                "amount",
                payoutDataTable.sorters
              )}
            />
            <Table.Column
              dataIndex="payment"
              title="Payout"
              key="payment"
              sorter
              defaultSortOrder={getDefaultSortOrder(
                "payment",
                payoutDataTable.sorters
              )}
            />
          </Table>
        </List>
      </div>
    </Container>
  );
};

export default ReferralSystem;
