import * as React from "react";
import { Box, CssBaseline } from '@material-ui/core';
import IconDrawer from "../Drawers/IconDrawer";
import { useLocation } from "react-router-dom";
import { SidebarLinks } from "./SideBarLinks";
import ContentDrawer from "../Drawers/ContentDrawer";
import { useSelector } from 'react-redux'

export default function Sidebar({ children }) {
  const [open, setOpen] = React.useState(true);
  let meetings = useSelector( state => state.meetings.value );
  meetings = meetings ? meetings : [];
  const meetingsLeft = [];
  const meetingsFinished = [];
  const dateNow = new Date();
  meetings.forEach( (meeting) => {
    const rawStartTime = new Date(meeting.start_time);
    const rawEndTime = new Date(rawStartTime.getTime() + meeting.duration*60000);
    const endLocalTime = rawEndTime.toLocaleString("en-US", {timeZone: meeting.timezone});
    const endTime = new Date(endLocalTime);
    
    if (endTime < dateNow ) {
      meetingsLeft.push(meeting);
    } else {
      meetingsFinished.push(meeting);
    }
  } );
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const location = useLocation();
  const link = 
    location.pathname === "/end"
      ? SidebarLinks[0]
      : SidebarLinks.find((e) => e.path === location.pathname);
  const Component = link ? link.component : null
  return (
    <>
      <Box
        sx={{
          display: "flex",
          background: "#F5F6F8",
          minHeight: "100vh",
        }}
      >
        <CssBaseline />
        <IconDrawer open={open} setOpen={setOpen} />
        <ContentDrawer open={open}>
          {
            Component && 
            <Component
              meetingsFinshed={meetingsLeft}
              meetingsLeft={meetingsFinished}
              handleDrawerClose={handleDrawerClose}
            />
          }
        </ContentDrawer>
        <Box component="main" sx={{ flexGrow: 1 }}>
          {children}
        </Box>

      </Box>

    </>
  );
}
