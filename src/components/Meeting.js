import { Box, Typography, Checkbox } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import moment from "moment";
import { useDispatch } from 'react-redux'
import { setSelectedMeeting } from "../store/meetingCenterSlice";

const Meeting = ({ meeting, finished }) => {
  const classes = useStyles();
  const startTime = new Date(meeting.start_time);
  const endTime = new Date(startTime.getTime() + meeting.duration*60000);
  const startLocalTime = startTime.toLocaleString("en-US", {timeZone: meeting.timezone});
  const endLocalTime = endTime.toLocaleString("en-US", {timeZone: meeting.timezone});
  let [ date,  timeFrom ] = startLocalTime.split(", ");
  timeFrom = timeFrom.substring(0, timeFrom.lastIndexOf(":")) + timeFrom.substring(timeFrom.lastIndexOf(":")+3);
  let [ _,  timeTill ] = endLocalTime.split(", ");
  timeTill = timeTill.substring(0, timeTill.lastIndexOf(":")) + timeTill.substring(timeTill.lastIndexOf(":")+3);
  const dispatch = useDispatch();
  
  return (
    <Box
      sx={{
        color: finished ? "#A8A8A8" : "white",
        border: `solid 1px ${finished ? "#A8A8A8" : "white"} `,
      }}
      className={classes.meetingContainer}
      onClick={() => dispatch(setSelectedMeeting(meeting))}
    >
      <Box className={classes.meetingHeader} >
        <Box flexDirection={"column"}>
          <Typography fontWeight={"bold"} style={{ color: finished ? "#A8A8A8" : "white" }}>{meeting.topic}</Typography>
          <img
            src={require("../assets/img/zoom.png").default}
            style={{ marginTop: 10 }}
            alt={meeting.topic}
          />
        </Box>
        <Checkbox style={{ color: "#fff", padding: 0 }} />
      </Box>
      <Box className={classes.meetingFooter}>
        <Typography variant="subtitle2" fontSize={11} style={{ color: finished ? "#A8A8A8" : "white" }}>
          {timeFrom} - {timeTill}
        </Typography>
        <Typography variant="subtitle2" fontSize={11} style={{ color: finished ? "#A8A8A8" : "white" }}>
          {moment(date).format("MM/DD/YYYY")}
        </Typography>
      </Box>
    </Box>
  );
};

export default Meeting;

const useStyles = makeStyles({
  meetingContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    borderRadius: "20px",
    padding: 12,
    marginBottom: 10,
  },
  meetingHeader: {
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  meetingFooter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
});
