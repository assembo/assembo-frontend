import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';
import StopIcon from '@material-ui/icons/Stop';
import { red } from "./constants";
import { RecordingContext } from './context';
const emails = ['username@gmail.com', 'user02@gmail.com'];
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <div>
        <DialogTitle id="simple-dialog-title" style={{background:'black',color:'white'}}>Warning</DialogTitle>
        <div style={{padding:'1rem'}}>
          Are you sure to stop recording?
        </div>
        <div style={{display:"flex",justifyContent:'flex-end'}}> 
          <Button style={{background:"#c4c4c4",margin:'1rem'}} onClick={()=>{handleClose()}}>
            Cancel
          </Button>
          <Button style={{background:"#b6ffff",margin:'1rem'}} onClick={()=>{props.stopRecording()}}>
            Stop
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo(props) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div style={{display:"inline-block"}}>
      <Button
        variant="contained"
        style = {{background: red}}
        startIcon={<StopIcon style={{color:"black"}}/>}
        onClick={()=>{
          handleClickOpen()
        }}
      >
        Stop Recording
      </Button>
      <SimpleDialog 
        selectedValue={selectedValue} 
        open={open} 
        onClose={handleClose}
        stopRecording={props.stopRecording}
      />
    </div>
  );
}