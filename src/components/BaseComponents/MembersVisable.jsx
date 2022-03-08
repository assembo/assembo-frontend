import EditableOwner from "./EditableOwner";
import { getUserLogoSrc } from "../../utils/helpers";
import Cookies from "js-cookie";
export default function MembersVisable(props) {
  return (
    <div
      onClick={props.onClick}
    >
      <div
        className="mt-n2 mb-0 d-flex"
        style={{
          flexDirection: "column"
        }}
      >
        <div 
          style={{
            fontFamily: "Microsoft Sans Serif",
            fontSize: "10px",
            fontWeight: "400",
            margin: "60px 0 0 47px"
          }}>
          管理员
        </div>
        <div 
          style={{
            fontFamily: "Microsoft Sans Serif",
            fontSize: "10px",
            fontWeight: "400",
            margin: "10px 0 0 47px"
          }}>
          <EditableOwner
            editable={props.editable}
            owner={props.owner}
            users={props.users}
            type={"TASK"}
            setOwner={props.setOwner}
          />
        </div>
        <div
          style={{
            fontFamily: "Microsoft Sans Serif",
            fontSize: "10px",
            fontWeight: "400",
            margin: "10px 0 0 47px"
          }}
        >
          队员
        </div>
        <div style={{ display: "flex", margin: "10px 0 0 47px" }}>
          <div className="d-flex" style={{ overflow: "auto" }}>
            {props.users.map((taskUser, index) => {
              if (taskUser) {
                return (
                  <div className="pe-1" key={index}>
                    <img
                      src={getUserLogoSrc(taskUser.headimgurl, Cookies.get("letterLogo"), taskUser.name)}
                      alt={taskUser.name}
                      style={{
                        width: "33px",
                        height: "33px",
                        cursor: "pointer",
                        borderRadius: "15px",
                        border: "1px solid lightgray",
                      }}
                    />
                  </div>
                );
              }
              return null;
            })}
          </div>
      </div>
      </div>
    </div>
  )
}