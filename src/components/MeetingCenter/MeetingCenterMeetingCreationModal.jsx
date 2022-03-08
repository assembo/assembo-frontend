import React from "react";
import { MEETING_PLATFORMS } from "../../constants/constants";
import { createZoomMeeting } from "../../utils/meetings/zoom";
import { connect } from "react-redux";


class MeetingCenterMeetingCreationModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: null,
      startTime: null,
      duration: null,
      agenda: null,
      type: 2,
      meetingPlatform: MEETING_PLATFORMS.ZOOM
    };
    this.topic = React.createRef();
    this.startTime = React.createRef();
    this.duration = React.createRef();
    this.agenda = React.createRef();
  }
  /**
   * wrapper function to create a meeting by various meeting utility functions
   * @returns new meeting data
   */
  createMeeting = async() => {
    try {
      if (this.props.user.zoomId && this.state.type && this.state.topic && this.state.duration && this.state.agenda) {
        if (this.state.meetingPlatform === MEETING_PLATFORMS.ZOOM) {
          const meetingData = {
            userId: this.props.user.zoomId,
            type: this.state.type,
            topic: this.state.topic,
            startTime: new Date(this.state.startTime).toISOString(),
            duration: this.state.duration,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            agenda: this.state.agenda,
          };
          const result = await createZoomMeeting(meetingData);
          this.closeModal();
          return result.meeting;
        }
      } else {

      }
    } catch (error) {
      console.error(`unable to create meeting ${error}.`);
    }
  };
  /**
   * function to close modal and clear data
   */
  closeModal = () => {
    // clear state
    this.setState({
      topic: null,
      startTime: null,
      duration: null,
      agenda: null,
      type: 2,
      meetingPlatform: MEETING_PLATFORMS.ZOOM
    });
    // clear input
    if (this.topic.current) { this.topic.current.value = "" }
    if (this.startTime.current) { this.startTime.current.value = "" }
    if (this.duration.current) { this.duration.current.value = "" }
    if (this.agenda.current) { this.agenda.current.value = "" }
  };

  render() {
    return (
      <div
        className="modal fade"
        id="meetingCreationModal"
        role="dialog"
        aria-hidden="true"
        aria-labelledby="meetingCreationModalLabel"
      >
        <div className="verticalCenter">
          <div className="modal-dialog" role="document">
            <div className="modal-content assembo-border-radius__standard ">
              <div className="assembo-text__large modal-header">
                Create Meeting
              </div>
              <div className="modal-body">
                <div className="content" style={{
                  display: "flex",
                  flexDirection: "column"
                }}>
                  <div className="assembo-text__medium">
                    <div
                      style={{
                        margin: "15px auto 15px auto"
                      }}
                    >Topic:</div>
                    <input ref={this.topic} onChange={(event)=>{ this.setState({topic: event.target.value}) }}></input>
                  </div>
                  <div className="assembo-text__medium">
                    <div
                      style={{
                        margin: "15px auto 15px auto"
                      }}
                    >Start Time:</div>
                    <input ref={this.startTime} type="datetime-local" onChange={(event)=>{ this.setState({startTime: event.target.value}) }}></input>
                  </div>
                  <div className="assembo-text__medium">
                    <div
                      style={{
                        margin: "15px auto 15px auto"
                      }}
                    >Duration:</div>
                    <input ref={this.duration}onChange={(event)=>{ this.setState({duration: event.target.value}) }}></input>
                  </div>
                  <div className="assembo-text__medium">
                    <div
                      style={{
                        margin: "15px auto 15px auto"
                      }}
                    >Agenda:</div>
                    <input ref={this.agenda} onChange={(event)=>{ this.setState({agenda: event.target.value}) }}></input>
                  </div>
                  <div
                    className="assembo-border-radius__standard assembo-black assembo-background-primary"
                    data-bs-dismiss="modal"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      height: "50px",
                      margin: "30px 30px 15px 30px"
                    }}
                    onClick={async()=> {
                      await this.createMeeting();
                    }}
                  >
                    <div
                      className="assembo-text__medium"
                      style={{
                        margin: "auto"
                      }}
                    >
                      CREATE
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  user: state.user.value,
});

export default connect(mapStateToProps, null)(MeetingCenterMeetingCreationModal);
