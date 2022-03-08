import React from "react";
import { Typography } from '@material-ui/core';
class MeetingCenterMainPanelHeader extends React.Component {
  constructor(props) {
    super(props);
    const title = this.props.selectedMeeting && this.props.selectedMeeting.topic ?
      this.props.selectedMeeting.topic :
      "Work Station";
    this.state = {
      title,
      editable: false
    }
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if ( this.props.selectedMeeting && this.props.selectedMeeting.topic && this.props.selectedMeeting !== prevProps.selectedMeeting ) {
      this.setState({ title: this.props.selectedMeeting.topic });
    } else if (this.props.selectedMeeting && !this.props.selectedMeeting.topic && this.props.selectedMeeting !== prevProps.selectedMeeting) {
      this.setState({ title: "Work Station" });
    }
  }

  render() {
    return(
      <div
        className="assembo-text__title assembo-border-radius__standard"
        style={{
          display: "flex",
          color: "black",
          margin: "5px auto 5px 30px",
          width: "calc(100vw - 360px)"
        }}
      >
        <div
          style={{ 
            lineHeight: "55px",
            margin: "13px 10px 0 10px",
         }}
        ><Typography variant="h5">{this.state.title}</Typography>
        </div>
        {
          this.props.selectedMeeting &&
          <img 
            src={require("../../../assets/img/zoom.png").default}
            style={{
              margin: "10px 10px 10px 10px",
              height: "35px",
              width: "35px"
            }}
          />
        }
      </div>
    );
  }
}
  
export default MeetingCenterMainPanelHeader;