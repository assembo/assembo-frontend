import React, {useState} from "react";
import { Backdrop, Box, Button, Card, Fade, Grid, Modal, TextField, Typography } from '@material-ui/core';
import { Close } from "@material-ui/icons";
import { ASSEMBO_COLORS, ZOOM_USER_TYPE, WARNING_TYPE } from "../../../constants/constants";
import { linkZoomAccount } from "../../../utils/linkAccounts/zoom";

import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';

import { setOpenLinkUserModal } from "../../../store/meetingCenterSlice";

export default function TransitionsModal() {
  const classes = useStyles();
  const open = useSelector(state => state.meetingCenter.value.openLinkUserModal);
  const user = useSelector(state=> state.user.value);
  let [email, setEmail] = useState("");
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [userWarning, setUserWarning] = useState(null);
  const dispatch = useDispatch();

  /**
   * wrapper function to create a meeting by various meeting utility functions
   * @returns new meeting data
   */
  const linkUser = async() => {
      try {
        if (user._id && email && firstName && lastName) {
          const userData = {
            _id: user._id,
            userType: ZOOM_USER_TYPE.default,
            email,
            firstName,
            lastName
          };
          console.log(userData)
          const result = await linkZoomAccount(userData);
          return result;
        }
        dispatch(setOpenLinkUserModal(false));
      } catch (error) {
        console.error(`unable to link user ${error}.`);
      }
    };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={() => {dispatch(setOpenLinkUserModal(false)) } }
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Grid item md={6} xs={12} className={classes.gridItem}>
            <Card className={classes.card}>
              <Box className={classes.cardHeader}>
                <Typography variant="h5">Connect to Zoom</Typography>
                <img
                  src={require("../../../assets/img/zoom.png").default}
                  style={{ marginLeft: 10 }}
                />
              </Box>
              <Box sx={{ padding: "10px 20px" }}>
                <Typography variant="h6">First Name:</Typography>
                <TextField 
                  style={{marginLeft: "15px"}}
                  required={true}
                  onChange={ (event) => {setFirstName(event.target.value)} }
                />
              </Box>
              <Box sx={{ padding: "10px 20px" }}>
                <Typography variant="h6">Last Name:</Typography>
                <TextField 
                  style={{marginLeft: "15px"}}
                  required={true}
                  onChange={ (event) => {setLastName(event.target.value)} }
                />
              </Box>
              <Box sx={{ padding: "10px 20px" }}>
                <Typography variant="h6">Email:</Typography>
                <TextField 
                  style={{marginLeft: "15px"}}
                  required={true}
                  onChange={ (event) => {setEmail(event.target.value)} }
                />
              </Box>
              <Box sx={{ padding: "10px 20px" }}>
                <Button
                  variant="contained"
                  className={classes.button}
                  fullWidth
                  style={{ background: ASSEMBO_COLORS.primary }}
                  onClick={async ()=>{ 
                    const result = await linkUser();
                    if (result && result.id) {
                      setUserWarning(WARNING_TYPE.CHECK_EMAIL);
                    } else {
                      setUserWarning(WARNING_TYPE.CONTACT_SUPPORT);
                    }
                   }}
                >
                  Connect
                </Button>
              </Box>
              { userWarning && userWarning === WARNING_TYPE.CHECK_EMAIL &&
                <Box sx={{ padding: "10px 20px" }}>
                  <div style={{ display: "flex" }}>
                    <Typography variant="h6" style={ {color: ASSEMBO_COLORS.primary} } >Please check your email to accept Assembo invitation from Zoom.</Typography>
                    <Close style={{ fontSize: 15, marginBottom: 30 }} onClick={ ()=>{setUserWarning(null)} } />
                  </div>
                </Box>
              }
              {
                userWarning && userWarning === WARNING_TYPE.CONTACT_SUPPORT &&
                <Box sx={{ padding: "10px 20px" }}>
                  <div style={{ display: "flex" }}>
                    <Typography variant="h6" style={ {color: "red"} } >There is issue related to setting your Zoom account, please contact our support.</Typography>
                    <Close style={{ fontSize: 15, marginBottom: 30 }} onClick={ ()=>{setUserWarning(null)} } />
                  </div>
                </Box>
              }
            </Card>
          </Grid>
        </Fade>
      </Modal>
    </div>
  );
};

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridItem: {
    height: "80vh",
  },
  card: {
    borderRadius: 20,
    padding: "10px 0",
    marginBottom: 10,
    height: "60vh",
  },
  cardHeader: {
    padding: "13px 20px",
    borderBottom: "solid 1px rgba(0,0,0,0.2)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
  },
  container: {
    borderRadius: 20,
    padding: "10px 0",
    height: "36vh",
  },
  button: {
    borderRadius: 10,
    fontWeight: "bold",
    padding: 10,
    marginBottom: 20,
  }
});

