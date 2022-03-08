import "../../style/TextStyle.css";
export default function EditableTitle(props) {
  if (!props.editable) {
    return (
      <div
        className={props.largeText ? "assembo-text__large showFirstLine" : "assembo-text__medium showFirstLine"}
        style={{ fontFamily: "Microsoft Sans Serif", color: "#000000B2", fontSize: "16px", fontWeight: "400", width: "80vw" }}
        onClick={props.onClick}
      >
        {props.title}
      </div>
    );
  } else {
    return (
      <textarea
        className="rounded-s ps-2 mt-n2 mb-1 assembo-text__large color-black"
        style={{ display: "block", width: "100%" }}
        value={props.title}
        onChange={props.update}
        onClick={(event)=>{
          event.stopPropagation();
        }}
      />
    );
  }
};