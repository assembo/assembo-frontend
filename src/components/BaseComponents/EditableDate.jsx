import { dateISOStringFormatter } from "../../utils/helpers";
import "../../style/TextStyle.css";
export default function EditableDate(props) {
  if (!props.editable) {
    if (props.date !== null && props.date !== undefined) {
      const date = new Date(props.date).toLocaleDateString();
      return (
        <span className="assembo-text__medium" id={props.id}>{date}</span>
      );
    } else {
      return null;
    }
  } else {
    const date = props.date ? dateISOStringFormatter(new Date(props.date)) : dateISOStringFormatter(new Date());
    return (
      <div
        className="align-self-center"
        ref={props.ref}
      >
        <div
        className="d-flex flex-row"
        onClick={ (event) => { event.stopPropagation(); } } 
        >
          <input
            id="startDate"
            type="date"
            value={date}
            max="2031-01-01"
            min="2021-01-01"
            className="form-control validate-text"
            placeholder={date}
            onChange={(event) => { props.setDate(event.target.value) }}
          />
      </div>
    </div>
    );
  }
}