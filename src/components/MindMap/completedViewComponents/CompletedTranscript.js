import React, { useEffect, useState } from "react";
import MenuListItem from "../headerComponents/MenuListItem";
import { MdOutlineSearch } from "react-icons/md";
import moment from "moment";
import { milliSecondToTime, transcriptConverter } from "../helpers";

const CompletedTranscript = (props) => {
  const [totalTime, setTotalTime] = useState(0);
  const menuData = transcriptConverter(props.transcripts)

  useEffect(() => {
    console.log({ elements: props?.elements });
    if (props?.elements) {
      calculateTotalTime();
    };
  }, [props]);

  const calculateTotalTime = () => {
    let _time = 0;
    const completedNodes = props?.elements?.filter(
      (e) => e?.data?.startTime && e?.data?.endTime
    );
    console.log({ completedNodes });
    completedNodes.forEach((element) => {
      _time =
        _time +
        calculateDuration(element?.data?.startTime, element?.data?.endTime);
    });
    setTotalTime(_time);
  };

  const calculateDuration = (startTime, endTime) => {
    var duration = moment.duration(endTime.diff(startTime));
    var asMilliseconds = duration.asMilliseconds();
    return asMilliseconds;
  };
  return (
    <div
    >
      <p>Total Meeting Time : {milliSecondToTime(totalTime)}</p>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <div
          style={{
            width: 150,
            height: 90,
            borderRadius: 15,
            backgroundColor: "black",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div id="meetingSDKElement"
          ></div>
        </div>
        <div
          style={{
            width: "60%",

            borderRadius: 15,
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
            padding: 10,
          }}
        >
          <MdOutlineSearch size={30} color="#C2CFE0" />
          <p style={{ fontSize: 14, color: "#C2CFE0", margin: 0 }}>
            Search in transcript
          </p>
        </div>
      </div>
      {menuData.map((e) => (
        <div style={{ marginTop: 10, marginBottom: 10 }}>
          <MenuListItem 
            data={e}
            agendaMap={props.agendaMap}
          />
        </div>
      ))}
      <div ref={props.loadTrigger}
        style={ 
          { 
            display: 'flex',
            height: "100px",
            width: "100px",
            backgroundColor: "yellow"
          }
        }
      >
      </div>
    </div>
  );
};

export default CompletedTranscript;
