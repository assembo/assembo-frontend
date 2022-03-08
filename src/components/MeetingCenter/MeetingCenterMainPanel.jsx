import React from "react";
import { connect } from "react-redux";
import { insertTextIntoAgendaTree, modifyAgendaTree, userInsertTextIntoAgendaTree } from "../../utils/documents/google";
import MeetingCenterMainPanelHeader from "./MeetingCenterMainPanel/MeetingCenterMainPanelHeader";
import MeetingCenterMeetingCreationModal from "./MeetingCenterMeetingCreationModal";
import LinkUserModal from "./Misc/LinkUserModal";
import MeetingCenterPostMeeting from "./MeetingCenterPostMeeting";
import MeetingCenterMeetingJoinModal from "./Misc/MeetingCenterMeetingJoinModal";
import MindMap from "../MindMap/MindMap";

class MeetingCenterMainPanel extends React.Component {
  constructor(props) {
    super(props);
    window.mcmp = this;
    this.state = {
      recording: false,
      docId: null,
      agenda: [],
      cardIndexToDeserialize: null,
      currentAgendaNodeIndex: 0,
    }
    this.loader = React.createRef();
    this.observing = false;
  }

  componentDidMount() {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0
    };
    this.observer = new IntersectionObserver(
      this.handleObserver.bind(this),
      options
    );
  }

  /**
   * function triggered by intersection observer
   * @param {Object} entities 
   */
   handleObserver = async(entities) => {
    const y = entities[0].boundingClientRect.y;
    if (this.state.prevY > y) {
      if (this.props.transcripts.length) {
        const lastTranscript = this.props.transcripts[this.props.transcripts.length - 1];
        const transcriptId = lastTranscript._id;
        await this.props.getTranscripts(this.props.selectedMeeting.id, transcriptId);
      }
    }
    this.setState({ prevY: y });
  }

  /**
   * Function to toggle recording mode for meeting
   * will increment agenda node and modify google doc content
   */
  toggleRecording = async () => {
    const preNodeIndex = this.state.currentAgendaNodeIndex + 0;
    const currentAgendaNodeIndex = this.state.agenda.length ? (this.state.currentAgendaNodeIndex + 1) % this.state.agenda.length :
      0;
    this.setState( { 
      recording: !this.state.recording,
      currentAgendaNodeIndex: currentAgendaNodeIndex
    });
    if (this.state.agenda.length && this.state.docId && this.props.selectedMeeting) {
      const node = this.state.agenda[currentAgendaNodeIndex];
      const agendaData = {
        docId: this.state.docId,
        nodeText: node.text,
      }
      if (currentAgendaNodeIndex !== preNodeIndex) {
        const preNode = this.state.agenda[preNodeIndex];
        agendaData['previousNodeText'] = preNode.text;
      }
      await modifyAgendaTree(agendaData);
    }
  };

  /**
   * Function to add transcription into google doc 
   * note this is a bit too hacky and should be modified later on
   */
  insertTranscription = async (text)=> {
    if (!this.state.docId || this.state.agenda.length === 0 || !text) return;
    const host = this.props.selectedMeeting.host_id === this.props.user.zoomId;
    const modifiedText = `- ${text}\n`
    if (host) {
      const node = this.state.agenda[this.state.currentAgendaNodeIndex];
      const data = {
        text: modifiedText,
        nodeText: node.text,
        docId: this.state.docId
      }
      await insertTextIntoAgendaTree(data);
    } else {
      const data = {
        text: modifiedText,
        docId: this.state.docId
      }
      await userInsertTextIntoAgendaTree(data);
    }
  };

  render() {
    return (
      <div
        style={ 
          { 
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            background: "#F5F6F8",
          } 
        }
      >
        <MeetingCenterMainPanelHeader 
          selectedMeeting={this.props.selectedMeeting}
        >
        </MeetingCenterMainPanelHeader>
        <div
          style={{
            display: "flex",
            flexDirection: "row"
          }}
        >
          <div
            className="assembo-border-radius__standard"
            style={{
              width: false ? "30vw" : "60vw",
              margin: "10px 0 30px 30px",
              background: "white"
            }}
          >
            {
              this.props.agendaMap &&
              <MindMap
                agendaMap={ this.props.agendaMap }
                transcripts={this.props.transcripts}
                toggleRecording={this.props.toggleRecording}
                loadTrigger={this.loader}
              ></MindMap>
            }
          </div>
          <MeetingCenterPostMeeting 
            selectedMeeting={this.props.selectedMeeting}
            selectedMeetingType={this.props.selectedMeetingType}
            recording={this.state.recording}
            toggleRecording={this.toggleRecording}
            insertTranscription={this.insertTranscription}
            zoomMeetingToActivate={this.props.zoomMeetingToActivate}
          ></MeetingCenterPostMeeting>
        </div>
        <MeetingCenterMeetingCreationModal />
        <MeetingCenterMeetingJoinModal 
        />
        <LinkUserModal />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.value,
});

export default connect(mapStateToProps, null)(MeetingCenterMainPanel);