import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import {Paper,TextField} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    // width: 500,
    padding:'1rem',
    marginTop:'2rem'
  },
  header: {
    padding: theme.spacing(2),
    background:'black',
    color:"white"
  },
}));

export default function PositionedPopper({nodeText,setNodeText,AddNode}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();
  const classes = useStyles();

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };


  return (
    <div className={classes.root}>
      <Popper open={open} anchorEl={anchorEl} placement={placement} transition style={{marginBottom:'2rem',zIndex:'1000'}}>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <div>
              <Typography className={classes.header}>It seems like you have a task. Add to Map?</Typography>
                <div style={{padding:'1rem'}}>
                <TextField label="Node Text" style={{width:'100%'}} id="standard-basic" value={nodeText} onChange={(e)=>{
                  setNodeText(e.target.value)
                  console.log(nodeText)
                }} />
                </div>
                <div style={{display:"flex",justifyContent:'flex-end'}}> 
                  <Button style={{background:"#b6ffff",margin:'1rem'}} onClick={()=>AddNode()}>
                    Add to Map
                  </Button>
                </div>
              </div>
            </Paper>
          </Fade>
        )}
      </Popper>
    </div>
  );
}