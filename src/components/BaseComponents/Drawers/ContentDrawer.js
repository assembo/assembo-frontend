import styled from "@emotion/styled";
import { ASSEMBO_COLORS } from "../../../constants/constants";
import { useWindowDims } from "../../../utils/useWindowDims";
import MuiDrawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open" || prop !== "drawerWidth",
})(({ theme, open, drawerWidth }) => {
  return {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    "& .css-12i7wg6-MuiPaper-root-MuiDrawer-paper": {
      background: ASSEMBO_COLORS.darkSecondary,
    },
    "& .css-1l8j5k8": {
      background: "transparent",
      borderRight: "none",
    },
    ...(open && {
      "& .MuiPaper-root": {
        backgroundColor: ASSEMBO_COLORS.darkSecondary,
        borderColor: "none",
        marginLeft: "62px",
        width: "inherit"
      },
    }),
    ...(!open && {
      "& .MuiPaper-root": {
        width: "0px"
      },
    }),
  };
});

const ContentDrawer = ({ open, children }) => {
  const { width } = useWindowDims();
  const drawerWidth = width <= 1050 ? width * 0.25 : width * 0.3;
  return (
    <Drawer variant="permanent" open={open} drawerWidth={drawerWidth}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: ASSEMBO_COLORS.darkSecondary,
          height: "100vh",
          color: "#fff",
          alignItems: "center",
          width: "100%",
          padding: "20px 20px",
        }}
      >
        {children}
      </Box>
    </Drawer>
  );
};

export default ContentDrawer;
