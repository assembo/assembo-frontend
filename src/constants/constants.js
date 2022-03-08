import { createTheme } from '@material-ui/core/styles';

export const COLORARRAY = [
  "#5372A5",
  "#6984B1",
  "#7E95BC",
  "#94A7C7",
  "#A9B9D2",
  "#BFCADD",
  "#D4DCE9",
  "#EAEDF4",
  "#74CBC4",
  "#85D2CB",
  "#97D8D3",
  "#A8DFDA",
  "#B9E5E1",
  "#CBECE9",
  "#DCF2F0",
  "#EEF9F8",
  "#90A8C7",
  "#9EB3CE",
  "#ACBED5",
  "#BAC9DC",
  "#C7D3E3",
  "#D5DEEA",
  "#74CBC4",
  "#85D2CB",
  "#97D8D3",
  "#A8DFDA",
  "#B9E5E1",
  "#CBECE9",
  "#5372A5",
  "#6984B1",
  "#7E95BC",
  "#94A7C7",
  "#A9B9D2",
  "#BFCADD",
];

export const ASSEMBO_COLORS = {
  primary: "#B6FFFF",
  dark: "#001318",
  darkSecondary: "#00202B",
  seconday: "#838383",
};

export const theme = createTheme({
  palette: {
    primary: {
      main: ASSEMBO_COLORS.primary,
    },
  },
});

export const ASSEMBOWEBAPPSCOPE = "snsapi_login";
export const ASSEMBOWEBAPPREDIRECT = "https://www.assembo.cc/app/wechat/login";
export const ASSEMBOOASCOPE = "snsapi_userinfo";
export const destinations = {
  TASKS: "TASKS",
  TASK_CONTENT: "TASK_CONTENT",
};

export const MEETING_PLATFORMS = {
  ZOOM: "MEETING_PLATFORMS_ZOOM"
}

export const MEETING_CENTER_MODE = {
  LIST: "MEETING_CENTER_LIST_MODE",
  CALENDAR: "MEETING_CENTER_CALENDAR_MODE",
};

export const ZOOM_USER_TYPE = {
  default: 1
};

export const WARNING_TYPE = {
  CHECK_EMAIL: "WARNING_TYPE_CHECK_EMAIL",
  CONTACT_SUPPORT: "WARNING_TYPE_CONTACT_SUPPORT",
  USER_EXISTS: "WARNING_TYPE_USER_EXISTS",
}
