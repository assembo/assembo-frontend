import { getUserLogoSrc } from "../../utils/helpers";

export default function EditableOwner(props) {
  const taskUsers = props.users ? props.users : [];
  let owner = props.owner ? props.owner : null;
  const ownerIconStyle =
    props.type === "TASK"
      ? {
          marginTop: "0px",
          marginLeft: "0px",
          marginBottom: "5px",
          marginRight: "0px",
        }
      : {
          marginTop: "0px",
          marginLeft: "10px",
          marginBottom: "10px",
          marginRight: "0px",
        };
  if (!props.editable) {
    return (
      <div className="align-self-center d-flex flex-row">
        {owner && (
          <div className="" style={ownerIconStyle}>
            <img
              src={getUserLogoSrc(owner.headimgurl, "", owner.userName)}
              alt={owner.userName}
              style={{
                width: "33px",
                height: "33px",
                cursor: "pointer",
                borderRadius: "15px",
                border: "1px solid lightgray",
                filter: props.colorOverWrite ? "grayscale(1)" : "grayscale(0)"
              }}
            />
          </div>
        )}
      </div>
    );
  }
  return (
    <div className="mx-1 d-flex" style={{ overflow: "auto" }}>
      {taskUsers.map((taskUser, index) => {
        if (taskUser) {
          const border = owner && taskUser._id === owner._id ? "3px solid #43D4B3" : "1px solid lightgray";
          if (taskUser) {
            return (
              <div
                className="pe-1"
                key={index}
                onClick={() => {
                  props.setOwner(taskUser);
                }}
              >
                <img
                  key={index}
                  src={getUserLogoSrc(taskUser.headimgurl, "", taskUser.name)}
                  alt={taskUser.name}
                  style={{
                    width: "33px",
                    height: "33px",
                    cursor: "pointer",
                    borderRadius: "15px",
                    border: border,
                  }}
                />
              </div>
            );
          }
        }
        return null;
      })}
    </div>
  );
}
