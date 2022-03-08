import React from "react";
import BeforeMeeing from "./BeforeMeeing";

class MeetingCenterPreMeeting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
            backgroundColor: "rgb(229, 229, 229)",
            margin: "58px 30px 15px 30px",
            minWidth: "280px"
          } 
        }
      >
        <BeforeMeeing
          {...this.props.selectedMeeting }
          cardIndexToDeserialize={this.props.cardIndexToDeserialize}
        ></BeforeMeeing>
      </div>
    );
  }
}
  
export default MeetingCenterPreMeeting;