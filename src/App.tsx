import { Authenticated, Refine, useTranslate } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { Typography } from "@mui/material";

import {
  ErrorComponent,
  notificationProvider,
  RefineSnackbarProvider,
  ThemedTitleV2,
} from "@refinedev/mui";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import InfoIcon from "@mui/icons-material/Info";
import PaidIcon from "@mui/icons-material/Paid";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import CalculateIcon from '@mui/icons-material/Calculate';


import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { liveProvider } from "@refinedev/supabase";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import authProvider from "./authProvider";
import { Header } from "./components/header";
import { AuthPage } from "./components/custom/auth-page";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { supabaseClient } from "./utility";
import { Overview } from "./pages/overview";
import { Profile } from "./pages/profile";
import { Calculator } from "./pages/calculator";
import { Dash } from "./pages/dashboard";
import { MinerConfigurationList, MinerStats } from "./pages/miner-configuration";
import { ThemedLayoutV2 } from "./components/layout";
import { PayoutList } from "./pages/payout";
import { Box, SvgIcon } from "@mui/material";
import { ThemedSiderV2 } from "./components/slider";
import generateDefaultDocumentTitle from "./helper/generate-default-document-title";
import { Settings } from "./pages/settings/settings";
import { FavIconSvg } from "./components/favIcon";
import { ConfigProvider, theme } from "antd";
import { EpochRecordsList } from "./pages/epoch-records/list";

import { dataProvider } from "./dataProvider";
import { HourglassOutlined } from "@ant-design/icons";
import { Icon } from '@iconify/react';

// Import Styles
import "./app.scss"
import "./index.css"
import ReferralSystem from "./pages/referral-system/referral-system";
import { display } from "@mui/system";

