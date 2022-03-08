import React from "react";
import zoom from "../images/zoom.png";
import bear from "../images/bear.svg";
import { PersonAdd } from "@mui/icons-material";
import { Box, Fab, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useWindowDims } from "../utils/useWindowDims";
export default function MeetingHeader() {
  const { width } = useWindowDims();
  const classes = useStyles();
  return (
    <Grid item xs={12} className={classes.container}>
      <Typography variant="h6">Weekly Team Meeting</Typography>
      <img src={zoom} className={classes.zoom} alt="zoom" />
      <Box marginLeft={"auto"}>
        <Typography variant="subtitle2" fontSize={12}>
          10:00 AM - 11:30 AM <span style={{ marginLeft: 15 }}>11/26/2021</span>
        </Typography>
      </Box>
      <Box paddingLeft={2}>
        {Array(3)
          .fill(1)
          .map((e, index) => (
            <img
              src={bear}
              style={{
                marginLeft: index === 0 ? 0 : -13,
                width: width * 0.025,
              }}
              alt="user"
            />
          ))}
      </Box>
      <Fab color="primary" className={classes.fab}>
        <PersonAdd />
      </Fab>
    </Grid>
  );
}

const useStyles = makeStyles({
  container: {
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    marginBottom: 4,
  },
  fab: {
    marginLeft: 20,
    borderRadius: 20,
  },
  zoom: { width: 30, margin: "0 10px" },
});
