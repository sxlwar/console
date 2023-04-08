const theme = {
  palette: {
    primary: {
      light: "#073052",
      main: "#081C42",
      dark: "#05122B",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
    grey: {
      100: "#f0f0f0",
      200: "#e6e6e6",
      300: "#cccccc",
      400: "#999999",
      500: "#8c8c8c",
      600: "#737373",
      700: "#666666",
      800: "#4d4d4d",
      900: "#333333",
    },
    background: {
      default: "#fff",
    },
    success: {
      main: "#4ccb92",
    },
    warning: {
      main: "#FFBD62",
    },
    error: {
      light: "#e03a48",
      main: "#C83B51",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","),
    h1: {
      fontWeight: "bold",
      color: "#081C42",
    },
    h2: {
      fontWeight: "bold",
      color: "#081C42",
    },
    h3: {
      fontWeight: "bold",
      color: "#081C42",
    },
    h4: {
      fontWeight: "bold",
      color: "#081C42",
    },
    h5: {
      fontWeight: "bold",
      color: "#081C42",
    },
    h6: {
      fontWeight: "bold",
      color: "#000000",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 3,
          height: 40,
          padding: "0 20px",
          fontSize: 14,
          fontWeight: 600,
          boxShadow: "none",
          "& .min-icon": {
            maxHeight: 18,
          },
          "&.MuiButton-contained.Mui-disabled": {
            backgroundColor: "#EAEDEE",
            fontWeight: 600,
            color: "#767676",
          },
          "& .MuiButton-iconSizeMedium > *:first-of-type": {
            fontSize: 12,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        elevation1: {
          boxShadow: "none",
          border: "#EAEDEE 1px solid",
          borderRadius: 3,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          "&.MuiListItem-root.Mui-selected": {
            background: "inherit",
            "& .MuiTypography-root": {
              fontWeight: "bold",
            },
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
  colors: {
    link: "#2781B0",
  },
};

interface Colors {
  link: string;
}

interface Components {
  MuiButton: MuiButton;
  MuiPaper: MuiPaper;
  MuiListItem: MuiListItem;
  MuiTab: MuiTab;
}

interface MuiTab {
  styleOverrides: StyleOverrides4;
}

interface StyleOverrides4 {
  root: Root3;
}

interface Root3 {
  textTransform: string;
}

interface MuiListItem {
  styleOverrides: StyleOverrides3;
}

interface StyleOverrides3 {
  root: Root2;
}

interface Root2 {
  "&.MuiListItem-root.Mui-selected": MuiListItemrootMuiselected;
}

interface MuiListItemrootMuiselected {
  background: string;
  "& .MuiTypography-root": MuiTypographyroot;
}

interface MuiTypographyroot {
  fontWeight: string;
}

interface MuiPaper {
  styleOverrides: StyleOverrides2;
}

interface StyleOverrides2 {
  elevation1: Elevation1;
}

interface Elevation1 {
  boxShadow: string;
  border: string;
  borderRadius: number;
}

interface MuiButton {
  styleOverrides: StyleOverrides;
}

interface StyleOverrides {
  root: Root;
}

interface Root {
  textTransform: string;
  borderRadius: number;
  height: number;
  padding: string;
  fontSize: number;
  fontWeight: number;
  boxShadow: string;
  "& .min-icon": Minicon;
  "&.MuiButton-contained.Mui-disabled": MuiButtoncontainedMuidisabled;
  "& .MuiButton-iconSizeMedium > *:first-of-type": MuiButtoniconSizeMediumfirstoftype;
}

interface MuiButtoniconSizeMediumfirstoftype {
  fontSize: number;
}

interface MuiButtoncontainedMuidisabled {
  backgroundColor: string;
  fontWeight: number;
  color: string;
}

interface Minicon {
  maxHeight: number;
}

interface Typography {
  fontFamily: string;
  h1: H1;
  h2: H1;
  h3: H1;
  h4: H1;
  h5: H1;
  h6: H1;
}

interface H1 {
  fontWeight: string;
  color: string;
}

interface Palette {
  primary: Primary;
  secondary: Primary;
  grey: Grey;
  background: Background;
  success: Success;
  warning: Success;
  error: Error;
}

interface Error {
  light: string;
  main: string;
  contrastText: string;
}

interface Success {
  main: string;
}

interface Background {
  default: string;
}

interface Grey {
  "100": string;
  "200": string;
  "300": string;
  "400": string;
  "500": string;
  "600": string;
  "700": string;
  "800": string;
  "900": string;
}

interface Primary {
  light: string;
  main: string;
  dark: string;
  contrastText: string;
}

export interface Theme {
  palette: Palette;
  typography: Typography;
  components: Components;
  colors: Colors;
}

// allow configuration using `createTheme`
export interface ThemeOptions {
  colors?: {
    link?: string;
  };
}

declare module "@mui/material/styles" {
  export interface Theme {
    colors?: {
      link?: string;
    };
  }

  export interface ThemeOptions {
    colors?: {
      link?: string;
    };
  }
}

export default theme;
