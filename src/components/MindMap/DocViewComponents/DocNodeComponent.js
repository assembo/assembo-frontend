import React, { useEffect } from "react";
import { useState } from "react";
import NodeHeading from "./NodeHeading";
import NodeSubheading from "./NodeSubheading";

function DocNodeComponent(props) {
  const [subHeadings, setSubHeadings] = useState([]);
  useEffect(() => {
    getSubheadings(props.textNodes);
  }, [props]);

  const getSubheadings = (textNodes) => {
    let x = textNodes.filter((e) => e.parent === props?.topic?.id);
    setSubHeadings(x);
  };
  return (
    <div
      style={{
        marginLeft: 50,
      }}
    >
      <NodeHeading
        topicNode={props?.topic}
        selectedElement={props.selectedElement}
        onElementClick={props.onElementClick}
        completedPercent={props.completedPercent}
        forceEndTask={props.forceEndTask}
        setNodeTextEdit={props.setNodeTextEdit}
      />
      {subHeadings?.map((e) => (
        <NodeSubheading
          textNode={e}
          selectedElement={props.selectedElement}
          onElementClick={props.onElementClick}
        />
      ))}
    </div>
  );
}

export default DocNodeComponent;
