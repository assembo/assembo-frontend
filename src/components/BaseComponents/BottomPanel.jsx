export default function BottomPanel(props) {
  if (!props.display) return null;
  const lineStyle = {
    width: "80px",
    height: "10px",
    borderBottom: '5px solid rgb(167, 216, 219)',
    margin: "auto"
  };
  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        height: props.minimize ? "30px" : props.height,
        bottom: "0px",
        zIndex: "100"
      }}
    >
      <div
        style={{
          display: "flex",
          height: "30px",
          border: "1px solid #E5E5E5",
          width: "100vw",
          borderRadius: "12px 12px 0 0",
          margin: "0 auto 0 auto",
          backgroundColor: "white"
        }}
        onClick={ props.toggleMinimize }
      >
        {
          props.minimize ?
          <div
            style={lineStyle}
          >
          </div>:
          <div
            style={lineStyle}
          >
          </div>
        }
      </div>
      { !props.minimize && props.content}
    </div>
  );
;}
