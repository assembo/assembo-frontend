export default function DropRightMenu(props) {
    if (!props.items) return null;
    const menuStyle = props.menuStyle ? props.menuStyle : {}
    if (props.disable) {
      menuStyle.pointerEvents = 'none'
    }
    return(
      <div className="btn-group dropright"
        style={  menuStyle }
      >
        <i
          className="fas fa-ellipsis-h font-16 color-white"
          data-bs-toggle={"dropdown"}
          style={
            props.buttonStyle ? props.buttonStyle : {
              margin: "15px auto auto 15px"
            }
          }
          ></i>
        {
            props.text &&
            <div
              className="assembo-text__medium"
              style={
                props.textStyle ? props.textStyle : {
                  lineHeight: "15px",
                  margin: "15px auto 15px 0"
                }
              }
            >
              {props.text}
            </div>
        }
        <div className="assembo-border-radius__standard dropdown-menu">
          { props.items.map(
              (item) => {
                return(
                  <div className="assembo-text__medium dropdown-item"
                    key={item.title}
                    data-bs-toggle={item.bsToggle}
                    data-bs-target={item.bsTarget}
                    onClick={ item.callback }
                  >{item.title}</div>
                );
              }
  
            )
          }
        </div>
      </div>
    );
  };