import { getDefaultSortOrder, useTable, RefreshButton } from "@refinedev/antd";
import { List } from "@refinedev/mui";
import {
  IResourceComponentsProps,
  useCustom,
  useGetIdentity,
  useResource,
  useTranslate,
  useUserFriendlyName,
} from "@refinedev/core";
import { Grid, Typography } from "@mui/material";
import { RefinePageHeaderClassNames } from "@refinedev/ui-types";
import { Spin, Table } from "antd";
import React, { useEffect } from "react";
import { set } from "lodash";
import { getUserName } from "../../helper/help";

export const EpochRecordsList: React.FC<IResourceComponentsProps> = () => {
  const userName = getUserName();
  const { data: identity } = useGetIdentity<IIdentity>();
  const translate = useTranslate();
  const getUserFriendlyName = useUserFriendlyName();
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    resource,
    action,
    id: idFromParams,
    identifier,
  } = useResource("profile");

  const dataTable = useTable({
    meta: {
      rpc: {
        resource: "get_miner_epoch_sum_v2",
        body: {
          username_param: identity?.username
            ? identity?.username
            : "changed-xxx-xxx-xxx-xxx-xxx",
        },
      },
    },
  });

  const refreshButtonClick = async () => {
    await dataTable.tableQueryResult?.refetch();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  return (
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
              "Epoch Records")
            }`
          )}
        </Typography>
      }
      headerButtons={
        <RefreshButton
          resource="miner_records_view"
          className="primary"
          hideText
          onClick={refreshButtonClick}
        />
      }
    >
      {isLoading ? (
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Spin />
        </Grid>
      ) : (
        <Table
          {...dataTable.tableProps}
          pagination={{
            defaultPageSize: 500,
            pageSizeOptions: [500, 1000, 2000],
          }}
          rowKey="epoch"
        >
          <Table.Column
            dataIndex="epoch"
            title="Epoch"
            key="epoch"
            defaultSortOrder={getDefaultSortOrder("epoch", dataTable.sorters)}
          />
          {/* <Table.Column
          dataIndex="alias"
          title="Alias"
          key="alias"
          defaultSortOrder={getDefaultSortOrder("alias", dataTable.sorters)}
        /> */}
          <Table.Column
            dataIndex="solutions"
            title="Solutions Found"
            key="solutions"
            sorter
            defaultSortOrder={getDefaultSortOrder(
              "solutions",
              dataTable.sorters
            )}
          />
        </Table>
      )}
    </List>
  );
};
export default EpochRecordsList;

type IIdentity = {
  email?: string;
  email2?: string;
  first_name?: string;
  idType: string;
  minerId: string;
  miningId: string;
  poolFees: number;
  username?: string;
  wallet_address?: string;
};
