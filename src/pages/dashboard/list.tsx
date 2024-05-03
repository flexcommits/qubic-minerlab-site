import { getDefaultSortOrder, useTable, RefreshButton } from "@refinedev/antd";
import { Flex, Group, Paper, SimpleGrid, Text } from "@mantine/core";
// import {  } from "@refinedev/mantine";
import classes from "./StatsGrid.module.css";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import EngineeringIcon from "@mui/icons-material/Engineering";
import StorageIcon from "@mui/icons-material/Storage";
import { Card, CardContent, CardHeader, Container } from "@mui/material";
import LinearProgress from '@mui/material/LinearProgress'
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {
  IResourceComponentsProps,
  // useCustom,
  // useGetIdentity,
  // useResource,
  useSelect,
  // useTranslate,
  // useUserFriendlyName,
} from "@refinedev/core";

import { Grid, Typography } from "@mui/material";
// import { RefinePageHeaderClassNames } from "@refinedev/ui-types";
// import { Spin, Table } from "antd";
import React, { useEffect, useState } from "react";

import { getUserName, numberWithCommas } from "../../helper/help";

import { listing1, listing2, listing3 } from "../../helper/common";
import { CListing } from "../../components/custom/cListing";
import customThemes from "../../theme";
import MicrowaveIcon from '@mui/icons-material/Microwave';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import { Icon } from '@iconify/react';
import { HourlySol } from "../../components/Charts/HourlySol";
import { EpochRpt } from "../../components/Charts/EpochRpt";
import { PoolStats } from "../../components/Charts/PoolStats";
import { SelectChartButton, SelectChartButtonGroup } from "../../components/SelectChartButtonGroup";
import { Spin } from "antd";

// import { title } from "process";

const icons = {
  user: RecordVoiceOverIcon,
  worker: EngineeringIcon,
  hashrate: LocalFireDepartmentIcon,
  nodes: StorageIcon,
  solution: EmojiObjectsIcon,
  epoch: AccessTimeIcon,
  MicrowaveIcon: MicrowaveIcon,
  ViewInArIcon: ViewInArIcon
};


const data = [
  { title: "Current Epoch", icon: "clarity:clock-line", key: "currentEpoch", },
  { title: "Active Users", icon: "ph:users", key: "activeUsers" },
  { title: "Solutions Found", icon: "carbon:idea", key: "currentEpochSolutions" },
  { title: "Total Hashrate (It/s)", icon: "solar:fire-outline", key: "currentIts" },
  { title: "Total Workers", icon: "clarity-employee-line", key: "currentMiners" },
  { title: "Qualifying IDs", icon: "prime:id-card", key: "currentEpochIDs" },
  { title: "Active Nodes", icon: "tdesign-tab", key: "nodes" },
  { title: "Last Epoch Qubic/Sol", icon: "fluent:cube-48-regular", key: "lastEpochSolValue" },
  { title: "Last Epoch Total Payout", icon: "streamline:dollar-coin", key: "" }
] as const;

