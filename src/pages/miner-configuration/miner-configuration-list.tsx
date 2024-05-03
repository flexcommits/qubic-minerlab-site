import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Container,
} from "@mui/material";
import {
  IResourceComponentsProps,
  useGetIdentity,
  useSelect,
} from "@refinedev/core";
import { CListing } from "../../components/custom/cListing";
import customThemes from "../../theme";
import { MinerConfigBox } from "../../components/custom/miner-config-box";
import { SolutionsViewList } from "../solutions-view/solutions-view-list";
import { useEffect } from "react";
import { getUserName } from "../../helper/help";
import { listing1, listing2, listing3 } from "../../helper/common";
import MinerLabLogo from "../../components/MinerLabLogo";
import StatsCard from "../../components/StatsCard";
import "./style.scss";
import { SolutionsViewListTable } from "../solutions-view/solutions-view-list-table";
import { MachineSolutionsViewList } from "../solutions-view/machine-solutions-view-list";

export const MinerConfigurationList: React.FC<
  IResourceComponentsProps
> = () => {
  const userName = getUserName();
  const { data: identity }: any = useGetIdentity();
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

  useEffect(() => {
    console.log("scoreView", scoreView);
  }, [tickOverview.isLoading]);

  const { queryResult: totalSolSum } = useSelect({
    resource: `rpc/get_total_sol_v2?uname=${identity?.username
      ? identity?.username
      : "changed-xxxx-xxxx-xxxx-xxxx-xxxx"
      }`,
    liveMode: "auto",
  });

  const { queryResult: totalItsSum } = useSelect({
    resource: `rpc/get_current_its_v2?username=${identity?.username
      ? identity?.username
      : "changed-xxxx-xxxx-xxxx-xxxx-xxxx"
      }`,
    liveMode: "auto",
  });

  const { queryResult: scoreView } = useSelect({
    resource: "score_view",
    liveMode: "auto",
    filters: [
      {
        field: "identity",
        operator: "eq",
        value: identity?.miningId,
      },
    ],
  });
  const { queryResult: activeMiners } = useSelect({
    resource: `rpc/get_miner_records_active_count_v2?miner_param=${identity?.username
      ? identity?.username
      : "changed-xxxx-xxxx-xxxx-xxxx-xxxx"
      }`,
    liveMode: "auto",
  });
  const { queryResult: inActiveMiners } = useSelect({
    resource: `rpc/get_miner_records_inactive_count_v2?miner_param=${identity?.username
      ? identity?.username
      : "changed-xxxx-xxxx-xxxx-xxxx-xxxx"
      }`,
    liveMode: "auto",
  });

  const refreshCallback = () => {
    tickOverview.isLoading ? null : tickOverview?.refetch();
    totalSolSum.isLoading ? null : totalSolSum?.refetch();
    totalItsSum.isLoading ? null : totalItsSum?.refetch();
    scoreView.isLoading ? null : scoreView?.refetch();
    activeMiners.isLoading ? null : activeMiners?.refetch();
    inActiveMiners.isLoading ? null : inActiveMiners?.refetch();
  };

  return (
    <Container maxWidth="xl">
      <div className="py-5">
        <Card className="ql-blured-bg min-h-[206px] flex lg:flex-row flex-col-reverse lg:flex-nowrap flex-wrap items-center justify-between">
          <CardContent className="w-full">
            <StatsCard
              heading="Network Analysis"
              containerClass="relative lg:right-0 right-2"
              icon="streamline:money-graph-analytics-business-product-graph-data-chart-analysis"
              subHeadings={[
                {
                  name: "No. Of Ticks",
                  value: tickOverview?.data?.data[0]?.numberOfTicks,
                },
                {
                  name: "No. Of Empty Ticks",
                  value: tickOverview?.data?.data[0]?.numberOfEmptyTicks,
                },
                {
                  name: "No. Of Entities",
                  value: tickOverview?.data?.data[0]?.numberOfEntities,
                },
              ]}
            />
            {/* <CListing
            listing={listing1}
            data={tickOverview?.data?.data[0]}
          ></CListing> */}
          </CardContent>
          <div className="lg:self-end qubic-lab-logo">
            <a href="https://minerlab.io" className="mx-auto">
              <MinerLabLogo size="206px" />
            </a>
          </div>
        </Card>
        <Grid container spacing={1} sx={customThemes.mt0}>
          <Grid item xs={12} md={6}>
            <Card className="ql-blured-bg min-h-[206px] ">
              <CardContent className="relative">
                {/* <CListing
                listing={listing2}
                data={tickOverview?.data?.data[0]}
              ></CListing> */}
                <StatsCard
                  heading="Network Details"
                  containerClass="relative lg:right-0 right-2"
                  icon="fluent:apps-list-detail-20-regular"
                  subHeadings={[
                    {
                      name: "Supply",
                      value: tickOverview?.data?.data[0]?.supply,
                    },
                    {
                      name: "Price",
                      value: tickOverview?.data?.data[0]?.price,
                    },
                    {
                      name: "Capitalization",
                      value: tickOverview?.data?.data[0]?.marketCapitalization,
                    },
                  ]}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <div className="ql-blured-bg min-h-[206px] ">
              <StatsCard
                heading="Score Analysis"
                containerClass="relative lg:right-0 right-2"
                icon="material-symbols-light:sleep-score-outline-rounded"
                subHeadings={[
                  {
                    name: "Min Score",
                    value: tickOverview?.data?.data[0]?.minScore,
                  },
                  {
                    name: "Max Score",
                    value: tickOverview?.data?.data[0]?.maxScore,
                  },
                  {
                    name: "Average Score",
                    value: tickOverview?.data?.data[0]?.averageScore,
                  },
                ]}
              />
              {/* <CListing
                listing={listing3}
                data={tickOverview?.data?.data[0]}
              ></CListing> */}
            </div>
          </Grid>
        </Grid>
        <Box sx={customThemes.cardStyle}>
          <MachineSolutionsViewList
            identity={identity}
            refreshCallback={refreshCallback}
          />
        </Box>
        <div className="my-5">
          <MinerConfigBox
            identity={identity}
            totalSolSum={totalSolSum}
            totalItsSum={totalItsSum}
            scoreView={scoreView}
            activeMiners={activeMiners}
            inActiveMiners={inActiveMiners}
          />
        </div>

        {identity ? (
          <>
            <Box sx={customThemes.cardStyle}>
              <SolutionsViewList
                identity={identity}
                refreshCallback={refreshCallback}
              />
              <div className="my-5">
                <MinerConfigBox
                  identity={identity}
                  totalSolSum={totalSolSum}
                  totalItsSum={totalItsSum}
                  scoreView={scoreView}
                  activeMiners={activeMiners}
                  inActiveMiners={inActiveMiners}
                />
              </div>
            </Box>
            <Box sx={customThemes.cardStyle}>
              <SolutionsViewListTable
                identity={identity}
                refreshCallback={refreshCallback}
              />
            </Box>
          </>
        ) : null}
      </div>
    </Container>
  );
};
