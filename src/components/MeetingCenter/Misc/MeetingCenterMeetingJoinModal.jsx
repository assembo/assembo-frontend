import React from "react";
import { connect } from "react-redux";
import { getZoomMeeting } from "../../../utils/meetings/zoom";
import { MEETING_PLATFORMS } from "../../../constants/constants";
import { setSelectedMeeting } from "../../../store/meetingCenterSlice";


class MeetingCenterMeetingJoinModal extends React.Component {
  constructor(props) {
    super(props);
    this.joinURL = React.createRef();
    this.state = {
      joinURL: null
    }
  }
  /**
   * wrapper function to join a meeting by various meeting utility functions
   * @returns new meeting data
   */
  joinMeeting = async() => {
    try {
      if (this.props.user.zoomId && this.state.joinURL) {
        const idParam = "https://us02web.zoom.us/j/";
        const idStart = this.state.joinURL.indexOf(idParam);
        // length of zoom meeting id to search for
        const idLength = 11;
        const meetingNumber = this.state.joinURL.substring(idStart+idParam.length, idStart+idParam.length+idLength);
        const meeting = await getZoomMeeting(meetingNumber);
        const selectedMeeting = {
          created_at: meeting.created_at,
          duration: meeting.duration,
          host_id: meeting.host_id,
          id: meeting.id,
          join_url: meeting.join_url,
          start_time: meeting.start_time,
          timezone: meeting.timezone,
          topic: meeting.topic,
          type: meeting.type,
          uuid: meeting.uuid,
        }
        this.props.setSelectedMeeting(selectedMeeting);
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
      joinURL: null,
    });
    // clear input
    if (this.joinURL.current) { this.joinURL.current.value = "" }
  };

  render() {
    return (
      <div
        className="modal fade"
        id="meetingJoinModal"
        role="dialog"
        aria-hidden="true"
        aria-labelledby="meetingJoinModalLabel"
      >
        <div className="verticalCenter">
          <div className="modal-dialog" role="document">
            <div className="modal-content assembo-border-radius__standard ">
              <div className="assembo-text__large modal-header">
                Join Meeting
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
                    >Join URL:</div>
                    <input ref={this.joinURL} onChange={(event)=>{ this.setState({joinURL: event.target.value}) }}></input>
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
                    onClick={this.joinMeeting}
                  >
                    <div
                      className="assembo-text__medium"
                      style={{
                        margin: "auto"
                      }}
                    >
                      JOIN
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

const mapDispatchToProps = {
  setSelectedMeeting
};

export default connect(mapStateToProps, mapDispatchToProps)(MeetingCenterMeetingJoinModal);