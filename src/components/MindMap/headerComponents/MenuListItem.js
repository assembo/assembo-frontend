import React from "react";
import { addTextNode } from "../../../utils/agendaMaps/agendaMaps";

// const addTextNode = async (meetingId, text) => {
//   const agendaMap = await addTextNode(meetingId, text);
//   console.log("agendaMap from toggleTopicNode", agendaMap)
// }

const MenuListItem = (props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        // justifyContent: "space-between",
      }}
      onDoubleClick={
        async()=>{
          const transcript = props.data;
          if (transcript && props.agendaMap && props.agendaMap._id) {
            await addTextNode(props.agendaMap._id, transcript.message);
          }
        }
      }
    >
      <img
        src={props?.data?.profilePic}
        alt=""
        style={{
          width: 60,
          height: 60,
          borderRadius: 100,
          resizeMode: "cover",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          //   alignItems: "center",
          justifyContent: "space-between",
          marginLeft: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",

            // justifyContent: "space-between",
          }}
        >
          <p style={{ fontSize: 13, margin: 0, fontFamily: "Poppins" }}>
            {props?.data?.name}
          </p>

          <p
            style={{
              fontSize: 13,
              margin: 0,
              marginLeft: 10,
              fontFamily: "Poppins",
            }}
          >
            {props?.data?.time}
          </p>
        </div>
        <p
          style={{
            fontSize: 13,
            margin: 0,
            textAlign: "left",
            fontFamily: "Poppins",
          }}
        >
          {props?.data?.message}
        </p>
      </div>
    </div>
  );
};

export default MenuListItem;
