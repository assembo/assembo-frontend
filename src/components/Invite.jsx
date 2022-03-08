import React from "react";
import { Redirect } from "react-router";
import Cookies from "js-cookie";
import { checkExistInviteTask, addInviteTask } from "../utils/helpers";
import { createTask } from "../store/tasksSlice";
import { connect } from "react-redux";
import { createUserTaskMap } from "../store/userTaskMapsSlice";
import { createCard } from "../store/cardsSlice";
import "../style/Border.css";

class Invite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: undefined,
      inviteId: Cookies.get("inviteId"),
      inviteStatus: undefined,
    };
  }

  async componentDidMount() {
    await this.checkExistInviteTask();
  }

  checkExistInviteTask = async () => {
    Cookies.remove("inviteId", { sameSite: "Strict" });
    //check if exist task
    const result = await checkExistInviteTask(Cookies.get("userId"), this.state.inviteId);
    if (result.data.userTaskMap.exist) {
      this.setState({ redirect: true, inviteStatus: "accept" });
    } else {
      //if not exist
      this.clickButton();
    }
  };

  onInvite = async (option) => {
    if (option === "accept") {
      // add to userTaskMaps and get the invite task data
      const result = await addInviteTask(Cookies.get("userId"), this.state.inviteId);
      // update the frontend
      this.props.createTask(result.tasks[0]);
      result.userTaskMaps.forEach((x) => {
        this.props.createUserTaskMap(x);
      });
      result.cards.forEach((card) => {
        this.props.createCard(card);
      });
    }
    this.setState({ inviteModal: false, redirect: true, inviteStatus: option });
  };

  clickButton = () => {
    document.getElementById("btn-target").click();
  };

  render() {
    const { redirect, inviteId, inviteStatus } = this.state;
    if (redirect && !Cookies.get("inviteId") && inviteStatus === "accept") {
      // not a bug, just dont know why need two times
      window.history.pushState({}, "", "/app/meetingCenter");
      window.history.pushState({}, "", "/app/meetingCenter");
      return <Redirect to={`/taskContent/${inviteId}`} />;
    }

    if (redirect && !Cookies.get("inviteId") && inviteStatus === "reject") return <Redirect to="/meetingCenter" />;

    return (
      <div>
        <button id="btn-target" data-bs-toggle="modal" data-bs-target="#shareModal" className="btn disabled">
          click
        </button>
        <div
          className="modal fade"
          id="shareModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="verticalCenter">
            <div className="modal-dialog" style={{ margin: "center" }} role="document">
              <div className="modal-content assembo-border-radius__standard">
                <div className="modal-header mt-n3" style={{ borderBottom: "0 none" }}>
                  <h4 className="mt-4 mb-1 font-20 font-500 ps-2" id="shareModalLabel">
                    <img
                      className="rounded-s mt-2 mb-2"
                      src={require("../../assets/img/logo.png").default}
                      style={({ width: "60px" }, { height: "60px" })}
                      alt="assembo_logo"
                    />
                    欢迎加入此任务
                  </h4>
                </div>
                <div className="modal-body">
                  <div className="modal-footer flex-nowrap" style={{ borderTop: "0 none" }}>
                    <button
                      className="btn btn-full btn-center-xl font-16 font-600 rounded-m shadow-lg"
                      data-bs-dismiss="modal"
                      onClick={() => this.onInvite("reject")}
                    >
                      拒 绝
                    </button>
                    <button
                      className="btn btn-full btn-center-xl font-16 font-600 rounded-m shadow-sm bg-dark-dark"
                      data-bs-dismiss="modal"
                      onClick={() => this.onInvite("accept")}
                    >
                      接 受
                    </button>
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
  tasks: state.tasks.value,
  cards: state.cards.value,
  userTaskMaps: state.userTaskMaps.value,
  user: state.user.value,
});

const mapDispatchToProps = {
  createTask: createTask,
  createUserTaskMap: createUserTaskMap,
  createCard: createCard,
};

export default connect(mapStateToProps, mapDispatchToProps)(Invite);
