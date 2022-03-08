import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {IconButton,Avatar} from '@material-ui/core';
import Fade from '@material-ui/core/Fade';
import {Paper,TextField} from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const useStyles = makeStyles((theme) => ({
  root: {
    // width: 500,
    padding:'1rem'
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

  const people =[
    {img:'user-20.jpg',name:'Mary 10:46:50 AM',body:'John and I wil ask data scientists to design'},
    {img:'user-20.jpg',name:'Mary 10:46:30 AM',body:'Ok, no problem.'},
    {img:'user-20.jpg',name:'Shemar 10:45:20 AM',body:'We might have a problem in the future.'},
    {img:'user-20.jpg',name:'Mary 10:46:50 AM',body:'John and I wil ask data scientists to design'},
    {img:'user-20.jpg',name:'Mary 10:46:30 AM',body:'Ok, no problem.'},
    {img:'user-20.jpg',name:'Shemar 10:45:20 AM',body:'We might have a problem in the future.'},
  ]


  return (
    <>
      <Popper open={open} anchorEl={anchorEl} placement={placement} transition style={{marginTop:'1rem',zIndex:'1000'}}>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper style={{padding:"1.5rem",background:'#eeeeee'}}>
              {
                people.map((val)=>{
                  return <div style={{display:'flex',padding:'0.5rem'}}>
                    <Avatar style={{marginRight:'1rem'}} src={val.img} />
                    <div>
                      <Typography variant='body1'> {val.name} </Typography>
                      <Typography variant='body1'> {val.body} </Typography>
                    </div>
                  </div>
                })
              }
            </Paper>
          </Fade>
        )}
      </Popper>
      <div style={{display:"inline-block"}}>
        <IconButton onClick={handleClick('bottom-end')}>
          <PersonAddIcon/>
        </IconButton>
      </div>
    </>
  );
}