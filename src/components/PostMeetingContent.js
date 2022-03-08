//Imports from node_modules
import { useSelector } from 'react-redux'
import { Box, Card, Checkbox, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
//Custom component imports
import Transcript from "./Transcript";

//Images
import slack from "../assets/img/slack.png";
import trello from "../assets/img/trello.png";

//Problems/Actions that are being rendered
const problems = [
  { title: "Coding Problems Discuss", image: slack },
  { title: "Coding Problems Discuss", image: trello },
  { title: "Coding Problems Discuss", image: slack },
];
export default function PostMeetingContent(props) {
  const classes = useStyles();
  const selectedMeeting = useSelector( state => state.meetingCenter.value.selectedMeeting );
  return (
    <Grid item md={6} xs={12} className={classes.gridItem}>
    { props.meetingEnded &&
      <Card className={classes.card}>
        <Box className={classes.cardHeader}>
          <Typography variant="h6">Recommended Action Items</Typography>
        </Box>
        <Box sx={{ padding: "10px 20px" }}>
          {problems.map((problem) => (
            <Box className={classes.action}>
              <Checkbox />
              <Typography flex={1} textAlign={"center"} fontWeight={"bold"}>
                {problem.title}
              </Typography>
              <img
                style={{ width: 20 }}
                src={problem.image}
                alt={problem.title}
              />
            </Box>
          ))}
        </Box>
      </Card>
    }
    <Transcript 
      hideControls={selectedMeeting ? false : true}
      recording={props.recording}
      agendaToggle={ props.agendaToggle }
      recognizing={props.recognizing}
      transcriptToggle={props.transcriptToggle}
      users={props.users}
      transcripts={props.transcripts}
      loadTrigger={props.loadTrigger}
      loading={props.loading}
      insertTranscription={props.insertTranscription}
    />
  </Grid>
  );
}
const useStyles = makeStyles({
  gridItem: {
    height: "80vh",
  },
  card: {
    borderRadius: 20,
    padding: "10px 0",
    marginBottom: 10,
    height: "40vh",
  },
  cardHeader: {
    padding: "13px 20px",
    borderBottom: "solid 1px rgba(0,0,0,0.2)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
  },
  action: {
    padding: "5px 10px",
    border: "solid 1px #000",
    marginBottom: 5,
    borderRadius: 15,
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  }
});
