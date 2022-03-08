import { getUserLogoSrc } from "../../utils/helpers";
import Cookies from "js-cookie";
export default function MembersDisplay(props) {
  return (
    <div>
      <div style={{ display: "flex" }} className="mt-1 mb-1">
        <div className="d-flex" style={{ overflow: "auto" }}>
          {props.users.map((taskUser, index) => {
            if (taskUser) {
              return (
                <div className="pe-1" key={index}>
                  <img
                    src={getUserLogoSrc(taskUser.headimgurl, Cookies.get("letterLogo"), taskUser.name)}
                    alt={taskUser.name}
                    style={{
                      width: "24px",
                      height: "24px",
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
  )
}