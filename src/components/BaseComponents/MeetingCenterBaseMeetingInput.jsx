import React from "react";
import { connect } from "react-redux";
import { createTask as createTaskLocal } from "../../store/tasksSlice";
import { createUserTaskMap } from "../../store/userTaskMapsSlice";

class MeetingCenterBaseMeetingInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "CREATE MEETING"
    }
  }
  render() {
    return(
      <div>
        <div
          className="assembo-text__large assembo-border-radius__standard assembo-black assembo-background-primary"
          style={{
            display: "flex",
            flexDirection: "column",
            height: "50px",
            margin: "15px 30px 15px 30px"
          }}
          data-bs-toggle="modal"
          data-bs-target="#meetingCreationModal"
        >
          <div
            style={{
              margin: "auto"
            }}
          >
            CREATE MEETING
          </div>
        </div>
        <div
          className="assembo-text__large assembo-border-radius__standard assembo-black assembo-background-primary"
          style={{
            display: "flex",
            flexDirection: "column",
            height: "50px",
            margin: "15px 30px 15px 30px"
          }}
          data-bs-toggle="modal"
          data-bs-target="#meetingJoinModal"
        >
          <div
            style={{
              margin: "auto"
            }}
          >
            JOIN MEETING
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tasks: state.tasks.value,
  userTaskMaps: state.userTaskMaps.value,
  user: state.user.value,
});

const mapDispatchToProps = {
  createTask: createTaskLocal,
  createUserTaskMap,
};
    
export default connect(mapStateToProps, mapDispatchToProps)(MeetingCenterBaseMeetingInput);
