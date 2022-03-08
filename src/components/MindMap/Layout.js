import React, { useEffect, useRef } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Button, Drawer } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import FeaturedPlayListIcon from "@material-ui/icons/FeaturedPlayList";
import { IoPersonAddSharp } from "react-icons/io5";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import StopDialog from "./StopDialog";
import Link from "@material-ui/core/Link";
import { toast } from "react-toastify";
//ICONS
import { FaListUl } from "react-icons/fa";
import TasksIcon from "./assets/TasksIcon.png";

import moment from "moment";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
  },
  appBar: {
    background: "#fafafa",
    color: "black",
    // zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    boxShadow: "none",
    // width: `calc(100% - ${drawerWidth}px)`,
  },
  appBarShift: {
    // marginLeft: drawerWidth,
    // width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    background: "#001318",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  Icons: {
    color: "gray",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
}));

export default function MiniDrawer({
  elements,
  durationElements,
  setDurationElements,
  CompleteTask,
  recording,
  startRecording,
  stopRecording,
  selectedElement,
  startTask,
  children,
  mapView,
  changeView,
  showModal,
  setShowModal,
  showChooseTemplate,
  setShowChooseTemplate,
  recordingComplete,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const isModalOpen = Boolean(anchorEl);

  const iconRef = useRef(null);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClick = (event) => {
    setShowModal(!showModal);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setShowModal(false);
  };
  useEffect(() => {
    if (iconRef) {
      setAnchorEl(iconRef.current);
    }
  }, [iconRef]);

  useEffect(() => {
    console.log({ showModal });
  }, [showModal]);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <div
        style={{
          flex: 1,
        }}
      >
        <Toolbar
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <Link href="/" style={{ textDecoration: "none" }}>
              <Typography
                variant="h6"
                noWrap
                style={{ color: "black", fontWeight: 600, fontSize: 22 }}
              >
                {recordingComplete
                  ? moment().format("d/mm/YYYY, h:mm a") +
                    " Weekly Team Meeting"
                  : "Agenda Map"}
              </Typography>
            </Link>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {/* <Button
              // variant="contained"
              style={{
                background: gray,
                borderRadius: 10,
                border: "none",
                marginRight: 10,
              }}
              startIcon={
                <CheckBoxOutlineBlankIcon style={{ color: "black" }} />
              }
              onClick={() => {
                if (recording) {
                  CompleteTask();
                } else {
                  toast.warn("please start recording first");
                }
              }}
            >
              Mark Complete
            </Button> */}
            {!recording ? (
              <Button
                // variant="contained"
                className={classes.button}
                style={{
                  background: "#b6ffff",
                  borderRadius: 10,
                  border: "none",
                  padding: 10,
                  paddingRight: 20,
                  fontWeight: "bold",
                  fontSize: 16,
                  letterSpacing: 0,
                  fontFamily: "Poppins",
                }}
                startIcon={
                  <FiberManualRecordIcon style={{ color: "#FF7272" }} />
                }
                onClick={() => {
                  console.log("selectedElement", selectedElement);
                  startRecording();
                  if (
                    selectedElement === undefined ||
                    selectedElement === null
                  ) {
                    toast.warn(
                      "Please select a Node before starting the timer"
                    );
                  } else {
                    startRecording();
                    startTask();
                  }
                }}
              >
                Start Recording
              </Button>
            ) : (
              <StopDialog stopRecording={stopRecording} />
            )}
            {!mapView ? (
              <IconButton
                onClick={changeView}
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <img
                  src={TasksIcon}
                  alt=""
                  style={{ height: 30, width: 30, color: "#9b9b9b" }}
                />
              </IconButton>
            ) : (
              <IconButton
                onClick={changeView}
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <FaListUl fontSize={30} color="#9b9b9b" />
              </IconButton>
            )}

            <div>
              <IconButton
                ref={iconRef}
                onClick={handleClick}
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <FeaturedPlayListIcon
                  fontSize="large"
                  style={{
                    color: showModal ? "black" : "#9b9b9b",
                    cursor: "pointer",
                  }}
                />
              </IconButton>
              {/* <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={showModal}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
              >
                <div
                  style={{
                    width: "100%",
                    padding: 25,
                    backgroundColor: "#F3F3F3",
                    borderRadius: 15,
                    height: "50em",
                  }}
                >
                  <CompletedTranscript elements={elements} />
                </div>
              </Menu> */}
            </div>
            <div style={{ padding: 12 }}>
              <IoPersonAddSharp
                size={20}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setShowChooseTemplate(!showChooseTemplate);
                }}
              />
            </div>
            {/* <Agenda durationElements={durationElements} /> */}
          </div>
        </Toolbar>

        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
    </div>
  );
}
