import React, { useEffect, useState } from "react";
import "./docsStyle.css";
import Checkbox from "react-custom-checkbox";
import { FaCheck } from "react-icons/fa";
import moment from "moment";
import { milliSecondToTime } from "../helpers";
function NodeHeading(props) {
  const [checked, setChecked] = React.useState(false);
  const [completedPercent, setCompletedPercent] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [timer, setTimer] = useState(0);
  const [completedColor, setCompletedColor] = useState("#DFDFDF");
  const [nodeText, setNodeText] = useState("");

  useEffect(() => {
    // console.log({ props });
    if (props?.topicNode?.data?.startTime) {
      if (props?.topicNode?.data?.endTime) {
        console.log("ending");
        setIsActive(false);
      } else {
        setIsActive(true);
      }
    }
    if (props?.topicNode?.data?.label) {
      setNodeText(props?.topicNode?.data?.label);
    }
  }, [props]);
  useEffect(() => {
    if (props?.topicNode?.data.endTime) {
      if (
        calculateDuration(
          props?.topicNode?.data?.startTime,
          props?.topicNode?.data?.endTime
        ) > props?.topicNode?.data.duration
      ) {
        setCompletedColor("#FFBCBC");
      } else {
        setCompletedColor("#DFDFDF");
      }
    }
  }, [props?.topicNode?.data?.endTime]);
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTimer(timer + 1000);
      }, 1000);
    } else if (!isActive && timer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timer]);

  useEffect(() => {
    if (completedPercent <= 101) {
      calculateProgressPercentage(timer);
    }
  }, [timer]);

  const calculateProgressPercentage = (timeElapsed) => {
    let percentCompleted =
      (timeElapsed / props?.topicNode?.data?.duration) * 100;
    setCompletedPercent(percentCompleted);
  };

  const handleChange = () => {
    setChecked(!checked);
  };
  useEffect(() => {
    if (checked) {
      props.forceEndTask();
    }
  }, [checked]);
  const calculateDuration = (startTime, endTime) => {
    var duration = moment.duration(endTime.diff(startTime));
    var asMilliseconds = duration.asMilliseconds();
    return asMilliseconds;
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
        cursor: "pointer",
        borderRadius: 10,
        position: "relative",
        marginBottom: 10,
      }}
      onClick={() => {
        // console.log("topic-->", props.topic);
        props.onElementClick({}, props.topicNode);
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          width: `100%`,
          height: " 100%",
          borderRadius: 15,
          backgroundColor: props?.topicNode?.data?.endTime
            ? completedColor
            : "#f3f3f3",
          zIndex: -1,
        }}
        className="progress-div"
      ></div>
      {props?.selectedElement?.id === props?.topicNode?.id && (
        <div
          style={{
            position: "absolute",
            left: 0,
            width:
              completedPercent < 100
                ? completedPercent < 5
                  ? "5%"
                  : `${completedPercent}%`
                : "100%",
            height: " 100%",
            borderRadius: 15,
            backgroundColor: completedPercent < 100 ? "#b6ffff" : "#FFBCBC",
            zIndex: -1,
          }}
          className="progress-div"
        ></div>
      )}

      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <div
          style={{
            width: 7,
            height: 7,
            backgroundColor: "black",
            borderRadius: 200,
          }}
        ></div>
        <input
          type="text"
          name="name"
          value={nodeText}
          style={{
            fontSize: 14,
            fontWeight: 600,
            margin: 10,
            border: "none",
            background: "none",
          }}
          onChange={(e) => {
            setNodeText(e.target.value);
            props.setNodeTextEdit(e.target.value);
          }}
        />

        {/* <p
          style={{
            fontSize: 16,
            fontWeight: "bold",
            margin: 0,
            marginLeft: 10,
          }}
        >
          {props?.topicNode?.data?.label}
        </p> */}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            background: "transparent",
            padding: 5,
            marginLeft: 10,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {props?.selectedElement?.id !== props?.topicNode?.id ? (
            <>
              {props?.topicNode?.data?.endTime ? (
                <p
                  style={{
                    margin: 0,
                    fontSize: 12,
                    color: "#9b9b9b",
                  }}
                >
                  Duration :{" "}
                  <p style={{ display: "inline" }}>
                    {milliSecondToTime(
                      calculateDuration(
                        props?.topicNode?.data?.startTime,
                        props?.topicNode?.data?.endTime
                      )
                    )}
                  </p>
                </p>
              ) : (
                <p
                  style={{
                    margin: 0,
                    fontSize: 12,
                    color: "#9b9b9b",
                  }}
                >
                  Duration :{" "}
                  <p style={{ display: "inline" }}>
                    {milliSecondToTime(props?.topicNode?.data?.duration)}
                  </p>{" "}
                  estimated
                </p>
              )}
            </>
          ) : (
            <p
              style={{
                margin: 0,
                fontSize: 12,
                color: "#9b9b9b",
              }}
            >
              Duration :{" "}
              <p style={{ display: "inline", color: "black" }}>
                {milliSecondToTime(timer)}
              </p>
              / {milliSecondToTime(props?.topicNode?.data?.duration)} estimated
            </p>
          )}
          {props?.selectedElement?.id === props?.topicNode?.id && (
            <div
              style={{
                backgroundColor: "white",
                padding: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 5,
                width: "fit-content",
                marginLeft: 15,
              }}
            >
              <Checkbox
                icon={<FaCheck color="#b6ffff" size={14} />}
                name="my-input"
                checked={checked}
                onChange={handleChange}
                borderColor="white"
                style={{ cursor: "pointer" }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NodeHeading;
