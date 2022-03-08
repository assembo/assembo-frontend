import { ChevronLeft, Search } from "@material-ui/icons";
import { Box, Chip, IconButton, Typography } from "@material-ui/core";
import React from "react";
const results = [
  "Learning",
  "Machine",
  "Machine",
  "Learning",
  "Machine Learning",
  "Machine Learning",
];
const MeetingLibrary = ({ handleDrawerClose }) => (
  <>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <Typography variant="h6">Meeting Library</Typography>
      <IconButton onClick={handleDrawerClose}>
        <ChevronLeft style={{ color: "#fff" }} />
      </IconButton>
    </Box>
    <Box
      display={"flex"}
      alignItems={"center"}
      sx={{
        background: "#fff",
        borderRadius: 5,
        padding: 1.5,
        color: "rgba(0,0,0,0.2)",
        width: "100%",
        marginTop: 2,
      }}
    >
      <Search />
      <input
        style={{ flex: 1, border: "none" }}
        placeholder="SEARCH ACROSS MEETINGS"
      />
    </Box>
    <Box display={"flex"} flexWrap={"wrap"} marginTop={2}>
      {results.map((e) => (
        <Chip
          style={{ color: "#fff", margin: 3 }}
          label={e}
          variant="outlined"
        />
      ))}
    </Box>
  </>
);

export default MeetingLibrary;
