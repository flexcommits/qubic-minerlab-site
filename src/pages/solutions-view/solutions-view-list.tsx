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
import Chart from 'react-apexcharts'


export const SolutionsViewList: React.FC<SolutionsViewListProps> = (props) => {
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
  const tokenData = localStorage.getItem("sb-afhvocspeeserasytprs-auth-token");
  const { queryResult: minerDailyRpt } = useSelect({
    meta: {
      headers: { "Authorization": `Bearer ${JSON.parse(tokenData || "").access_token}` },
    },
    resource: "miner_daily_rpt",
    liveMode: "auto",
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
    minerDailyRpt.isLoading ? null : minerDailyRpt?.refetch();
    if (props.refreshCallback) {
      props.refreshCallback();
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const [minerStatChartXLabels, setMinerStatChartXLabels] = useState<string[]>([]);
  const [minerStatChartIts, setMinerStatChartIts] = useState<number[]>([]);
  const [minerStatChartSolutions, setMinerStatChartSolutions] = useState<number[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    if(window.innerWidth < 768) setIsMobile(true);
    else setIsMobile(false);
  }

  window.addEventListener("resize", handleResize);

  useEffect(() => {
    const formattedData = minerDailyRpt.data?.data?.map(item => ({
      date: item.date,
      its: item.its,
      solutions: item.its
    }));

    if (formattedData) {
      const filterxLabels = formattedData.map((item) => item.date);
      const filterItsData = formattedData.map((item) => item.its);
      const filterSolData = formattedData.map((item) => item.solutions);
    
      setMinerStatChartXLabels(filterxLabels);
      setMinerStatChartIts(filterItsData);
      setMinerStatChartSolutions(filterSolData);

    }
  }, [dataTable.tableProps.dataSource])

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
        <RefreshButton
          resource="payout"
          className="primary"
          hideText
          onClick={refershButtonClick}
        />
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
          <Grid>
            <Grid className="block 2xl:flex">
              <Grid>
                <Flex
                direction={"column"}
                justify={"space-between"}
                align={"center"}
                className="mx-3"
                >
                  <Typography color={"#86cee4"} fontSize={"20px"}>Solutions</Typography>
                </Flex>
                <Flex
                  justify={"center"}
                  align={"center"}
                >
                <LineChart
                  width={700}
                  height={400}
                  series={[
                    { data: minerStatChartSolutions, label: 'sol', showMark: false },
                  ]}
                  xAxis={[{ scaleType: 'point', data: minerStatChartXLabels }]}
                  grid={{horizontal: true}}
                  sx={{
                    '.MuiChartsAxis-bottom ': {
                      display: 'none'
                    }
                  }}
                />
                </Flex>
              </Grid>
              <Flex
                justify={"center"}
                align={"center"}
                color="black"
              >
                <Grid>
                  <Flex
                  direction={"column"}
                  justify={"space-between"}
                  align={"center"}
                  className="mx-3"
                  >
                    <Typography color={"#86cee4"} fontSize={"20px"}>Iteration/s</Typography>
                  </Flex>
                  <Flex
                    justify={"center"}
                    align={"center"}
                    className="mt-6"
                  >
                    <Grid>
                    <Chart 
                      options={{
                        chart: {
                          id: 'itsStepChart',
                        },
                        xaxis: {
                          categories: minerStatChartXLabels
                        },
                        stroke: {
                          curve: 'stepline',
                        },
                        tooltip: {
                          enabled: true,
                          theme: "black",
                        },
                        colors: ['#03a4a3']
                      }} 
                      series={[{
                        name: 'it/s',
                        data: minerStatChartIts
                      }]}
                      type="line"
                      width={isMobile ? 300 : 700} 
                      height={isMobile ? 300 : 450} 
                    />
                    </Grid>
                  </Flex>
                </Grid>
              </Flex>
            </Grid>
          </Grid>
        // <Table
        //   {...dataTable.tableProps}
        //   pagination={{
        //     defaultPageSize: 500,
        //     pageSizeOptions: [500, 1000, 2000],
        //   }}
        //   rowKey="id"
        //   rowClassName={(record, index) => {
        //     const providedDateTime = moment(record.lastActive).utc();
        //     if(providedDateTime.isValid() === false) {
        //       return "";
        //     }

        //     // Get the current datetime
        //     const currentDateTime = moment().utc();
        //     // Calculate the difference in minutes
        //     const timeDifferenceInMinutes = currentDateTime.diff(
        //       providedDateTime,
        //       "minutes"
        //     );
            
        //     // Compare with 45 minutes
        //     const checked = timeDifferenceInMinutes > 45;

        //     return checked ? "inactiveRow" : "";
        //   }}
        // >
        //   <Table.Column
        //     dataIndex="miner"
        //     title="Miner"
        //     sorter
        //     defaultSortOrder={getDefaultSortOrder("miner", dataTable.sorters)}
        //     fixed="left"
        //   />
        //   <Table.Column
        //     dataIndex="Solutions"
        //     title="Solution"
        //     sorter
        //     defaultSortOrder={getDefaultSortOrder(
        //       "solution",
        //       dataTable.sorters
        //     )}
        //   />
        //   <Table.Column
        //     dataIndex="Its"
        //     title="Total It/s"
        //     sorter
        //     defaultSortOrder={getDefaultSortOrder("its", dataTable.sorters)}
        //   />
        //   {/* <Table.Column
        //     dataIndex="version"
        //     title="Version"
        //     sorter
        //     defaultSortOrder={getDefaultSortOrder("version", dataTable.sorters)}
        //     responsive={["md"]}
        //   /> */}
        //   <Table.Column
        //     dataIndex="lastActive"
        //     title="Last Active"
        //     sorter
        //     defaultSortOrder={getDefaultSortOrder(
        //       "lastActive",
        //       dataTable.sorters
        //     )}
        //     render={(value: string) =>
        //       moment(value).format("DD/MMM/YYYY hh:mm A")
        //     }
        //     responsive={["md"]}
        //   />
        //   {/* <Table.Column
        //     dataIndex="isActive"
        //     title="Is Active"
        //     sorter
        //     defaultSortOrder={getDefaultSortOrder(
        //       "isActive",
        //       dataTable.sorters
        //     )}
        //     render={(value: boolean) => (value ? <CheckIcon /> : <CloseIcon />)}
        //     responsive={["md"]}
        //   /> */}
        // </Table>
      )}
    </List>
  );
};

SolutionsViewList.propTypes = {
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
