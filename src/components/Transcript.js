import { MicOutlined, MicOffOutlined, Stop, PauseOutlined } from "@material-ui/icons";
import { Box, Button, Card, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MeetingCenterUserProfile from "./MeetingCenter/MeetingCenterSidePanel/MeetingCenterUserProfile";
import { ASSEMBO_COLORS } from "../constants/constants";
import { useSelector, useDispatch } from 'react-redux'
import { setOpenLinkUserModal } from "../store/meetingCenterSlice";

export default function Transcript({ hideControls, recording, agendaToggle, recognizing, transcriptToggle, transcripts, loadTrigger }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector( state => state.user.value );
  return (
    <Card className={classes.container}>
      <Box className={classes.transcriptHeader}>
        <Typography variant="h6">Transcript</Typography>
        {/* {!hideControls && (
          <Box
            display={"flex"}
            flex={1}
            justifyContent={"flex-end"}
            alignItems={"center"}
          >
            {
              !recognizing? <MicOutlined style={{ fontSize: 30 }} onClick={transcriptToggle}/>:
              <MicOffOutlined style={{ fontSize: 30 }} onClick={transcriptToggle}/>
            }
            {
              !recording? <Stop style={{ fontSize: 30, color: "red" }} onClick={agendaToggle} />:
              <PauseOutlined style={{ fontSize: 30 }} onClick={agendaToggle} />
            }
          </Box>
        )} */}
      </Box>
      {
        // hideControls && !user.zoomId &&
        false &&
        <Box sx={{ padding: "10px 20px" }}>
          {/* <Button
            variant="contained"
            className={classes.button}
            fullWidth
            style={{ background: ASSEMBO_COLORS.primary }}
            onClick={()=>{ dispatch(setOpenLinkUserModal(true)) }}
          >
            Connect to Zoom
          </Button> */}
          {/* Removing Connect to Google Doc Temporarily */}
          <Button
            variant="contained"
            className={classes.button}
            fullWidth
            style={{ background: ASSEMBO_COLORS.primary }}
          >
            Assembo Write that Down! 
          </Button>
        </Box>
      }
      <Box className={classes.messagesContainer}>
        {transcripts.map((message, index) => {
          const timeStamp = message.timeStamp;
          const offsetTime = timeStamp ? new Date(timeStamp.time + timeStamp.offset * 60 * 1000) : new Date();
          return (
            <Box display={"flex"} marginBottom={3}>
              {
                message.userId ?
                  <MeetingCenterUserProfile
                    key={index}
                    styleOverride={{}}
                    user={message.userInfo}
                  >
                  </MeetingCenterUserProfile> :
                  <Box
                    sx={{
                      background: "#4F72FF",
                    }}
                    className={classes.messageProfile}
                  >
                  {"1"}
                </Box>
              }
              <Box flex={1}>
                <Box display={"flex"} alignItems={"center"} marginBottom={1}>
                  <Typography variant="subtitle2">{message.name}</Typography>
                  <Typography fontSize={13} marginLeft={3} marginTop={1}>
                    {offsetTime.toLocaleTimeString()}
                  </Typography>
                </Box>
                <Typography>{message.text}</Typography>
              </Box>
            </Box>
          )
        })}
        <div ref={loadTrigger}
          style={ { display: 'flex'} }
        >
        </div>
      </Box>
      <Box sx={{ padding: "10px 20px" }}>
          {/* <Button
            variant="contained"
            className={classes.button}
            fullWidth
            style={{ background: ASSEMBO_COLORS.primary }}
            onClick={()=>{ dispatch(setOpenLinkUserModal(true)) }}
          >
            Connect to Zoom
          </Button> */}
          {/* Removing Connect to Google Doc Temporarily */}
          <Button
            variant="contained"
            className={classes.button}
            fullWidth
            style={{ background: ASSEMBO_COLORS.primary }}
          >
            Assembo Write that Down! 
          </Button>
        </Box>
    </Card>
  );
};

const useStyles = makeStyles({
  container: {
    borderRadius: 20,
    padding: "10px 0",
    height: "36vh",
  },
  messageProfile: {
    width: 30,
    height: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    borderRadius: 30,
    fontSize: 10,
    marginRight: 10,
  },
  messagesContainer: {
    padding: "10px 20px",
    height: "20vh",
    overflowY: "scroll",
  },
  button: {
    borderRadius: 10,
    fontWeight: "bold",
    padding: 10,
    marginBottom: 20,
  },
  transcriptCard: {
    borderRadius: 20,
    padding: "10px 0",
    height: "100%",
  },
  transcriptHeader: {
    padding: "13px 20px",
    borderBottom: "solid 1px rgba(0,0,0,0.2)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
  },
});
