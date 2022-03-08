import "../../style/SwitchToggle.css";
import "../../style/TextStyle.css";
export default function SwitchToggle(props) {
  return (
    <label 
      className="switch"
      onClick={ (event) => { 
        event.stopPropagation();
        } 
      }
    >
      <input type="checkbox" 
        checked={props.checked}
        onChange={props.toggle}
      />
    <div className="slider round">
      {
        props.checked ?
        <span className="switch-toggle__on assembo-text__small">{ props.checkedText }</span> :
        <span className="switch-toggle__off assembo-text__small">{ props.uncheckedText }</span>
      }
    </div>
    </label>
  );
};