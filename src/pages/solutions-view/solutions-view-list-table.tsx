import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  IResourceComponentsProps,
  useList,
  useGetIdentity,
  useResource,
  useTranslate,
  useUserFriendlyName,
  useNotification,
  useSelect,
} from "@refinedev/core";
import { List } from "@refinedev/mui";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useTheme } from "@mui/material/styles";
import { Button, Grid, Typography, useMediaQuery } from "@mui/material";
import { RefinePageHeaderClassNames } from "@refinedev/ui-types";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import {
  List as AntList,
  TagField,
  useTable,
  getDefaultSortOrder,
  RefreshButton,
} from "@refinedev/antd";
import { Spin, Table } from "antd";
import { getUserName } from "../../helper/help";
import { LineChart } from '@mui/x-charts/LineChart';
import { Flex } from "@mantine/core";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

export const SolutionsViewListTable: React.FC<SolutionsViewListProps> = (props) => {
  const { data: identity } = useGetIdentity<IIdentity>();
  const { open } = useNotification();

  const userName = getUserName();

  const translate = useTranslate();
  const getUserFriendlyName = useUserFriendlyName();
  const {
    resource,
    action,
    id: idFromParams,
    identifier,
  } = useResource("miner-configurations");

  const [isLoading, setIsLoading] = useState(false);
  const [isShowOffline, setIsShowOffline] = useState(true);

  const dataTable = useTable({
    meta: {
      rpc: {
        resource: "get_miner_records_v2",
        liveMode: "auto",
        body: {
          username: identity?.username
            ? identity?.username
            : "changed-xxxx-xxxx-xxxx-xxxx-xxxx",
        },
      },
    },
    pagination: {
      pageSize: 500,
    },
  });

  // const dataList = useList({
  //   resource: "solutions_view",
  //   liveMode: 'auto',
  //   filters: [
  //     {
  //       field: "miner",
  //       operator: "contains",
  //       value: props?.identity?.minerId,
  //     },
  //   ],
  //   pagination: {
  //     current: dataGrid.current,
  //     pageSize: dataGrid.pageSize,
  //   },
  // });

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  // const [cDataGrid, setCDataGrid] = useState<any>({
  //   dataGridProps: {
  //     ...dataGrid.dataGridProps,
  //     rows: dataList.data || [],
  //   },
  // } as any);

  // const columns = React.useMemo<GridColDef[]>(
  //   () => [
  //     {
  //       field: "miner",
  //       headerName: "Miner",
  //       type: "string",
  //       flex: 1,
  //       minWidth: 150,
  //     },
  //     {
  //       field: "solution",
  //       headerName: "Solution",
  //       type: "number",
  //       minWidth: 120,
  //     },
  //     {
  //       field: "its",
  //       headerName: "Total It/s",
  //       type: "number",
  //       minWidth: 120,
  //       // flex: 1
  //     },
  //     {
  //       field: "version",
  //       headerName: "Version",
  //       type: "string",
  //       // flex: 1,
  //     },
  //     {
  //       field: "lastActive",
  //       headerName: "Last Active",
  //       minWidth: 200,
  //       valueFormatter: (params) => {
  //         return moment(params?.value).format("DD/MMM/YYYY hh:mm A");
  //       },
  //     },
  //     // {
  //     //   field: "identity",
  //     //   headerName: "Identity",
  //     //   type: "string",
  //     //   flex: 1,
  //     //   minWidth: 250
  //     // },
  //     // {
  //     //   field: "id",
  //     //   headerName: "Id",
  //     //   type: "string",
  //     //   flex: 1,
  //     //   minWidth: 250
  //     // },
  //     {
  //       field: "isActive",
  //       headerName: "Is Active",
  //       type: "boolean",
  //     },
  //   ],
  //   []
  // );

  const refershButtonClick = async () => {

    await dataTable.tableQueryResult?.refetch();

    if (props.refreshCallback) {
      props.refreshCallback();
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const switchStatsClick = () => {
    setIsShowOffline(!isShowOffline);
  }

  // useEffect(() => {
  //   setCDataGrid(dataGrid);
  // }, [dataGrid.dataGridProps.rows]);

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
    <List
      title={
        <Typography
          
          className={`${RefinePageHeaderClassNames.Title} primary`}
          sx={{ fontSize: "18px", fontFamily: "inherit"}}
        >
          {translate(
            `${identifier}.titles.list`,
            `${getUserFriendlyName(
              resource?.meta?.label ??
                resource?.options?.label ??
                resource?.label ??
                identifier,
              "plural"
            )}`
          )}
        </Typography>
      }
      headerButtons={[
        (identity?.pubId !== undefined && identity?.pubId !== "") ? 
        (
          // <Button             
          //   onClick={() => {
          //     // copy url /public/miner-stats/:pubId
          //     copyToClipboard(
          //       `${window.location.origin}/public/miner-stats/${identity?.pubId}`
          //     );
          //   }}
          // >
          //   {`Share link`}
          // </Button>
          <></>
        ) : 
        <></>,
        <>
          <Grid>
            <FormControlLabel control={<Switch defaultChecked />} label={"inactive"} sx={{
              '.MuiSwitch-switchBase': {
                top: '7px',
                let: "0px"
              }
            }}
            onClick={switchStatsClick}
            />
          </Grid>
          <RefreshButton
            resource="payout"
            className="primary"
            hideText
            onClick={refershButtonClick}
          />
        </>
      ]}
    >
      {/* <DataGrid
        {...cDataGrid?.dataGridProps}
        sx={{ overflowX: "scroll" }}
        columns={columns}
        autoHeight
        getRowHeight={() => "auto"}
        columnVisibilityModel={{
          version: !isSmall,
          isActive: !isSmall,
          lastActive: !isSmall,
        }}
        getRowClassName={(params) => {
          return params.row.isActive ? "" : "inactiveRow";
        }}
        disableColumnFilter
        slots={{ columnMenu: CustomColumnMenu }}
      /> */}

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
          rowClassName={(record, index) => {
            const providedDateTime = moment(record.lastActive).utc();
            if(providedDateTime.isValid() === false) {
              return "";
            }

            // Get the current datetime
            const currentDateTime = moment().utc();
            // Calculate the difference in minutes
            const timeDifferenceInMinutes = currentDateTime.diff(
              providedDateTime,
              "minutes"
            );
            
            // Compare with 45 minutes
            const checked = timeDifferenceInMinutes > 45;

            return checked ? (isShowOffline ? "inactiveRow": "hideInactiveRow") : "";
          }}
        >
          <Table.Column
            dataIndex="miner"
            title="Miner"
            sorter
            defaultSortOrder={getDefaultSortOrder("miner", dataTable.sorters)}
            fixed="left"
          />
          <Table.Column
            dataIndex="Solutions"
            title="Solution"
            sorter
            defaultSortOrder={getDefaultSortOrder(
              "solution",
              dataTable.sorters
            )}
          />
          <Table.Column
            dataIndex="Its"
            title="Total It/s"
            sorter
            defaultSortOrder={getDefaultSortOrder("its", dataTable.sorters)}
          />
          {/* <Table.Column
            dataIndex="version"
            title="Version"
            sorter
            defaultSortOrder={getDefaultSortOrder("version", dataTable.sorters)}
            responsive={["md"]}
          /> */}
          <Table.Column
            dataIndex="lastActive"
            title="Last Active"
            sorter
            defaultSortOrder={getDefaultSortOrder(
              "lastActive",
              dataTable.sorters
            )}
            render={(value: string) =>
              moment(value).format("DD/MMM/YYYY hh:mm A")
            }
            responsive={["md"]}
          />
          {/* <Table.Column
            dataIndex="isActive"
            title="Is Active"
            sorter
            defaultSortOrder={getDefaultSortOrder(
              "isActive",
              dataTable.sorters
            )}
            render={(value: boolean) => (value ? <CheckIcon /> : <CloseIcon />)}
            responsive={["md"]}
          /> */}
        </Table>
      )}
    </List>
  );
};

SolutionsViewListTable.propTypes = {
  identity: PropTypes.object,
  refreshCallback: PropTypes.func,
};

export interface SolutionsViewListProps
  extends Omit<IResourceComponentsProps, "title"> {
  identity: any;
  refreshCallback?: () => void;
}

type IIdentity = {
  pubId?: string;
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
