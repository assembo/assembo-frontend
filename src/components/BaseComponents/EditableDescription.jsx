export default function EditableDescription(props) {
  const description = props.description ? props.description : "添加更详细的内容";
  const descriptionTextStyle = { whiteSpace: "pre-wrap", fontFamily: "Microsoft Sans Serif", color: "#00000080", fontSize: "14px", fontWeight: "400" };
  if (!props.editable) {
    return (
      <div
        className="font-14 color-dark-dark" 
        style={descriptionTextStyle}
        onClick={props.onClick}
      >
        {description}
      </div>
    );
  } else {
    return (
      <textarea
        ref={props.ref}
        className="rounded-s ps-2 mb-1 font-14 font-500 color-black"
        style={{ display: "block", width: "100%" }}
        value={props.description}
        onChange={props.update}
        onClick={(event)=>{
          event.stopPropagation();
        }}
      />
    );
  }
};
  