import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setRecording } from "../../store/meetingCenterSlice";
import './style.css'
import moment from "moment";
import Layout from "./Layout";
import NodeDialog from "./dialog";
// import Counter from '../components/Counter';
import TextNode from "./TextNode";
import TopicNode from "./TopicNode";
import DocsView from "./DocViewComponents/DocsView";
import TemplateContainer from "./TemplateComponents/TemplateContainer";
import CompletedTranscript from "./completedViewComponents/CompletedTranscript";
// import Moment from 'react-moment';
import { toast } from "react-toastify";

import ReactFlow, {
  removeElements,
  addEdge,
} from "react-flow-renderer";
import CustomEdge from "./CustomEdge";
import { getSortedListOfTopics } from "./helpers";
import { blue } from "./constants";
import { toggleTopicNodeStatus } from "../../utils/agendaMaps/agendaMaps";


const onNodeDragStop = (event, node) => console.log("drag stop", node);
const initBgColor = "#fff";

const connectionLineStyle = {
  stroke: "#fff",
};
const snapGrid = [20, 20];
const nodeTypes = {
  textNode: TextNode,
  topicNode: TopicNode,
};
const edgeTypes = {
  custom: CustomEdge,
};
const MindMap = ({ agendaMap, transcripts, toggleRecording, loadTrigger }) => {
  const data = agendaMap && agendaMap.mindMap ? agendaMap.mindMap.nodeDataArray : [];
  const recording = useSelector( state => state.meetingCenter.value.recording );
  const selectedMeeting = useSelector( state => state.meetingCenter.value.selectedMeeting );
  const dispatch = useDispatch()
  const [reactflowInstance, setReactflowInstance] = useState(null);
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [durationElements, setDurationElements] = useState([]);
  const [count, setCount] = useState(0);
  const [nodeText, setNodeText] = useState("");
  const [selectedEdgeIndex, setSelectedEdgeIndex] = useState(null);
  const [mapView, setMapView] = useState(true);
  const [showModal, setShowModal] = useState(true);
  const [showChooseTemplate, setShowChooseTemplate] = useState(false);
  const [nodeTextEdit, setNodeTextEdit] = useState("");

  const [dataToUse, setDataToUse] = useState(data);
  const [recordingComplete, setRecordingComplete] = useState(false);

  //PROGRESS TIMER

  useEffect(() => {
    console.log("item Element selected-->", { selectedElement, recording });
    if (selectedElement) {
      if (recording) {
        setElements((els) =>
          els.map((el) => {
            if (el.id === selectedElement.id) {
              el.data = {
                ...el.data,
                startTime: moment(),
                forceEndTask: forceEndTask,
                selected: true,
              };
            } else {
              el.data = {
                ...el.data,
                selected: false,
              };
            }
            return el;
          })
        );
      } else {
        setElements((els) =>
          els.map((el) => {
            if (el.id === selectedElement.id) {
              console.log("selecting next element");
              el.data = {
                ...el.data,
                selected: false,
              };
            }
            return el;
          })
        );
      }
    }
  }, [selectedElement, recording]);

  useEffect(() => {
    // console.log({ selectedEdgeIndex });
    if (selectedEdgeIndex) {
      setElements((els) =>
        els.map((el, index) => {
          if (index === selectedEdgeIndex) {
            // console.log("the selected edge-->", { el });
            el.style = { ...el.style, stroke: "#b6ffff", strokeWidth: 7 };
          } else {
            el.style = { ...el.style, stroke: "#9b9b9b", strokeWidth: 3 };
          }
          // console.log(el)
          return el;
        })
      );
    }
  }, [selectedEdgeIndex]);

  useEffect(() => {
    if (recordingComplete || showModal) {
      if (mapView) {
        setMapView(false);
        setTimeout(() => {
          setMapView(true);
        }, 1);
      }
    } else if (!recordingComplete && !showModal) {
      console.log({ reactflowInstance });
      if (reactflowInstance) {
        reactflowInstance.fitView();
      }
    }
  }, [recordingComplete, showModal]);

  useEffect(() => {
    if (mapView) {
      if (!recordingComplete && !showModal) {
        console.log({ reactflowInstance });
        if (reactflowInstance) {
          reactflowInstance.fitView();
        }
      }
    }
  }, [mapView]);

  useEffect(() => {
    console.log("nodeTextEdit", { nodeTextEdit });
    if (nodeTextEdit !== "" && nodeText !== selectedElement?.data?.label) {
      setElements((els) =>
        els.map((el) => {
          if (el.id === selectedElement.id) {
            console.log("selecting next element");
            el.data = {
              ...el.data,
              label: nodeTextEdit,
            };
          }
          return el;
        })
      );
    }
  }, [nodeTextEdit]);
  const selectNextElement = () => {
    let allTopics = elements.filter((e) => e.type === "topicNode");
    let sortedTopics = getSortedListOfTopics (allTopics);
    let selectedElementIndex = sortedTopics.indexOf(selectedElement);
    let newIndex = selectedElementIndex + 1;
    if (newIndex <= sortedTopics.length - 1) {
      let newSelectedEdge = {};
      elements.forEach((el) => {
        if (el.target === sortedTopics[newIndex].id) {
          newSelectedEdge = el;
        }
      });
      setSelectedElement(sortedTopics[newIndex]);
      setSelectedEdgeIndex(elements.indexOf(newSelectedEdge));
    } else {
      stopRecording();
      setRecordingComplete(true);
      setSelectedElement(null);
      setSelectedEdgeIndex(null);
    }
  };

  const forceEndTask = () => {
    console.log("force ending...");
    if (!recording) {
      return toast.warn("Please start the recording first");
    } else {
      setElements((els) =>
        els.map((el) => {
          if (el.id === selectedElement.id) {
            // console.log("inside completed percentage uef found element");
            el.data = {
              ...el.data,
              endTime: moment(),
              recording: false,
            };
          }
          return el;
        })
      );
      selectNextElement();
    }
  };
  const changeView = () => {
    setMapView(!mapView);
  };
  const onElementClick = (event, element) => {
    if (!recording) {
      setElements((els) =>
        els.map((el) => {
          if (el.id === element.id) {
            setSelectedEdgeIndex(elements.indexOf(el) + 1);
            setSelectedElement(el);
            el.data = { ...el.data, selected: true };
          } else {
            el.data = { ...el.data, selected: false };
          }
          return el;
        })
      );
    }
  };

  var columnMaxChildCount = [];
  var newConvertedArray = [];
  var columnOneElements;
  var columnTwoElements;
  var columnTheeElements;
  var columnFourElements;
  var combinedColumns = [];
  var unSelectedElements = [];
  var SelectedElements = [];

  const convertToReactFlow = () => {
    combinedColumns = [
      ...columnOneElements,
      ...columnTwoElements,
      ...columnTheeElements,
      ...columnFourElements,
    ];
    // debugger;

    for (var a = 0; a < combinedColumns.length; a++) {
      if (combinedColumns[a].parent === undefined) {
        newConvertedArray.push({
          id: "horizontal-0",
          sourcePosition: "right",
          type: "input",
          data: {
            label: combinedColumns[a].text,
          },
          child: combinedColumns[a].child,
          position: combinedColumns[a].position,
          style: {
            background: "#f3f3f3",
            padding: "0.5rem",
            borderRadius: 10,
            border: "none",
          },
        });
      } else {
        // console.log({ combinedColumns: combinedColumns[a] });
        newConvertedArray.push({
          id: `horizontal-${combinedColumns[a].key}`,
          sourcePosition: "right",
          targetPosition: "left",
          number: combinedColumns[a].number,
          parent: `horizontal-${combinedColumns[a].parent}`,
          type: combinedColumns[a].node ? "topicNode" : "textNode",
          estimatedDuration: combinedColumns[a]?.estimatedDuration || 100000,
          started: combinedColumns[a]?.started || undefined,
          startTime: combinedColumns[a]?.startTime || undefined,
          data: {
            label: combinedColumns[a].text,
            started: combinedColumns[a]?.started,
            CompleteTask: CompleteTask,
            duration: combinedColumns[a]?.estimatedDuration,
            selected: false,
            active: combinedColumns[a].active,
            recording: false,
            forceEndTask: forceEndTask,
            startTime: null,
            setNodeTextEdit: setNodeTextEdit,
          },
          child: combinedColumns[a].child,
          position: combinedColumns[a].position,
          style: combinedColumns[a].node
            ? {
                // background: "#f3f3f3",
                // padding: "0.5rem",
                // borderRadius: 10,
                // border: "1px solid #777",
              }
            : {
                // background: "red",
                // borderBottom: "1px solid #777",
              },
        });
        newConvertedArray.push({
          id: `e${combinedColumns[a].parent}-${combinedColumns[a].key}`,
          source: `horizontal-${combinedColumns[a].parent}`,
          target: `horizontal-${combinedColumns[a].key}`,
          style: { stroke: "#9b9b9b", strokeWidth: 3 },
        });
      }
    }
    // debugger;
    setElements(newConvertedArray);
  };

  const setColumns = () => {
    columnOneElements = set1stColumn(dataToUse);
    columnTwoElements = setOtherColumns(columnOneElements, 1);
    columnTheeElements = setOtherColumns(columnTwoElements, 2);
    columnFourElements = setOtherColumns(columnTheeElements, 3);

    assignMultiplier();

    setPositioncolumnOne(columnOneElements);
    setPositionOtherColumns(
      columnTwoElements,
      columnOneElements,
      columnMaxChildCount[1].multiplier
    );
    // debugger;
    setPositionOtherColumns(
      columnTheeElements,
      columnTwoElements,
      columnMaxChildCount[2].multiplier
    );
    setPositionOtherColumns(columnFourElements, columnTheeElements, 1);
    convertToReactFlow();
  };

  const set1stColumn = (data) => {
    for (var a = 0; a < data.length; a++) {
      if (data[a].parent === undefined) {
        data[a].column = 1;
        return [data[a]];
      }
    }
  };

  const setOtherColumns = (columnElements, columnRank) => {
    var newColumnElements = [];
    var childCount = 0;
    var maxCount = 0;
    for (var a = 0; a < columnElements.length; a++) {
      for (var b = 0; b < dataToUse.length; b++) {
        if (dataToUse[b].parent === columnElements[a].key) {
          dataToUse[b].column = columnRank;
          dataToUse[b].number = childCount;
          newColumnElements.push(dataToUse[b]);
          childCount++;
          if (columnElements[a].child === undefined) {
            columnElements[a].child = 1;
          } else {
            columnElements[a].child += 1;
          }
        }
      }
      if (maxCount <= childCount) {
        maxCount = childCount;
      }
      childCount = 0;
    }
    columnMaxChildCount.push({
      columnRank,
      maxCount,
    });
    return newColumnElements;
  };

  const assignMultiplier = () => {
    for (var a = columnMaxChildCount.length - 1; a >= 0; a--) {
      if (columnMaxChildCount[a + 1] === undefined) {
        columnMaxChildCount[a].multiplier =
          Math.ceil(columnMaxChildCount[a].maxCount / 2) + 2;
      } else {
        columnMaxChildCount[a].multiplier =
          (Math.floor(columnMaxChildCount[a].maxCount / 2) + 1) *
          columnMaxChildCount[a + 1].multiplier;
      }
    }
  };

  const setPositioncolumnOne = (columnOneElements) => {
    for (var a = 0; a < columnOneElements.length; a++) {
      columnOneElements[a].position = { x: 0, y: 0 };
    }
  };

  const setPositionOtherColumns = (
    columnElements,
    parentColumnElements,
    multiplier
  ) => {
    // console.log("setting positions-->", {
    //   columnElements,
    //   parentColumnElements,
    //   multiplier,
    // });
    // debugger;
    for (var a = 0; a < parentColumnElements.length; a++) {
      for (var b = 0; b < columnElements.length; b++) {
        if (parentColumnElements[a].key === columnElements[b].parent) {
          if (parentColumnElements[a].child === undefined) {
            return;
          } else if (columnElements[b].number === 0) {
            columnElements[b].position = {
              x: parentColumnElements[a].position.x + 300,
              y: parentColumnElements[a].position.y,
            };
          } else {
            var saver;
            // debugger;
            if (columnElements[b]?.child > 0) {
              saver = multiplier * Math.ceil(columnElements[b].number / 2);
            } else {
              saver = 1.5;
            }
            if (columnElements[b].number % 2 === 0) {
              columnElements[b].position = {
                x: parentColumnElements[a].position.x + 300,
                y: parentColumnElements[a].position.y + -60 * saver,
              };
            } else {
              columnElements[b].position = {
                x: parentColumnElements[a].position.x + 300,
                y: parentColumnElements[a].position.y + 60 * saver,
              };
            }
          }
        }
      }
    }
  };

  const AddNode = () => {
    if (!selectedElement) {
      return toast.warn("Please select a Node first");
    } else if (selectedElement.type === "textNode") {
      return toast.warn("Can not add to text Node");
    } else if (selectedElement.position.x >= 750) {
      return toast.warn("Can not add to this Column");
    }
    if (selectedElement) {
      for (var a = 0; a < elements.length; a++) {
        if (elements[a].id === selectedElement.id) {
          console.log({ el: elements[a] });
          if (elements[a].child) {
            elements[a].child++;
          } else {
            elements[a].child = 1;
          }

          // debugger;
          dataToUse.push({
            parent: parseInt(selectedElement.id.slice(11)),
            text: nodeText,
            key: `${parseInt(selectedElement.id.slice(11))}${
              elements[a].child
            }`,
            // position: getNewNodePosition(),
          });

          setColumns();
          console.log(data);
        }
      }
    }
  };
  const getNewNodePosition = () => {
    let newX = 0;
    let newY = 0;
    let allChildren = dataToUse.filter(
      (e) => e.parent == selectedElement.id.slice(11)
    );
    console.log("selected element-->", selectedElement.id.slice(11));
    console.log({ allChildren });

    allChildren.forEach((e) => {
      newX = e.position.x;
      if (e.position.y > newY) {
        newY = e.position.y;
      }
    });

    return { x: newX, y: newY + 90 };
  };
  const startTask = (durationChild) => {
    if (durationChild) {
      unSelectedElements = elements.filter((el) => {
        return el.id !== durationChild.id;
      });

      SelectedElements = elements.filter((el) => {
        return el.id === durationChild.id;
      });

      SelectedElements[0].started = true;
      SelectedElements[0].startTime = moment();
      SelectedElements[0].style = {
        ...SelectedElements[0].style,
        background: "red",
      };
      SelectedElements[0].data.started = true;
      SelectedElements[0].data.CompleteTask = CompleteTask;

      setElements([...unSelectedElements, ...SelectedElements]);
    } else {
      unSelectedElements = elements.filter((el) => {
        return el.id !== selectedElement.id;
      });
      SelectedElements = elements.filter((el) => {
        return el.id === selectedElement.id;
      });
      if (SelectedElements[0].started !== true) {
        SelectedElements[0].started = true;
        SelectedElements[0].startTime = moment();
        SelectedElements[0].data.started = true;
        SelectedElements[0].data.CompleteTask = CompleteTask;
      }

      setElements([...unSelectedElements, ...SelectedElements]);
      console.log(elements);
    }
    // setCount((count)=> ++count)
  };

  const CompleteTask = () => {
    // debugger;
    for (var a = 0; a < elements.length; a++) {
      if (elements[a].started === true) {
        elements[a].started = false;
        elements[a].completed = true;
        elements[a].style = { ...elements[a].style, background: blue };

        for (var b = 0; b < durationElements.length; b++) {
          if (durationElements[b].id === elements[a].id) {
            startTask(durationElements[b + 1]);
          }
        }
      }
    }
    console.log("form text hi");
  };

  const startRecording = () => {
    toggleRecording();
    dispatch(setRecording(true));
  };
  const stopRecording = async () => {
    toggleRecording();
    dispatch(setRecording(false));
    const meetingId = selectedMeeting ? selectedMeeting.id : null;
    if (meetingId && agendaMap && agendaMap._id) {
      const mindMap = await toggleTopicNodeStatus(agendaMap._id);
      console.log("agendaMap from toggleTopicNode", mindMap)
    } 
  };

  useEffect(() => {
    console.log("setting cols");
    setColumns();
  }, [count, dataToUse]);

  useEffect(() => {
    if (reactflowInstance && elements.length > 0) {
      reactflowInstance.fitView();
    }
  }, [reactflowInstance, elements.length]);

  const onElementsRemove = useCallback(
    (elementsToRemove) =>
      setElements((els) => removeElements(elementsToRemove, els)),
    []
  );
  const onConnect = useCallback(
    (params) =>
      setElements((els) =>
        addEdge({ ...params, animated: true, style: { stroke: "#fff" } }, els)
      ),
    []
  );

  const onLoad = useCallback(
    (rfi) => {
      if (!reactflowInstance) {
        setReactflowInstance(rfi);
        console.log("flow loaded:", { rfi });
      }
    },
    [reactflowInstance]
  );

  return (
    <Layout
      CompleteTask={CompleteTask}
      startTask={() => {
        startTask();
      }}
      recording={recording}
      stopRecording={stopRecording}
      startRecording={startRecording}
      selectedElement={selectedElement}
      mapView={mapView}
      changeView={changeView}
      showModal={showModal}
      setShowModal={setShowModal}
      elements={elements}
      durationElements={durationElements}
      setDurationElements={setDurationElements}
      showChooseTemplate={showChooseTemplate}
      setShowChooseTemplate={setShowChooseTemplate}
      recordingComplete={recordingComplete}
    >
      <div style={{ height: "50em" }}>
        {showChooseTemplate && (
          <TemplateContainer
            dataToUse={dataToUse}
            setDataToUse={setDataToUse}
            setShowChooseTemplate={setShowChooseTemplate}
            nodeDataArray={data}
          />
        )}
        <div
          style={{
            display: "flex",
            flexDirection: recordingComplete || showModal ? "row" : "column",
            justifyContent: "space-evenly",
            padding: 5,
            flex: 1,
            height: "50em",
          }}
        >
          <div
            style={{
              width: recordingComplete || showModal ? "60%" : "100%",
              padding: 5,

              height: "50em",
              // maxHeight: "610px",
              overflowY: "scroll",
              // "&::-webkit-scrollbar": {
              //   width: "0.4em",
              // },
              // "&::-webkit-scrollbar-track": {
              //   "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
              // },
              // "&::-webkit-scrollbar-thumb": {
              //   backgroundColor: "rgba(0,0,0,.1)",
              //   borderRadius: "5px",
              // },
            }}
            className="customized-scrollbar"
          >
             { mapView ? (
                <ReactFlow
                  elements={elements}
                  onElementClick={onElementClick}
                  onElementsRemove={onElementsRemove}
                  onConnect={onConnect}
                  onNodeDragStop={onNodeDragStop}
                  style={{ background: initBgColor }}
                  onLoad={onLoad}
                  nodeTypes={nodeTypes}
                  connectionLineStyle={connectionLineStyle}
                  snapToGrid={true}
                  snapGrid={snapGrid}
                  defaultZoom={1}
                  edgeTypes={edgeTypes}
                  minZoom={0.1}
                >
                </ReactFlow>
              ) : (
                <DocsView
                  elements={elements}
                  onElementClick={onElementClick}
                  selectedElement={selectedElement}
                  forceEndTask={forceEndTask}
                  setNodeTextEdit={setNodeTextEdit}
                />
              )}
          </div>
          {recordingComplete ||
            (showModal && (
              <div
                style={{
                  width: "40%",
                  padding: 25,
                  backgroundColor: "#F3F3F3",
                  borderRadius: 15,
                  overflowY: "auto"
                }}
              >
                <CompletedTranscript 
                  elements={elements}
                  transcripts={transcripts}
                  toggleRecording={toggleRecording}
                  agendaMap={agendaMap}
                  loadTrigger={loadTrigger}
                />
              </div>
            ))}
        </div>
      </div>
      <div
        style={{
          bottom: 0,
          right: 0,
        }}
      >
        {/* <EmptyProgress
            elements={elements}
            durationElements={durationElements}
            setDurationElements={setDurationElements}
          /> */}
        <NodeDialog
          nodeText={nodeText}
          setNodeText={setNodeText}
          AddNode={AddNode}
        />
      </div>
    </Layout>
  );
};

export default MindMap;
