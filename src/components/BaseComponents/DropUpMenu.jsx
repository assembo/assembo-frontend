import "../../style/DropUp.css";
export default function DropUpMenu(props) {
  return (
    <div className="dropup">
    <button
      className="dropbtn"
      style={ { minWidth : "200px"} }
    >{props.text}</button>
      <div className="dropup-content">
        {
          props.items.map((item, index) => {
            return( 
              <div
                key={item._id}
                onClick={() => { props.onClick(item) }}
                >{item.title}</div>
            );
          })
        }
      </div>
    </div> 
  );
};