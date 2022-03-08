import { Box, Typography, IconButton, Button } from "@material-ui/core";
import { CalendarToday, ChevronLeft, ViewAgenda } from "@material-ui/icons";
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux'
import { ASSEMBO_COLORS } from "../constants/constants";

export default function SidebarMeetingHeader({
  handleDrawerClose,
  buttonText,
}) {
  const classes = useStyles();
  const user = useSelector( state => state.user.value );
  return (
    <>
      <Box className={classes.sidebarTitle} >
        <Typography variant="h6" style={{ color: "#fff" }} >{ user ? `${user.name}'s` : "My" } Meeting Room</Typography>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeft style={{ color: "#fff" }} />
        </IconButton>
      </Box>
      <Button
        variant="contained"
        data-bs-toggle="modal"
        data-bs-target="#meetingCreationModal"
        className={classes.button}
        fullWidth
        size="large"
        style={{ background: ASSEMBO_COLORS.primary }}
      >
        {buttonText}
      </Button>
      <Button
        variant="contained"
        data-bs-toggle="modal"
        data-bs-target="#meetingJoinModal"
        className={classes.button}
        fullWidth
        size="large"
        style={{ background: ASSEMBO_COLORS.primary }}
      >
        {"Join Meeting"}
      </Button>
      <Box className={classes.icons}>
        <ViewAgenda style={{ marginRight: 10 }} />
        <CalendarToday />
      </Box>
    </>
  );
}
const useStyles = makeStyles({
  sidebarTitle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    marginTop: 40,
    borderRadius: "20px",
    fontWeight: "bold",
    fontSize: 16,
    padding: "10px 0",
  },
  icons: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
    color: "#fff",
    paddingTop: 20,
  },
});