function App() {
  const translate = useTranslate();
  const customTitleHandler = (prop: any) => {
    return generateDefaultDocumentTitle(
      translate,
      prop.resource,
      prop.action,
      prop.id,
      prop.resourceName
    );
  };
  const { darkAlgorithm } = theme;

  return (
    <BrowserRouter>
      {/* <GitHubBanner /> */}
      <RefineKbarProvider>
        <ConfigProvider
          theme={{
            algorithm: darkAlgorithm,
            components: {
              Table: {
                cellPaddingBlock: 0,
                cellPaddingInline: 3,
              },
            },
          }}
        >
          <ColorModeContextProvider>
            <CssBaseline />
            <GlobalStyles
              styles={{
                html: { WebkitFontSmoothing: "auto" },
                ".q-sidebar-list .MuiButtonBase-root .MuiTypography-root": {
                  fontSize: "16px",
                  fontFamily: "inherit",
                },
                ".updatePassword main.MuiContainer-root": {
                  minHeight: "calc(100vh - 128px)",
                },
                ".MuiDataGrid-root .MuiDataGrid-renderingZone": {
                  maxHeight: "none !important",
                },
                ".MuiDataGrid-root .MuiDataGrid-cell": {
                  lineHeight: "unset !important",
                  maxHeight: "none !important",
                  whiteSpace: "normal",
                  wordWrap: "break-word",
                },
                ".MuiDataGrid-root .MuiDataGrid-row": {
                  maxHeight: "none !important",
                },
                ".MuiPaper-root.MuiCard-root": {
                  boxShadow: "none",
                },
                ".MuiDataGrid-row.inactiveRow, .inactiveRow": {
                  backgroundColor: "#86cee4",
                },
                ".MuiDataGrid-row.inactiveRow, .hideInactiveRow": {
                  display: "none"
                },
                ".ant-table-wrapper .ant-table-tbody .ant-table-row >.ant-table-cell-row-hover": {
                  backgroundColor: "#519CAD !important",
                  color: "#fff !important",
                },
                ".ant-table-wrapper .ant-table-tbody .inactiveRow >.ant-table-cell-row-hover": {
                  backgroundColor: "#060912 !important",
                  color: "#fff !important",
                },
                ".ant-table-wrapper .ant-table-thead tr > .ant-table-cell":  {
                  color: "#060912",
                  backgroundColor: "#86cee4",
                  backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
                },
                ".ant-table-wrapper .ant-table-tbody .ant-table-row > .ant-table-cell":  {
                  backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
                  color: "#519CAD",
                },
                ".ant-table-wrapper .ant-table-tbody .ant-table-row:nth-child(odd) > .ant-table-cell":  {
                  backgroundColor: "#0b0913",
                },
                ".ant-table-wrapper .ant-table-tbody .ant-table-row:nth-child(even) > .ant-table-cell":  {
                  backgroundColor: "#050811",
                },
                ".MuiDataGrid-row.inactiveRow:hover,.MuiDataGrid-row.inactiveRow:focus, .inactiveRow:hover .ant-table-cell,.inactiveRow:focus .ant-table-cell, .inactiveRow .ant-table-column-sort,.inactiveRow .ant-table-cell-fix-left":
                  {
                    backgroundColor: "#86cee4 !important",
                    color: "#fff !important",
                  },
                  ".ant-table-wrapper .ant-table-tbody .inactiveRow>.ant-table-cell" : {
                  color: "#fff !important",
                  backgroundColor: "#86cee4 !important",
                  },
                ".apexcharts-toolbar": {
                  display: "none !important"
                },
                ".apexcharts-theme-black": {
                  backgroundColor: "#0b0913 !important",
                },
                ".apexcharts-xaxis": {
                  display: "none !important"
                },
                ".apexcharts-xaxistooltip-bottom" : {
                  display: "none !important"
                },
                "apexcharts-yaxistooltip-left": {
                  display: "none !important"
                },
                ".MuiChartsLegend-series": {
                  display: "none !important"
                }
              }}
            />
            <RefineSnackbarProvider>
              <DevtoolsProvider>
                <Refine
                  dataProvider={dataProvider(supabaseClient)}
                  liveProvider={liveProvider(supabaseClient)}
                  authProvider={authProvider}
                  routerProvider={routerBindings}
                  notificationProvider={notificationProvider}
                  resources={[
                    {
                      name: "Dashboard",
                      list: "/",
                      icon: <Icon className={`primary`} icon={'material-symbols:dashboard'} />,
                      meta: {
                        label: "Dashboard",
                        auth: false,
                      },
                    },
                    {
                      name: "Overview",
                      list: "/overview",
                      icon:  <Icon className={`primary`} icon={'ic:sharp-home'} />,
                      meta: {
                        label: "Overview",
                        auth: false,
                      },
                    },
                    {
                      name: "Profile",
                      list: "/profile",
                      icon: <Icon className={`primary`} icon={'ic-baseline-person'} />,
                      meta: {
                        label: "Profile",
                        auth: false,
                      },
                    },
                    // {
                    //   name: "Calculator",
                    //   list: "/calculator",
                    //   icon: <CalculateIcon />,
                    //   meta: {
                    //     label: "Profitability Calculator",
                    //     auth: true,
                    //   },
                    // },
                    {
                      name: "miner-configurations",
                      list: "/miner-configurations",
                      icon: <Icon className={`primary`} icon={'bx:stats'} />,
                      meta: {
                        label: "Miner Stats",
                      },
                    },
                    {
                      name: "Payout",
                      list: "/payout-records",
                      icon: <Icon className={`primary`} icon={'streamline:subscription-cashflow-solid'} />,
                      meta: {
                        label: "Payout Records",
                      },
                    },
                      
                    // {
                    //   name: "Epoch-records",
                    //   list: "/epoch-records",
                    //   icon: <Icon className={`primary`} icon={'basil:sand-watch-outline'} />,
                    //   meta: {
                    //     label: "Epoch Records",
                    //   },
                    // },
                    {
                      name: "Share",
                      list: "/referral-system",
                      icon: <Icon className={`primary`} icon={'material-symbols:share'} />,
                      meta: {
                        label: "Referral system",
                      },
                    },
                    {
                      name: "Settings",
                      list: "/settings",
                      icon: <Icon className={`primary`} icon={'material-symbols:settings'} />,
                      meta: {
                        label: "Settings",
                      },
                    },
                    // {
                    //   name: "update-password",
                    //   list: "/update-password",
                    //   icon: <PasswordIcon />,
                    // },
                    // {
                    //   name: "blog_posts",
                    //   list: "/blog-posts",
                    //   create: "/blog-posts/create",
                    //   edit: "/blog-posts/edit/:id",
                    //   show: "/blog-posts/show/:id",
                    //   meta: {
                    //     canDelete: true,
                    //   },
                    // },
                    // {
                    //   name: "categories",
                    //   list: "/categories",
                    //   create: "/categories/create",
                    //   edit: "/categories/edit/:id",
                    //   show: "/categories/show/:id",
                    //   meta: {
                    //     canDelete: true,
                    //   },
                    // },
                  ]}
                  options={{
                    syncWithLocation: true,
                    warnWhenUnsavedChanges: true,
                    useNewQueryKeys: true,
                    projectId: "01Y7YZ-JxLOBw-StVnKf",
                  }}
                >
                  <Routes>
                    <Route
                      element={
                        <ThemedLayoutV2
                          Header={() => <Header sticky />}
                          Sider={() => (
                            <ThemedSiderV2
                              Title={({ collapsed }) => (
                                <ThemedTitleV2
                                  // collapsed is a boolean value that indicates whether the <Sidebar> is collapsed or not
                                  collapsed={collapsed}
                                  text="Qubic Lab"
                                  icon={FavIconSvg}
                                />
                              )}
                            />
                          )}
                          Title={({ collapsed }) => (
                            <ThemedTitleV2
                              text="Qubic Lab"
                              collapsed={collapsed}
                            />
                          )}
                        >
                          <Outlet />
                        </ThemedLayoutV2>
                      }
                    >
                      <Route path="/" element={<Dash />} />
                      <Route path="overview" element={<Overview />} />
                      <Route path="/public/miner-stats/:pubId" element={<MinerStats />} />
                    </Route>
                    <Route
                      element={
                        <Authenticated
                          key="authenticated-inner"
                          fallback={<CatchAllNavigate to="/login" />}
                        >
                          <ThemedLayoutV2
                            Header={() => <Header sticky />}
                            Sider={() => (
                              <ThemedSiderV2
                                isAuth={true}
                                Title={({ collapsed }) => (
                                  <ThemedTitleV2
                                    // collapsed is a boolean value that indicates whether the <Sidebar> is collapsed or not
                                    collapsed={collapsed}
                                    text="Qubic Lab"
                                    icon={FavIconSvg}
                                  />
                                )}
                              />
                            )}
                            Title={({ collapsed }) => (
                              <ThemedTitleV2
                                // collapsed is a boolean value that indicates whether the <Sidebar> is collapsed or not
                                collapsed={collapsed}
                                text="Qubic Lab"
                                // icon={<FavIcon/>}
                              />
                            )}
                          >
                            <Outlet />
                          </ThemedLayoutV2>
                        </Authenticated>
                      }
                    >
                      {/* <Route path="/" element={<Overview />} />
                      <Route path="dashboard" element={<Dash />} /> */}
                      <Route path="profile" element={<Profile />} />

                      <Route path="calculator" element={<Calculator />} />

                      <Route path="miner-configurations">
                        <Route index element={<MinerConfigurationList />} />
                      </Route>

                      <Route path="payout-records">
                        <Route index element={<PayoutList />} />
                      </Route>

                      <Route path="epoch-records">
                        <Route index element={<EpochRecordsList />} />
                      </Route>
                      <Route path="referral-system">
                        <Route index element={<ReferralSystem />} />
                      </Route>
                      <Route
                        path="/update-password"
                        element={
                          <Box className="updatePassword">
                            <AuthPage
                              type="updatePassword"
                              title="Qubic Lab"
                            />
                          </Box>
                        }
                      />
                      <Route path="/settings" element={<Settings />} />
                      
                      {/* <Route
                      index
                      element={<NavigateToResource resource="blog_posts" />}
                    />
                    <Route path="/blog-posts">
                      <Route index element={<BlogPostList />} />
                      <Route path="create" element={<BlogPostCreate />} />
                      <Route path="edit/:id" element={<BlogPostEdit />} />
                      <Route path="show/:id" element={<BlogPostShow />} />
                    </Route> */}
                      {/* <Route path="/categories">
                      <Route index element={<CategoryList />} />
                      <Route path="create" element={<CategoryCreate />} />
                      <Route path="edit/:id" element={<CategoryEdit />} />
                      <Route path="show/:id" element={<CategoryShow />} />
                    </Route> */}
                      <Route path="*" element={<ErrorComponent />} />
                    </Route>
                    <Route
                      element={
                        <Authenticated
                          key="authenticated-outer"
                          fallback={<Outlet />}
                        >
                          <NavigateToResource />
                        </Authenticated>
                      }
                    >
                      <Route
                        path="/login"
                        element={
                          <AuthPage
                            type="login"
                            // formProps={{
                            //   defaultValues: {
                            //     email: "",
                            //     password: "",
                            //   },
                            // }}
                            title="Qubic Lab"
                          />
                        }
                      />
                      <Route
                        path="/register"
                        element={
                          <AuthPage type="register" title="Qubic Lab" />
                        }
                      />
                      <Route
                        path="/forgot-password"
                        element={
                          <AuthPage
                            type="forgotPassword"
                            title="Qubic Lab"
                          />
                        }
                      />
                    </Route>
                  </Routes>
                  <RefineKbar />
                  <UnsavedChangesNotifier />
                  <DocumentTitleHandler handler={customTitleHandler} />
                </Refine>
                <DevtoolsPanel />
              </DevtoolsProvider>
            </RefineSnackbarProvider>
          </ColorModeContextProvider>
        </ConfigProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
