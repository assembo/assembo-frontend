import React, { memo, useState } from "react";

import { Handle } from "react-flow-renderer";
import { useEffect } from "react";
import Checkbox from "react-custom-checkbox";
import { FaCheck } from "react-icons/fa";
import moment from "moment";
import { gray } from "./constants";
import { milliSecondToTime } from "./helpers";

export default memo(({ data, isConnectable }) => {
  const [completedPercent, setCompletedPercent] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [timer, setTimer] = useState(0);
  const [checked, setChecked] = useState(false);
  const [nodeText, setNodeText] = useState("");

  const [completedColor, setCompletedColor] = useState("#DFDFDF");

  useEffect(() => {
    if (data.startTime) {
      if (data.endTime) {
        setIsActive(false);
      } else {
        setIsActive(true);
      }
    }
    if (data?.label) {
      setNodeText(data?.label);
    }
  }, [data]);

  useEffect(() => {
    if (data.endTime) {
      if (calculateDuration(data.startTime, data.endTime) > data.duration) {
        setCompletedColor("#FFBCBC");
      } else {
        setCompletedColor("#DFDFDF");
      }
    }
  }, [data.endTime]);
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
  useEffect(() => {
    if (checked) {
      data.forceEndTask();
    }
  }, [checked]);
  const calculateProgressPercentage = (timeElapsed) => {
    let percentCompleted = (timeElapsed / data.duration) * 100;
    setCompletedPercent(percentCompleted);
  };

  const handleChange = () => {
    setChecked(!checked);
  };

  const calculateDuration = (startTime, endTime) => {
    var duration = moment.duration(endTime.diff(startTime));
    var asMilliseconds = duration.asMilliseconds();

    return asMilliseconds;
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          padding: "0.5rem",
          borderRadius: 15,
          position: "relative",
          // backgroundColor: "#f3f3f3",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            width: "100%",
            height: "75%",
            borderRadius: 15,
            backgroundColor: data?.endTime ? completedColor : "#f3f3f3",
            zIndex: -1,
          }}
          className="progress-div"
        ></div>
        {data.active && (
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
              height: "75%",
              borderRadius: 15,
              backgroundColor: completedPercent < 100 ? "#b6ffff" : "#FFBCBC",
              zIndex: -1,
            }}
            className="progress-div"
          ></div>
        )}
        <Handle
          type="target"
          position="left"
          style={{ background: gray }}
          onConnect={(params) => {}}
          isConnectable={isConnectable}
        />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
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
              data.setNodeTextEdit(e.target.value);
            }}
          />

          {data.active && (
            <div
              style={{
                backgroundColor: "white",
                padding: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 5,
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
        <Handle
          type="source"
          position="right"
          style={{ background: "#fff" }}
          isConnectable={isConnectable}
        />
      </div>
      <div
        style={{
          background: "transparent",
          padding: 5,
          marginLeft: 10,
        }}
      >
        {!data.active ? (
          <>
            {data.endTime ? (
              <p
                style={{
                  margin: 0,
                  fontSize: 12,
                  color: "#9b9b9b",
                }}
              >
                Duration :{" "}
                <p style={{ display: "inline" }}>
                  {milliSecondToTime (
                    calculateDuration(data?.startTime, data?.endTime)
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
                  {milliSecondToTime(data?.duration)}
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
            <p style={{ display: "inline", color: "#b6ffff" }}>
              {milliSecondToTime(timer)}
            </p>
            / {milliSecondToTime(data.duration)} estimated
          </p>
        )}
      </div>
      {/* <div style={{ background: "white", padding: 5, marginLeft: 10 }}>
        <p
          style={{
            margin: 0,
            fontSize: 12,
            color: "#9b9b9b",
          }}
        >
          Duration :{" "}
          <p style={{ display: "inline" }}>
            {milliSecondToTime(data.duration)}
          </p>{" "}
          {!data.selected ? "estimated" : ""}
        </p>
      </div> */}
    </div>
  );
});


