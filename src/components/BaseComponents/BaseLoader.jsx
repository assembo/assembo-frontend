export default function BaseLoader(props) {
  if (!props.show) {
    return (
      <div
        className="d-flex flex-row assembo-border-radius__standard"
        style={{
          backgroundColor: "white",
          flexGrow: "1",
          margin: "15px"
        }}
      >
        <div
          className="assembo-text__large assembo-border-radius__standard"
          style={{
            backgroundColor: "rgb(167, 216, 219)",
            color: "white",
            margin: "15px auto 15px auto",
            width: props.width ? props.width : "60vw",
            textAlign: "center",
            height: "50px",
            lineHeight: "50px"
          }}
        >
          加载中
        </div>
      </div>
    );
  } else {
    return null;
  }
};