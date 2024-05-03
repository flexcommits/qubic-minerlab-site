import { Button, Grid, Typography, useMediaQuery, Container } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  IResourceComponentsProps,
  useGetIdentity,
  useResource,
  useTranslate,
  useUserFriendlyName,
  useList,
} from "@refinedev/core";
import { List, useDataGrid } from "@refinedev/mui";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { RefinePageHeaderClassNames } from "@refinedev/ui-types";
import {
  List as AntList,
  TagField,
  useTable,
  getDefaultSortOrder,
  RefreshButton,
} from "@refinedev/antd";
import { Spin, Table } from "antd";
import { getUserName, numberWithCommas } from "../../helper/help";
import { EpochRecordsList } from "../epoch-records"
import Earning from "../earning-records/earning";
// import RefreshButton from "../../components/refreshButton";

export const PayoutList: React.FC<IResourceComponentsProps> = () => {
  const userName = getUserName();
  const { data: identity } = useGetIdentity<IIdentity>();


  
  const dataTable = useTable({
    resource: "payout",
    liveMode: "auto",
    pagination: {
      pageSize: 20,
    },
  });

  const translate = useTranslate();
  const getUserFriendlyName = useUserFriendlyName();
  const {
    resource,
    action,
    id: idFromParams,
    identifier,
  } = useResource("profile");

  const [isLoading, setIsLoading] = useState(false);

  const refreshButtonClick = async () => {

  dataTable.tableQueryResult?.refetch();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  return (
    <Container maxWidth="xl">
      <div className="">
      <section className="mb-10">
        <Earning />
      </section>
        <List
          title={
            <Typography
              variant="fontL"
              className={`primary ${RefinePageHeaderClassNames.Title}`}
            >
              {translate(
                `${identifier}.titles.list`,
                `${(getUserFriendlyName(
                  resource?.meta?.label ??
                  resource?.options?.label ??
                  resource?.label ??
                  identifier,
                  "plural"
                ),
                  "Payout")
                }`
              )}
            </Typography>
          }
          headerButtons={
            <RefreshButton
              resource="payout"
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
              rowKey="id"
            >
              <Table.Column
                dataIndex="epoch"
                title="Epoch"
                // defaultSortOrder={getDefaultSortOrder("epoch", dataTable.sorters)}
              />
              <Table.Column
                dataIndex="amount"
                title="Amount"
                // defaultSortOrder={getDefaultSortOrder("amount", dataTable.sorters)}
                render={(value: string) => numberWithCommas(value)}
              />
              <Table.Column
                dataIndex="payment"
                title="Payment"
                // defaultSortOrder={getDefaultSortOrder("payment", dataTable.sorters)}
              />
              <Table.Column
                dataIndex="solutionFound"
                title="Solutions"
                // defaultSortOrder={getDefaultSortOrder(
                //   "solutionFound",
                //   dataTable.sorters
                // )}
              />
              <Table.Column
                dataIndex="avgScore"
                title="AVGScore"
                responsive={["md"]}
                // defaultSortOrder={getDefaultSortOrder(
                //   "avgScore",
                //   dataTable.sorters
                // )}
              // render={(value: string) => <TagField value={value} />}
              // filterDropdown={(props) => (
              //   <FilterDropdown {...props}>
              //     <Radio.Group>
              //       <Radio value="published">Published</Radio>
              //       <Radio value="draft">Draft</Radio>
              //       <Radio value="rejected">Rejected</Radio>
              //     </Radio.Group>
              //   </FilterDropdown>
              // )}
              />
              <Table.Column
                dataIndex="created_at"
                title="Paid At"
                key="created_at"
                sorter={(a: IIdentity, b: IIdentity) => {
                  // Check if created_at exists and is valid
                  if (!a.created_at || !moment(a.created_at).isValid() || !b.created_at || !moment(b.created_at).isValid()) {
                    return 0;
                  }
                  return moment(b.created_at).valueOf() - moment(a.created_at).valueOf();
                }}
                render={(value: string) => value ? moment(value).format("DD/MMM/YYYY hh:mm A") : ''}
                // defaultSortOrder='ascend'
                responsive={["md"]}
              />
            </Table>
          )}
        </List>

        <section className="mt-10">
          <EpochRecordsList />
        </section>
      </div>
    </Container>
  );
};

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
  created_at?: string;
};
