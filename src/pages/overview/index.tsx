import { IResourceComponentsProps } from "@refinedev/core";
import { FaRegUserCircle } from "react-icons/fa";
import { IoMdLogIn } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import {
  Box,
  Stack,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  Container,
} from "@mui/material";
import customThemes from "../../theme";
import React from "react";
import "./style.scss";
import { Icon } from "@iconify/react";
import GlobalButton from "../../components/custom/Button";
import MinerLabLogo from "../../components/MinerLabLogo";

const overviewContent = [
  {
    title: "Resource Pooling: ",
    icon: "grommet-icons:resources",
    iconPositon: "left",
    content: [
      "Contribute significant hashing power to the collaborative pool. Ensuring lower risk and more consistent results due to the shared power. You can increase the chances of regularly solving AI models and earning scores through collaborative efforts, leading to a more stable and lucrative income stream.",
      <>
        <br />
      </>,
    ],
  },
  {
    title: "Solution Validation: ",
    icon: "carbon:idea",
    iconPositon: "right",
    content: [
      "When a miner successfully finds a solution, it is submitted to the pool for validation. Then, the solution is written on the blockchain under one of the pool ID's.",
      <>
        <br />
      </>,
    ],
  },
  // {
  //   title: "How to mine:",
  //   content: [
  //     "1.  Create an account on the website",
  //     "2.  If you've not used your workers to mine Qubic before, use the first command.",
  //     "3.  If you are switching from a different pool, use the second command.",
  //     "4.  If you are using HiveOS, follow the instructions on the profile page.",
  //     <>
  //       <br />
  //     </>,
  //   ],
  // },
  // {
  //   title: "Current miner: Cuda and CPU only",
  //   content: [
  //     "*OpenCL is currently not supported*",
  //     <>
  //       <br />
  //     </>,
  //   ],
  // },
  // {
  //   title:
  //     "For any questions, please join us on Discord; we will assist you there.",
  // },
];

const overviewContent2 = [
  {
    title: [
      "In the operation offered at Pool Solution, the introduction of fees is a standard practice aimed at sustaining the pool's infrastructure, covering operational costs, and ensuring its long-term viability. These fees are typically deducted from the rewards earned by miners and contribute to the maintenance, development, and improvements on the service.",
      <>
        <br />
      </>,
      <>
        {" "}
        <br />
      </>,
      "There are two types of services offered:",
      <>
        <br />
      </>,
      <>
        <br />
      </>,
    ],
  },
  {
    title: [
      "1) ",
      <Typography className="primary" gutterBottom variant="blueText">
        Solo
      </Typography>,
      " Assigning an ID to a miner who would want to attempt to qualify his own ID. When and after qualified, an ID will reward the miner 1.479b $Qubic. The fee deducted by the pool for maintaining the infrastructure will be 179m. The remaining Amount will be paid directly to the miner ",
      <Typography className="primary" gutterBottom variant="blueText">
        a week after successful
      </Typography>,
      " qualification. Solo miners should be aware that they must have the right amount of stated computing power before joining the pool.",
      <>
        <br />
      </>,
      <>
        <br />
      </>,
    ],
  },
  // {
  //   title: [
  //     "Solo miners should be aware that they must have the right amount of stated computing power before joining the pool.",
  //     "An additional ID will be allocated to miners to share. The rewards will be calculated based on the epoch avg. score with a 10% bonus applied.",
  //     <><br/></>,
  //     <><br/></>,
  //   ]
  // },
  {
    title: [
      "2) ",
      <Typography className="primary" gutterBottom variant="blueText">
        Pooling
      </Typography>,
      " An additional ID will be allocated for smaller miners to share. The rewards will be calculated based on the epoch avg. score +6%. In which the solution count of each miner will be paid in percent of contribution from the ID revenue. The pool miners will be paid by solutions that they found. The maximum value per ID to be obtained is ",
      <Typography className="primary" gutterBottom variant="blueText">
        1,300,000,000
      </Typography>,
      ". The payments for new miners will be distributed a week after their completion of the first epoch. On high revenue weeks, the pool will reward a bonus to all miners in which the maximum value per ID obtained will be ",
      <Typography gutterBottom className="primary" variant="blueText">
        1,330,000,000
      </Typography>,
      ". The payments for new miners will be distributed a week after their completion of the first epoch.",
    ],
  },
  {
    title: [
      <Typography gutterBottom className="primary" variant="blueText">
        <br></br>**Due to the Qubic revenue payment system, initial payments may
        be delayed for new miners as more ID's are qualifying in the network.
        All these payments will be paid to the miners whom contributed after
        their successful qualification week and may receive bonuses for the
        outstanding week in the next epoch. If miners leave before the end of an
        epoch, penalties could be applied as the pool might suffer from
        disqualification of IDs, which will greatly affect the revenue**
      </Typography>,
    ],
  },
  {
    title: [
      <Typography gutterBottom variant="fontM">
        <br></br>**All payments are made on Wednesday after the Epoch
        transitions. (4 PM UTC)**<br></br>
      </Typography>,
    ],
  },
];

