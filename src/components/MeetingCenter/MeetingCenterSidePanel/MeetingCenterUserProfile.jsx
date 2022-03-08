import React from "react";
import { getUserLogoSrc } from  "../../../utils/helpers";

const MeetingCenterUserProfile = ({expanded, display, styleOverride, user}) => {
  return (
    <div
    style={ styleOverride ? styleOverride : {
      borderTop: "1px solid white"
    }}
  >
    <div
        style={{ display: "flex" }}
      >
      {
        user &&
        <img
          src={getUserLogoSrc(user.headimgurl, user.letterLogo, user.name)}
          alt="user_logo"
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "30px",
            border: "1px solid white"
          }}
        />
      }
      {
        (expanded || display) &&
        <div
          style={{ display: "flex", flexDirection: "column", color: "white", margin: "5px 0 0 15px" }}
        >
          <div
            className="assembo-text__large"
          >{this.state.user ? this.state.user.name : ""}</div>
          <div
            className="assembo-text__medium"
            style={{
              margin: "5px 0 0 0"
            }}
          >{user ? user.email : "" }</div>
        </div>
      }
    </div>
  </div>
  );
};
export default MeetingCenterUserProfile;