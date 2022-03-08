import { Container, Grid } from "@material-ui/core";
import React from "react";
// import MeetingHeader from "./MeetingHeader";

export default function MeetingPageLayout({ children }) {
  return (
    <Container>
      <Grid container spacing={2}>
        {/* <MeetingHeader /> */}
        {children}
      </Grid>
    </Container>
  );
}
