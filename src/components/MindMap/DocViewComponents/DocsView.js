import React, { useEffect } from "react";
import { useState } from "react";
import { getSortedListOfTopics } from "../helpers";
import DocNodeComponent from "./DocNodeComponent";
import "./docsStyle.css";
function DocsView(props) {
  const [parentNode, setParentNode] = useState(null);
  const [topicNodes, setTopicNodes] = useState([]);
  const [textNodes, setTextNodes] = useState([]);

  useEffect(() => {
    getParentNode();
    getTopicNodes();
    getTextNodes();
  }, [props]);

  const getParentNode = () => {
    props.elements.forEach((element) => {
      if (element.child && !element.parent) {
        setParentNode(element);
      }
    });
  };
  const getTopicNodes = () => {
    let x = props.elements.filter((e) => e.type === "topicNode");
    let sortedTopics = getSortedListOfTopics(x);
    setTopicNodes(sortedTopics);
  };
  const getTextNodes = () => {
    let x = props.elements.filter((e) => e.type === "textNode");
    setTextNodes(x);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        // alignItems: "center",
        justifyContent: "center",
        padding: 20,
        paddingLeft: 100,
      }}
    >
      <p className="parent-heading">{parentNode?.data?.label}</p>
      {topicNodes.map((topic) => (
        <DocNodeComponent
          topic={topic}
          textNodes={textNodes}
          onElementClick={props.onElementClick}
          selectedElement={props.selectedElement}
          forceEndTask={props.forceEndTask}
          setNodeTextEdit={props.setNodeTextEdit}
        />
      ))}
    </div>
  );
}

export default DocsView;
