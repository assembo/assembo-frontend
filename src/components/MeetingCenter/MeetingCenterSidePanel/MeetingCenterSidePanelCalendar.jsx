import React from "react";
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

class MeetingCenterCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateRange: [ new Date(), new Date() ]
    }
    this.props.setSelectedDate(this.state.dateRange)
  }
  /**
   * modify weekday inside of state
   * @param {dayData} data object that correspond to week of the day object in state
   */
  changeDate = (dates) => {
    if (dates.length !== 2) return;
    const sortedDates = dates[0] < dates[1] ? [dates[0], dates[1]] : [dates[1], dates[0]];
    this.setState({
      dateRange: sortedDates
    });
    this.props.setSelectedDate(sortedDates)
  }

  render() {
    return (
      <div
      className="assembo-border-radius__standard"
      style={{
        backgroundColor: "rgb(167, 216, 219)"
      }}
    >
      <div
        style={{
          display: "flex",
          margin: "15px"
        }}
      >
      </div>
      <div
        className="assembo-text__medium assembo-border-radius__standard"
        style={{
          display: "flex"
        }}
      >
        <DateRangePicker
          className="assembo__calendar-container"
          calendarClassName="assembo__calendar"
          onChange={(val)=>{ this.changeDate(val) }}
          value={this.state.dateRange}
          maxDetail={"month"}
        />
      </div>
      {/* <div
        style={{
          display: "flex",
          margin: "0 15px 0 15px"
        }}
      >
        <img 
          src={require("../../../assets/img/meeting-header-icon.png").default}
          style={{
            margin: "10px",
            height: "35px",
            width: "35px"
          }}
        />
        <div
          className="assembo-text__medium"
          style={{
            margin: "auto auto auto 15px",
            color: "black"
          }}
        >
          会议即将开始
        </div>
        <i className="far fa-caret-square-right font-16"
          style={{
            margin: "auto 10px auto 0",
          }}
        ></i>
      </div> */}
      {/* <div
        style={{
          display: "flex",
          margin: "0 15px 0 15px"
        }}
      >
        <img 
          src={require("../../../assets/img/video-meeting.png").default}
          style={{
            margin: "10px",
            height: "35px",
            width: "35px"
          }}
        />
        <div
          className="assembo-text__medium"
          style={{
            margin: "auto auto auto 15px",
            color: "black"
          }}
        >
          {`${today.getMonth()}月${today.getDate()}日  ${today.getHours() % 12}${today.getHours() > 12? "AM" : "PM"} 北京时间`}
        </div>
        <i className="far fa-caret-square-right font-16"
          style={{
            margin: "auto 10px auto 0",
          }}
        ></i>
      </div> */}
    </div>
    );
  }
}
  
export default MeetingCenterCalendar;