import React from "react";
import { IoMdAdd } from "react-icons/io";
import { NewTemplate } from "../constants";

const AddNewTemplateCard = (props) => {
  return (
    <div style={{ width: "15%" }}>
      <div
        style={{
          backgroundColor: "#B6FFFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: 200,
          borderRadius: 15,
          cursor: "pointer",
        }}
        onClick={() => {
          props.setDataToUse(NewTemplate);
          props.setShowChooseTemplate(false);
        }}
      >
        <IoMdAdd color="white" size={50} />
      </div>
      <p style={{ fontSize: 16, fontWeight: 600, textAlign: "left", margin: 8 }}>
        New Agenda
      </p>
    </div>
  );
};

export default AddNewTemplateCard;