export const Overview: React.FC<IResourceComponentsProps> = () => {
  const navigate = useNavigate();
  return (
    <Container maxWidth="xl">
      <Box className="ql-overview-page">
        <section className="relative z-20">
          <Grid className="max-w-[1400px]" container>
            <Grid item xs={12} md={4}>
              {/* <Typography
                    className="flex flex-col mx-auto max-w-[260px]"
                    variant="fontL"
                    gutterBottom
                  >
                    <span className="text-[16px]">Powered by</span>
                    <span className="primary text-right text-[26px]">
                      Minerlab.io
                    </span>
                  </Typography>
                  <div style={customThemes.overflowImg}></div> */}
              <div className="lg:self-end qubic-lab-logo">
                <a href="https://minerlab.io" className="mx-auto">
                  <MinerLabLogo size="206px" />
                </a>
              </div>
            </Grid>
            <Grid item xs={12} md={8}>
              <section className="max-w-[760px] text-lg lg:ml-10">
                <p className="mb-5">
                  Large-scale miners often seek collaborative solutions to
                  optimize their operations and enhance profitability in
                  cryptocurrency mining. This overview explores the dynamics of
                  business-to-business collaboration within crypto mining pools
                  tailored for large miners.
                </p>

                <p>
                  A collaborative mining pool is a specialized group where
                  large-scale miners join forces to combine their substantial
                  computational power. This synergy allows them to efficiently
                  mine Qubic by collectively acquiring solutions to secure ID
                  revenues.
                </p>
                <br />

                <div className="font-medium flex lg:flex-row flex-col lg:flex-nowrap flex-wrap items-center lg:justify-start justify-center max-w-[700px]">
                  <Link to="/register">
                    <GlobalButton
                      width="203px"
                      height="52px"
                      className="primary my-2"
                      text="Sign Up Here"
                    />
                  </Link>

                  <span className="mx-6">Or</span>

                  <Link to="/login">
                    <GlobalButton
                      width="150px"
                      height="52px"
                      className="primary my-2"
                      text="Login Here"
                    />
                  </Link>

                  <span className="mx-6 ">to get started!</span>
                </div>
              </section>
            </Grid>
          </Grid>

          <Grid className="mt-10 max-w-[1400px]" container>
            <Grid item xs={12} md={12}>
              {overviewContent.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <div className="flex lg:flex-nowrap flex-wrap items-center justify-center">
                      {item?.icon && item?.iconPositon === "left" ? (
                        <div className="w-[230px]">
                          <Icon
                            icon={item.icon}
                            className="primary font-thin text-[230px]"
                          />
                        </div>
                      ) : null}

                      <div className="max-w-[926px] ml-6">
                        <Typography
                          sx={{ fontSize: 22, fontWeight: "600" }}
                          className="primary"
                          variant="fontL"
                          gutterBottom
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="fontM"
                          component={"p"}
                        >
                          {item?.content
                            ? item.content.map((content, index) => {
                                return (
                                  <Typography
                                    key={index}
                                    gutterBottom
                                    variant="fontM"
                                    component={"p"}
                                    sx={{ fontSize: 18, marginTop: 2 }}
                                  >
                                    {content}
                                  </Typography>
                                );
                              })
                            : null}
                        </Typography>
                        {
                          // last item no need to add <br />
                          index !== overviewContent2.length - 1 && <></>
                        }
                      </div>

                      {item?.icon && item?.iconPositon === "right" ? (
                        <div className="w-[230px]">
                          <Icon
                            icon={item.icon}
                            className="primary font-thin text-[230px]"
                          />
                        </div>
                      ) : null}
                    </div>
                  </React.Fragment>
                );
              })}

              <React.Fragment>
                <div className="flex justify-center items-center max-w-[1400px]">
                  <div className="max-w-[926px] flex flex-col items-center justify-center ml-6">
                    <h1 className="primary text-[36px] font-semibold mb-5 w-full text-center">
                      How to mine
                    </h1>

                    <ol className="text-lg font-medium overview-ol-list">
                      <li>
                        <span>Create an account on the website</span>
                      </li>
                      <li>
                        <span>
                          If you've not used your workers to mine Qubic before,
                          use the first command.
                        </span>
                      </li>
                      <li>
                        <span>
                          If you are switching from a different pool, use the
                          second command.
                        </span>
                      </li>

                      <li>
                        <span>
                          If you are using HiveOS, follow the instructions on
                          the profile page.
                        </span>
                      </li>
                    </ol>
                  </div>
                </div>
              </React.Fragment>
            </Grid>
          </Grid>
        </section>
      </Box>

      {/* make two col responsive with material UI */}
      <Box className="my-10 mx-5 max-w-[1400px]">
        <Grid container>
          <Grid item xs={12} md={4} lg={4} xl={4}>
            <img
              className="h-[471px] object-contain"
              src="/assets/vectorArts/Frame.png"
              alt="faq-image"
            />
          </Grid>
          <Grid
            className="flex flex-wrap items-center "
            item
            xs={12}
            md={8}
            lg={8}
            xl={8}
          >
            <h2 className="lg:text-[42px] text-sm tracking-wide lg:leading-10 text-wrap">
              <span className="primary font-semibold lg:text-[61px] text-lg lg:mr-2">
                For any questions
              </span>
              <span className="text-[22px] text-lg lg:mx-3 mx-1">please</span>
              <span>join us on Discord</span>
              <span className="text-[22px] text-lg lg:mx-3 mx-1">we will</span>
              assist you there.
            </h2>
          </Grid>
        </Grid>
      </Box>

      <Box className="relative my-10 ql-overview-page max-w-[1400px]">
        {/* <img
          src="/assets/backgrounds/blurred.png"
          className="absolute left-0 top-0 w-full z-10 lg:h-full h-[1550px]"
          alt="bg-image"
        /> */}
        <div className="z-20">
          <Grid container>
            <Grid item xs={12} md={12}>
              {overviewContent2.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <p className="text-lg">{item.title}</p>

                    {
                      // last item no need to add <br />
                      index !== overviewContent2.length - 1 && <></>
                    }
                  </React.Fragment>
                );
              })}
            </Grid>
          </Grid>
        </div>
      </Box>
    </Container>
  );
};
