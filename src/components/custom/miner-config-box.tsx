import { Box, Grid, Typography } from "@mui/material";
import { IResourceComponentsProps, useSelect } from "@refinedev/core";
import PropTypes from "prop-types";
import { sumBy } from "lodash";
import customThemes from "../../theme";
import { useEffect } from "react";
import "../../pages/miner-configuration/style.scss";
import classes from "./StatsGrid.module.css";
import { Flex, Group, Paper, SimpleGrid, Text } from "@mantine/core";
import { Icon } from "@iconify/react";
import MinerStatsCard from "./miner-stats-card";

// const text = {
//   t1: <><h2 className="primary ">Miners Information</h2></>,
//   t2: "Total Solutions",
//   t3: "Total It/s",
//   t4: "Score",
//   t5: "Active Miners",
//   t6: "InActive Miners",
// };

// export const MinerConfigBox: React.FC<MinerConfigBoxProps> = (props) => {
//   // console.log("MinerConfigBox props", props);
//   if (props.identity == undefined) return <></>;

  

//   const refreshCallback = () => {
    
//   }

//   // console.log("totalSolSum", totalSolSum);
//   // console.log("solutionView", solutionView);
//   // console.log("scoreView", scoreView);
//   // console.log("activeMiners", activeMiners);
//   // console.log("inActiveMiners", inActiveMiners);

//   const renderMinerConfigContent = (label: string, value: string) => {
//     return (
//       <>
//         <Typography
//           component={"span"}
//           variant="fontM"
//           sx={customThemes.blueText}
//         >
//           {label}
//         </Typography>
//         {": "}
//         <Typography component={"span"} variant="fontM" sx={{paddingRight:"10px"}}>{value || 'N/A'}</Typography>
//       </>
//     );
//   };

//   return (
//     <Box className="ql-blured-bg">
//       <Typography variant="fontL" component={"p"} gutterBottom>
//         {text.t1}
//       </Typography>
//       <Typography gutterBottom variant="fontL">        
//         {renderMinerConfigContent(
//           text.t2,
//           props.totalSolSum?.data !== undefined
//             ? props.totalSolSum?.data?.data[0]?.data.toString()
//             : "N/A"
//         )}
//         {renderMinerConfigContent(
//           text.t3,
//           props.totalItsSum?.data !== undefined
//             ? props.totalItsSum?.data?.data[0]?.data.toString()
//             : "N/A"
//         )}
//         {renderMinerConfigContent(
//           text.t4,
//           props.scoreView?.data !== undefined
//             ? props.scoreView?.data?.data[0]?.score
//             : "N/A"
//         )}        
//         {renderMinerConfigContent(
//           text.t5,
//           props.activeMiners?.data !== undefined
//             ? props.activeMiners?.data?.data[0]?.data.toString()
//             : "0"
//         )}
//         {renderMinerConfigContent(
//           text.t6,
//           props.inActiveMiners?.data !== undefined
//             ? props.inActiveMiners?.data?.data[0]?.data.toString()
//             : "0"
//         )}
//       </Typography>
//     </Box>
//   );
// };

const text = {
  t1: <><h2 className="primary ">Miners Information</h2></>,
  t2: "Active/Offline",
  t3: "Interrate",
  t4: "Solutions",
  t5: "Score",
};

export const MinerConfigBox: React.FC<MinerConfigBoxProps> = (props) => {
  // console.log("MinerConfigBox props", props);
  if (props.identity == undefined) return <></>;

  

  const refreshCallback = () => {
    
  }

  // console.log("totalSolSum", totalSolSum);
  // console.log("solutionView", solutionView);
  // console.log("scoreView", scoreView);
  // console.log("activeMiners", activeMiners);
  // console.log("inActiveMiners", inActiveMiners);

  const renderMinerConfigContent = (index:number, label: string, value: string) => {
    return (
      <>
        <div className={`${index%2?"bg-[#AEE7F4]":"bg-[#519CAD]"} p-3 h-[30px] rounded-xl flex items-center w-[200px] text-black mr-4 mt-4`}>
            <span className="mr-1">{label}:</span>
            <span>
                {value}
            </span>
        </div>
        {/* <Typography
          component={"span"}
          variant="fontM"
          sx={customThemes.blueText}
        >
          {label}
        </Typography>
        {": "}
        <Typography component={"span"} variant="fontM" sx={{paddingRight:"10px"}}>{value || 'N/A'}</Typography> */}
      </>
    );
  };

  return (
    <Box className="ql-blured-bg">
      <Typography variant="fontL" component={"p"} gutterBottom>
        {text.t1}
      </Typography>
      <Grid className="flex flex-wrap justify-center md:justify-start hidden sm:flex">        
        {renderMinerConfigContent(
          2,
          text.t2,
          props.activeMiners?.data !== undefined
            ? `${props.activeMiners?.data?.data[0]?.data.toString()}/${props.inActiveMiners?.data?.data[0]?.data.toString()}`
            : "0/0"
        )}
        {renderMinerConfigContent(
          3,
          text.t3,
          props.totalSolSum?.data !== undefined
            ? `${props.totalItsSum?.data?.data[0]?.data.toString()} it/s`
            : "N/A"
        )}
        {renderMinerConfigContent(
          4,
          text.t4,
          props.totalItsSum?.data !== undefined
            ? props.totalSolSum?.data?.data[0]?.data.toString()
            : "N/A"
        )}
        {renderMinerConfigContent(
          5,
          text.t5,
          props.scoreView?.data !== undefined
            ? props.scoreView?.data?.data[0]?.score
            : "N/A"
        )}  
      </Grid>
      <Grid className="block sm:hidden">
        <MinerStatsCard
          heading=""
          containerClass="relative lg:right-0 right-2"
          icon="material-symbols-light:network-node"
          subHeadings={[
            {
              name: text.t2,
              value: props.activeMiners?.data !== undefined
              ? `${props.activeMiners?.data?.data[0]?.data.toString()}/${props.inActiveMiners?.data?.data[0]?.data.toString()}`
              : "0/0"
            },
            {
              name: text.t3,
              value: props.totalSolSum?.data !== undefined
              ? `${props.totalItsSum?.data?.data[0]?.data.toString()} it/s`
              : "N/A"
            },
            {
              name: text.t4,
              value: props.totalItsSum?.data !== undefined
              ? props.totalSolSum?.data?.data[0]?.data.toString()
              : "N/A"
            },
            {
              name: text.t5,
              value: props.scoreView?.data !== undefined
              ? props.scoreView?.data?.data[0]?.score
              : "N/A"
            },
          ]}
        />
      </Grid>
    </Box>
  );
};

MinerConfigBox.propTypes = {
  identity: PropTypes.object,
  totalSolSum: PropTypes.object,
  totalItsSum: PropTypes.object,
  scoreView: PropTypes.object,
  activeMiners: PropTypes.object,
  inActiveMiners: PropTypes.object,  
};

export interface MinerConfigBoxProps
  extends Omit<IResourceComponentsProps, "title"> {
  identity: any;
  totalSolSum: any;
  totalItsSum: any;
  scoreView: any;
  activeMiners: any;
  inActiveMiners: any;
}

