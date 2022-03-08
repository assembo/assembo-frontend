export default function BaseIconButton(props) {
  const iconName = `fa font-16 fa-${props.icon}`
  const styleObject = props.style ? props.style : {
    margin: "5px",
    color: "white",
  }
  styleObject.opacity = props.disable ? "0.5" : "1"
  return (
    <div
      className=""
      style={ styleObject }
      onClick={ props.disable ?  ()=>{} : props.callback}
    >
      <i className={iconName}></i>
    </div>
  );
  };