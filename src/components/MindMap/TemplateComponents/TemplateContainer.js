import React from "react";
import { dataTemplate1, dataTemplate2, dataTemplate3, dataTemplate4, dataTemplate5} from "../constants";
// import data, { dataTemplate1, dataTemplate2 } from "../../consts/test";
import AddNewTemplateCard from "./AddNewTemplateCard";
import TemplateCard from "./TemplateCard";

const templates = [dataTemplate3, dataTemplate4, dataTemplate5];
const TemplateContainer = (props) => {
  const data = props.nodeDataArray;
  ;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        paddingLeft: 20,
        paddingRight: 20,
      }}
    >
      <p style={{ fontSize: 16, fontWeight: 600, alignSelf: "flex-start" }}>
        Choose Agenda Template
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          width: "100%",
        }}
      >
        <AddNewTemplateCard
          setDataToUse={props.setDataToUse}
          setShowChooseTemplate={props.setShowChooseTemplate}
        />
        {templates.map((e, index) => (
          <TemplateCard
            templateData={e}
            key={index}
            setDataToUse={props.setDataToUse}
            setShowChooseTemplate={props.setShowChooseTemplate}
          />
        ))}
      </div>
    </div>
  );
};

export default TemplateContainer;
