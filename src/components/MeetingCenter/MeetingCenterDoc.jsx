import React from "react";
import { connect } from "react-redux";
import Quill from 'quill';
import { Droppable } from "react-beautiful-dnd";
import { clearAllCardsToDeserialize, deleteCardFromCardsToDeserialize } from "../../store/meetingCenterSlice";

class MeetingCenterDoc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ""
    }
    this.editorContainer = React.createRef();
  }

  /**
   * initialize quill editor
   */
  componentDidMount() {
    /* instantiate the editor with options*/
    this.editor = new Quill(this.editorContainer.current, {
      modules: {
        toolbar: {
          container: '#toolbar',  // Selector for toolbar container
        },
      },
    });

    /** Set editor with predefined value */
    const delta = {
      ops: [
        /** Bold Formatting */
        {
          insert: "导入的卡片拖进来可以变成可编辑的文字",
        }
      ]
    };
    /* paint the editor with above delta*/
    this.editor.setContents(delta);
  }

  componentDidUpdate(prevProps) {
    if (this.props.cardsToDeserialize.length > 0) {
      const cardsToDeserialize = this.props.cardsToDeserialize.slice();
      this.props.clearAllCardsToDeserialize();
      let text = ""
      for (let index = 0; index < cardsToDeserialize.length; index++) {
        const card = cardsToDeserialize[index];
        if (card.title) {
          text += "##" + card.title + "\n";
        }
        if (card.description) {
          text += "###" + card.description + "\n";
        }
        text += "\n";
      }
      this.editor.insertText(0, text);
    }
  }

  render() {
    return (
      <div
        className="assembo-border-radius__standard"
        style={
          {
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            margin: "58px 30px 15px 30px",
            width: "700px",
            height: "800px"
          }
        }
      >
        <Droppable droppableId={"assembo-doc__container"}>
          {(provided) => {
            return (
              <div ref={provided.innerRef} {...provided.droppableProps}
              >
                <div id="toolbar"
                  style={{
                    display: "flex"
                  }}
                >
                  <div
                    className="assembo-text__title"
                    style={{
                      margin: "0 15px 0 15px",
                      color: "black",
                      lineHeight: "45px"
                    }}
                  >
                    会议中：笔记区
                  </div>
                  {/* <select class="ql-size">
                      <option value="10px">Small</option>
                      <option value="13px" selected>Normal</option>
                      <option value="18px">Large</option>
                      <option value="32px">Huge</option>
                    </select> */}
                  <button className="ql-bold">
                    <i className="fa font-15 fa-bold"
                      style={{
                        margin: "15px"
                      }}
                    ></i>
                  </button>
                  <button className="ql-underline">
                    <i className="fa font-15 fa-underline"
                      style={{
                        margin: "15px"
                      }}
                    ></i>
                  </button>
                  <button className="ql-strike">
                    <i className="fa font-15 fa-strikethrough"
                      style={{
                        margin: "15px"
                      }}
                    ></i></button>
                </div>
                <div
                  id="editor"
                  style={{
                    height: "700px"
                  }}
                  ref={this.editorContainer}
                ></div>
              </div>
            );
          }}
        </Droppable>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cardsToDeserialize: state.meetingCenter.value.cardsToDeserialize,
});

const mapDispatchToProps = {
  clearAllCardsToDeserialize,
  deleteCardFromCardsToDeserialize
};

export default connect(mapStateToProps, mapDispatchToProps)(MeetingCenterDoc);