import { Box, List, Typography } from "@material-ui/core";
import Meeting from "./Meeting";
import SidebarMeetingHeader from "./SidebarMeetingHeader";

const CreateAMeeting = ({
  handleDrawerClose,
  meetingsLeft,
  meetingsFinshed,
}) => (
  <>
    <SidebarMeetingHeader
      handleDrawerClose={handleDrawerClose}
      buttonText={"FASTMEETING"}
    />
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        width: "100%",
        overflowY: "scroll",
        marginTop: 3,
      }}
    >
      <Typography fontWeight="bold" width={"100%"}>
        Today
      </Typography>
      <List style={{ width: "100%" }}>
        {meetingsLeft.map((meeting) => (
          <Meeting meeting={meeting} />
        ))}
      </List>

      <Typography
        marginTop={2}
        fontWeight="bold"
        width={"100%"}
        color={"#A8A8A8"}
      >
        Finshed
      </Typography>
      <List style={{ width: "100%" }}>
        {meetingsFinshed.map((meeting) => (
          <Meeting meeting={meeting} finished />
        ))}
      </List>
    </Box>
  </>
);

export default CreateAMeeting;
