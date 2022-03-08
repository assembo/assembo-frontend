export default function DropLeftMenu(props) {
  if (!props.items) return null;
  return(
    <div className="btn-group dropleft"
      style={  props.disable ? {
        pointerEvents:  "none"
      } : {}
     }
    >
      <i
        className="fas fa-ellipsis-h font-16 color-white"
        data-bs-toggle={"dropdown"}
        style={{
          margin: "15px 15px auto auto"
        }}
        ></i>
      <div className="assembo-border-radius__standard dropdown-menu">
        { props.items.map(
            (item, index) => {
              return(
                <div className="assembo-text__medium dropdown-item"
                  key={index}
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