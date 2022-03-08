import React from "react";

function NodeSubheading(props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 20,
        marginTop: 20,
        cursor: "pointer",
      }}
      onClick={() => {
        // console.log("topic-->", props.topic);
        props.onElementClick({}, props.textNode);
      }}
    >
      <div
        style={{
          width: 5,
          height: 5,
          backgroundColor: "black",
          borderRadius: 200,
        }}
      ></div>
      <p
        style={{
          fontSize: 14,
          // fontWeight: "bold",
          margin: 0,
          marginLeft: 10,
          borderBottom:
            props?.selectedElement?.id === props?.textNode?.id
              ? "3px solid #9b9b9b"
              : "none",
        }}
      >
        {props.textNode?.data?.label}
      </p>
    </div>
  );
}

export default NodeSubheading;
