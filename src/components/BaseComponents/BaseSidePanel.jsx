import React from "react";

class BaseSidePanel extends React.Component {
  render() {
    return (
      <div
        className="d-flex"
        style={ 
          { 
            minHeight: "100vh",
            width: this.props.open ? 
             ( this.props.width ? this.props.width: "100vw" )
              : "0vw",
            position: "relative",
            backgroundColor: "white",
            zIndex: "101",
            transition: "width 0.5s"
          } 
        }
      >
      <div
        className="d-flex flex-column"
        style={
          { 
            backgroundColor: "rgb(167, 216, 219)",
            width: "100%",
            minHeight: "100vh"
          }
        }
      >
        {
          this.props.open && 
          <div
            className="d-flex flex-row"
            style={
              { color: "white" }
            }
            onClick={ this.props.close  }
          >
            <i
              className="fa fa-chevron-left font-17"
              style={
                { margin: "15px" }
              }
            >
            </i>
            <div
              style={
                {
                  margin: "13px auto 15px 0px"
                }
              }
            >
              Back</div>
          </div>
        }
          { this.props.open && this.props.content }
        </div>
      </div>
    );
  }
}

export default BaseSidePanel;