export const Dash: React.FC<IResourceComponentsProps> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedChart, setSelectedChart] = useState(2);

  const { queryResult: poolStats } = useSelect({
    resource: "pool_stats",
    liveMode: "auto",
  });

  const { queryResult: tickOverview } = useSelect({
    resource: "tickOverview",
    sorters: [
      {
        field: "timestamp",
        order: "desc",
      },
    ],
    liveMode: "auto",
    pagination: {
      current: 1,
      pageSize: 1,
    },
  });

  const { queryResult: hourlySol } = useSelect({
    resource: "hourly_sol_rpt",
    sorters: [
      {
        field: "time",
        order: "desc",
      },
    ],
    liveMode: "auto",
  });

  const { queryResult: dailyRpt } = useSelect({
    resource: "daily_rpt",
    sorters: [
      {
        field: "date",
        order: "desc",
      },
    ],
    liveMode: "auto",
  });

  const { queryResult: epochRpt } = useSelect({
    resource: "epoch_rpt",
    sorters: [
      {
        field: "epoch",
        order: "desc",
      },
    ],
    liveMode: "auto",
  })

  const { queryResult: lastEpochStatsRpt } = useSelect({
    resource: 'last_epoch_stats_rpt',
    liveMode: "auto"
  })

  const SelectedChartChange = (chartType: number) =>  {
    setSelectedChart(chartType);
  }

  const stats = data.map((stat, index) => {
    // const DiffIcon = stat.diff > 0 ? ArrowOutwardIcon : SouthEastIcon;

    return (
      <>
        {
          index !== 8 ?
          <Grid className="px-2" item xs={6} lg={4} xl={4}>
            <Paper className={`${classes.dashboardCards}`} withBorder p="md" radius="md" key={stat.title}>
              <Icon className={`${classes.absoluteIcon} lg:text-[164px] text-[120px] lg:top-0 bottom-0 right-0 z-0`} icon={stat.icon} />
              <section className="flex flex-col justify-between relative h-full z-10">
                <Group align="center" sx={{ justifyContent: "start" }}>
                  <Text size="xs" c="dimmed" className={`${classes.title} lg:text-lg text-sm ml-black-text font-poppins`}>
                    { stat.title}
                  </Text>
                  {/* <Icon
                className={classes.icon}
                component={icons[stat.icon]}
                sx={{ fontSize: "1.4rem", stroke: "blue" }}
              /> */}

                </Group>
                  <Group
                    spacing="xs"
                    mt={25}
                    sx={{ justifyContent: "start" }}
                  >
                      <Text size={25} className={`${classes.value} text-wrap lg:text-5xl sm:text-2xl md:text-3xl text-2xl font-bold font-poppins`}>
                        {poolStats?.data?.data[0][stat.key]
                          ? numberWithCommas(poolStats?.data?.data[0][stat.key])
                          : "N/A"}
                      </Text>
                  </Group>
              </section>
              {/* <Text fz="xs" c="dimmed" mt={7}>
              Compared to previous month
            </Text> */}
            </Paper>
           </Grid> :
          <Grid className="px-2" item xs={12} md={6} lg={4} xl={4}>
            <Paper className={`${classes.dashboardCards}`} withBorder p="md" radius="md" key={stat.title}>
              <Icon className={`${classes.absoluteIcon} lg:text-[164px] text-[120px] lg:top-0 bottom-0 right-0 z-0`} icon={stat.icon} />
              <section className="flex flex-col justify-between relative h-full z-10">
                <Group align="center" sx={{ justifyContent: "start" }}>
                  <Text size="xs" c="dimmed" className={`${classes.title} lg:text-lg text-sm ml-black-text font-poppins`}>
                    { stat.title}
                  </Text>
                  {/* <Icon
                className={classes.icon}
                component={icons[stat.icon]}
                sx={{ fontSize: "1.4rem", stroke: "blue" }}
              /> */}

                </Group>
                <Group
                  spacing="xs"
                  mt={25}
                  sx={{ justifyContent: "start" }}
                >
                  <Text size={25} className={`${classes.value} text-wrap lg:text-5xl sm:text-2xl md:text-3xl text-2xl font-bold font-poppins`}>
                    {lastEpochStatsRpt.data?.data[0]
                      ? `${numberWithCommas(lastEpochStatsRpt.data?.data[0].last_epoch_total_qubic)}` 
                      : "N/A"}
                  </Text>
                </Group>
              </section>
              {/* <Text fz="xs" c="dimmed" mt={7}>
              Compared to previous month
            </Text> */}
            </Paper>
          </Grid>
        }
      </>
    );
  });

  const renderTickOverview = (listing: any) => {
    return (
      <Card className={`${classes.infoCard} shadow-lg`}>
        <CardContent className="flex flex-col justify-center h-full">
          <CListing
            listing={listing}
            data={tickOverview?.data?.data[0]}
          ></CListing>
        </CardContent>
      </Card>
    );
  };

  const refershButtonClick = () => {

    tickOverview.isLoading ? null : tickOverview?.refetch();
    poolStats.isLoading ? null : poolStats?.refetch();
    hourlySol.isLoading ? null : hourlySol?.refetch();
    dailyRpt.isLoading ? null : dailyRpt?.refetch();
    epochRpt.isLoading ? null : epochRpt?.refetch();
    lastEpochStatsRpt.isLoading ? null : lastEpochStatsRpt?.refetch();

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  return (
    <Container maxWidth="xl">
      <div className={`${classes.root} p-2 relative`}>
        {/* <img
          src="/assets/backgrounds/blurred.png"
          className="absolute left-0 top-0 w-full h-[1800px]"
          alt="bg-image"
        /> */}
        <div>
          {isLoading && (
            <LinearProgress style={{ position: 'fixed', top: "35px", width: '100%', zIndex: 1000 }} />
          )}
        </div>

        <Flex
          justify={"space-between"}
          align={"center"}
          sx={customThemes.pb1em}
          className="mx-3"
        >
          <h1 className="primary font-poppins font-medium text-[22px] pb-2" >{"Pool Information"}</h1>

          <RefreshButton
            resource="payout"
            hideText
            onClick={refershButtonClick}
            className="primary"
          />
        </Flex>

        {/* <SimpleGrid
        cols={4}
        breakpoints={[
          { maxWidth: "sm", cols: 2 },
          { maxWidth: "md", cols: 4 },
          { maxWidth: "lg", cols: 4 },
        ]}
      > */}
        <Grid container >
          {stats}
        </Grid>
        {/* </SimpleGrid>      */}
        <br />
        <Flex
          justify={"space-between"}
          align={"center"}
          wrap={"wrap"}
          sx={customThemes.pb1em}
          className="mx-3"
        >
          <h2 className="primary font-medium pb-5 text-[22px] mx-3" >{"Pool hashrate"}</h2>
        </Flex>
        <Grid className="block 2xl:flex">
          <Grid>
            <Flex
            direction={"column"}
            justify={"space-between"}
            align={"center"}
            sx={customThemes.pb1em}
            className="mx-3"
            >
              <SelectChartButton sx={{background: "linear-gradient(180deg, #86cee4 0%, #265b67 100%)", color: "black"}}>Hourly Rpt</SelectChartButton>
            </Flex>
            <Flex
              justify={"space-between"}
              align={"center"}
              className="mx-3"
            >
              {
                isLoading ?
                <Spin /> :
                <HourlySol data={hourlySol?.data?.data}/>
              }
            </Flex>
          </Grid>
          <Grid>
            <Flex
              direction={"column"}
              justify={"space-between"}
              align={"center"}
              className="mx-3"
            >
              <SelectChartButtonGroup
                SelectedChartChange={SelectedChartChange}
                selectedChart={selectedChart}
              />
            </Flex>
            <Flex
              justify={"center"}
              align={"center"}
              className="mx-3"
            >
              { selectedChart === 2 && (isLoading ? <Spin /> : <PoolStats data={dailyRpt?.data?.data} />) }
              { (selectedChart === 3 || selectedChart === 4 )&& (isLoading ? <Spin /> : <EpochRpt data={epochRpt?.data?.data} selectedChart={selectedChart} />) }
            </Flex>
          </Grid>
        </Grid>
        <br />
        <h2 className="primary font-medium pb-5 text-[22px] mx-3" >{"Qubic Information"}</h2>
        <SimpleGrid
          cols={3}
          breakpoints={[
            { maxWidth: "sm", cols: 1 },
            { maxWidth: "md", cols: 3 },
            { maxWidth: "lg", cols: 3 },
          ]}
        >
          {renderTickOverview(listing1)}

          {/* <HourlySol /> */}

          {renderTickOverview(listing2)}
          {renderTickOverview(listing3)}
        </SimpleGrid>
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
};
