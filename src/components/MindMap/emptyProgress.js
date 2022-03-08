import React,{useRef,useEffect,useState, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment'
import { blue } from "./constants";
import Moment from 'react-moment';
import { RecordingContext } from './context';
import {Button} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  mainBar:{
    position:'relative',
    width:'80%',
    margin:'auto'
  },
  subBar:{
    position:'absolute',
    display:'flex'
  },
	lable: {
    height: '15px',
    width: '15px',
    backgroundColor: '#bbb',
    borderRadius: '50%',
    display: 'inline-block'
	},
	lable1: {
    height: '20px',
    width: '20px',
    backgroundColor: blue,
    borderRadius: '50%',
    display: 'inline-block'
	},
}));
var nodeElments = [];
var hierarchicallySorted=[];

const EmptyProgress = ({ elements,durationElements,setDurationElements}) => {
  const classes = useStyles();
  const ref = useRef(null);
  const [divWidth,setDivWidth]=useState(0);
  const {recording,setRecording} = useContext(RecordingContext);
  // const [durationElements,setDurationElements] = useState([]);

  const init = new Date()
  const [date, setDate] = useState(init)

  const tick = () => {
    setDate(new Date())
  }

  useEffect(() => {
    if(recording){
      const timerID = setInterval(() => totalDuration(elements), 5000)
      return () => {
        clearInterval(timerID)
      }
    }
    console.log(elements);
  }, [elements,recording])

  useEffect(() => {
    console.log('width', ref.current ? ref.current.offsetWidth : 0);
    setDivWidth(ref.current?.offsetWidth || 0);
  }, [ref]);

  useEffect(()=>{
    totalDuration(elements);
  },[elements])

  const totalDuration = (elements)=>{
    var Duration = 0;
    hierarchicallySorted=[];

    var startingNode = elements.filter((el)=>{
      const pattern = /^horizontal-0/;
      return pattern.test(el.id);
    })

    nodeElments = elements.filter((el)=>{
      const pattern = /^horizontal-/;
      return pattern.test(el.id);
    })
    findChildren(startingNode[0]);

    hierarchicallySorted.map((el)=>{
      if(el.type === 'textNode'){
        return;
      }
      Duration += el.estimatedDuration || 0;
      el.percent='0';
    })
  
    positionDots(hierarchicallySorted,Duration);
    CalculatePercentage();
    console.log(Duration);
  }

  const findChildren = (el)=>{
    // debugger;
    if(el?.child > 0){
      var number = 0;
      for(var a=0;a<el.child;a++){
        for(var b=0;b<nodeElments.length;b++){
          if(nodeElments[b].parent === el.id && nodeElments[b].number === number){
            number++;
            hierarchicallySorted.push(nodeElments[b])
            findChildren(nodeElments[b]);
          }
        }
      }
    }
    return;
  }

  const positionDots=(hierarchicallySorted,Duration)=>{
    // debugger;
    var assignedSpace = 0;
    for(var a=0;a<hierarchicallySorted.length;a++){
      if(hierarchicallySorted[a].type !== 'textNode'){
        hierarchicallySorted[a].percent = '0';
        hierarchicallySorted[a].startPoint = ( assignedSpace / Duration ) * divWidth ;
        hierarchicallySorted[a].width = (hierarchicallySorted[a].estimatedDuration / Duration) *divWidth;
        assignedSpace += hierarchicallySorted[a].estimatedDuration;
      }
    }
  }



  const CalculatePercentage = ()=>{
    console.log(recording)
    if(!recording){
      // setDurationElements(hierarchicallySorted);
      return;
    }
    for(var a=0;a< hierarchicallySorted.length; a++){
      if(hierarchicallySorted[a].started){
        // debugger;
        const diff = moment().diff(hierarchicallySorted[a].startTime);
        hierarchicallySorted[a].percent = `${(diff / hierarchicallySorted[a].estimatedDuration) * 100}`; 
        
        var duration = ( hierarchicallySorted[a].estimatedDuration - diff) ;
        console.log(duration);
        hierarchicallySorted[a].diff = moment('2000-01-01 00:00:00').add(moment.duration(duration)).format('HH:mm:ss');

        if(parseInt(hierarchicallySorted[a].percent) >= 95){
          hierarchicallySorted[a].percent = '95'
          hierarchicallySorted[a].diff = 'overtime, mark complete'
        }
      }
    }
    setDurationElements(hierarchicallySorted);
  }

  return ( 
    <div ref={ref} className={classes.mainBar}>
      {
        durationElements.map((val)=>{
          if(val.type === 'textNode'){
            return;
          }
          return (<>
              <div className={classes.subBar} style={{left:val.startPoint,width:val.width}}>
              {val.started && <span style={{position:'absolute',top:'20px'}}>{val.diff}</span>}
                {/* <span style={{position:'absolute'}}> */}
                {/* </span> */}
                <span className={val.type==='textNode'? classes.lable1:classes.lable}>
                  
                </span>
                <progress value={val?.completed? '100': val.percent} max='100' style={{width:'100%'}}/>
              </div>
            </>
          )
        })
      }
    </div>
  );
};

export default EmptyProgress;
