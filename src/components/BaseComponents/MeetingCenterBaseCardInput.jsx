import React from "react";

class MeetingCenterBaseCardInput extends React.Component {
    constructor(props) {
      super(props);
      const title = this.props.selectedMeeting && this.props.selectedMeeting.title ?
        this.props.selectedMeeting.title :
        "未命名工作台";
      this.state = {
        title,
        editable: false
      }
    }
    render() {
      return(
        <div
          style={{
            display: "flex"
          }}
          onClick={ () => {
            const editable = !this.state.editable;
            this.setState({ editable });
          } }
        >
          <img 
            src={require("../../assets/img/meeting-header-icon.png").default}
            style={{
              margin: "10px 10px 10px 30px",
              height: "38px",
              width: "38px"
            }}
          />
          <div
            className="assembo-text__title"
            style={{
              color: "black",
              lineHeight: "38px",
              margin: "auto auto auto 0",
              display: "flex"
            }}
          >
            <EditableTitle 
              editable={ this.state.editable }
              largeText={true}
              title={this.state.title}
              update={ (event) => { this.setState({ "title": event.target.value }) } }
              onClick={ () => {} } />
          </div>
        </div>
      );
    }
  }
    
  export default MeetingCenterMainPanelHeader;