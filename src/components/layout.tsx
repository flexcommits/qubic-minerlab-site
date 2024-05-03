import React from "react";


import Box from "@mui/material/Box";

import { ThemedLayoutContextProvider } from "@refinedev/mui";
import { ThemedSiderV2 as DefaultSider } from "@refinedev/mui";
import { ThemedHeaderV2 as DefaultHeader } from "@refinedev/mui";
import { RefineThemedLayoutV2Props } from "@refinedev/mui";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";


export const ThemedLayoutV2: React.FC<RefineThemedLayoutV2Props> = ({
    Sider,
    Header,
    Title,
    Footer,
    OffLayoutArea,
    children,
    initialSiderCollapsed,
}) => {
    const SiderToRender = Sider ?? DefaultSider;
    const HeaderToRender = Header ?? DefaultHeader;

    return (
        <ThemedLayoutContextProvider
            initialSiderCollapsed={initialSiderCollapsed}
        >
            <Box display="flex" flexDirection="row">
                <SiderToRender Title={Title} />
                <Box
                    sx={[
                        {
                            display: "flex",
                            flexDirection: "column",
                            flex: 1,
                            minHeight: "100vh",
                        },
                        { overflow: "auto" },
                        { overflow: "clip" },
                    ]}
                >
                    <HeaderToRender />
                    <Box
                        component="main"
                        sx={{
                            p: { xs: '8px', md: '8px', lg: '8px' },
                            flexGrow: 1,
                            bgcolor: "#050811",
                        }}
                    >
                        {children}
                    </Box>
                    {Footer && <Footer />}
                </Box>
                {OffLayoutArea && <OffLayoutArea />}
            </Box>
        </ThemedLayoutContextProvider>
    );
};
