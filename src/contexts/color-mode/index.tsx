import { MantineProvider } from "@mantine/core";
import { Theme, ThemeProvider, createTheme } from "@mui/material/styles";
import { RefineThemes } from "@refinedev/mui";
import { DarkTheme as MantineRefineThemes } from "@refinedev/mantine";
import React, {
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";

type ColorModeContextType = {
  mode: string;
  setMode: () => void;
};

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    h1Bold: true;
    blueText: true;
    goldenText: true;
    redText: true;
    fontS: true;
    fontM: true;
    fontL: true;
  }
}
export const ColorModeContext = createContext<ColorModeContextType>(
  {} as ColorModeContextType
);

export const ColorModeContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const colorModeFromLocalStorage = localStorage.getItem("colorMode");
  const isSystemPreferenceDark = window?.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  const systemPreference = isSystemPreferenceDark ? "dark" : "dark";
  const [mode, setMode] = useState(
    colorModeFromLocalStorage || systemPreference
  );

  useEffect(() => {
    window.localStorage.setItem("colorMode", mode);
  }, [mode]);

  const setColorMode = () => {
    if (mode === "light") {
      setMode("dark");
    } else {
      setMode("dark");
    }
  };

  return (
    <ColorModeContext.Provider
      value={{
        setMode: setColorMode,
        mode,
      }}
    >
      <MantineProvider
        theme={MantineRefineThemes}
        withNormalizeCSS
        withGlobalStyles
      >
        <ThemeProvider
          // you can change the theme colors here. example: mode === "light" ? RefineThemes.Magenta : RefineThemes.MagentaDark
          theme={
            mode === "dark"
              ? {
                  ...RefineThemes.BlueDark,
                  typography: {
                    ...RefineThemes.BlueDark.typography,
                    blueText: {
                      color: "#03bafc", //'#3366ff'
                    },
                    goldenText: {
                      color: "#FFD700",
                    },
                    redText: {
                      color: "#ff0000",
                    },
                    fontS: {
                      fontSize: "14px",
                    },
                    fontM: {
                      fontSize: "14px",
                    },
                    fontL: {
                      fontSize: "18px",
                    },
                  } as Theme["typography"],
                  components: {
                    ...RefineThemes.BlueDark.components,
                    MuiCardActions: {
                      styleOverrides: {
                        root: {
                          "&": {
                            padding: "8px",
                          },
                        },
                      },
                    },
                    MuiInputBase: {
                      styleOverrides: {
                        root: {
                          "&": {
                            fontSize: "14px",
                          },
                          "& .MuiInputBase-input": {
                            padding: "5px 8px",
                          },
                        },
                      },
                    },
                    MuiGrid: {
                      styleOverrides: {
                        root: {
                          "& .MuiGrid-item": {
                            paddingTop: "8px",
                          },
                          "& .MuiGrid-item:not(:first-of-type)": {
                            paddingLeft: "8px",
                          },
                        },
                      },
                    },
                    MuiCardHeader: {
                      styleOverrides: {
                        root: {
                          "&": {
                            padding: "8px",
                          },
                        },
                      },
                    },
                    MuiCardContent: {
                      styleOverrides: {
                        root: {
                          "&": {
                            padding: "8px !important",
                          },
                        },
                      },
                    },
                    MuiFormLabel: {
                      styleOverrides: {
                        root: {
                          "&.MuiInputLabel-root": {
                            top: "-12px",
                          },
                          "&.MuiInputLabel-shrink": {
                            top: "0",
                            transform: "translate(12px, -9px) scale(0.75)",
                          },
                          "&.MuiInputLabel-root.Mui-focused": {
                            transform: "translate(12px, -9px) scale(0.75)",
                          },
                        },
                      },
                    },
                    MuiAvatar: {
                      styleOverrides: {
                        root: {
                          "&": {
                            width: "24px",
                            height: "24px",
                          },
                        },
                      },
                    },
                    MuiButtonBase: {
                      styleOverrides: {
                        root: {
                          "&": {
                            padding: "2px 8px",
                            fontSize: "12px",
                          },
                          "& .MuiTypography-root": {
                            fontSize: "12px",
                          },
                          "& .MuiButton-startIcon": {
                            marginRight: "4px",
                          },
                        },
                      },
                    },
                    MuiList: {
                      styleOverrides: {
                        root: {
                          "&:not(.q-sidebar-list)": {
                            minWidth: "150px",
                            paddingTop: "5px",
                            paddingBottom: "5px",
                          },
                          "&.q-sidebar-list .MuiListItemButton-root": {
                            padding: "8px 16px",
                          },
                        },
                      },
                    },
                  },
                }
              : RefineThemes.Blue
          }
        >
          {children}
        </ThemeProvider>
      </MantineProvider>
    </ColorModeContext.Provider>
  );
};
