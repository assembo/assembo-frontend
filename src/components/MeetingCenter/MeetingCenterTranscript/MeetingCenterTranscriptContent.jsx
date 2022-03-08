import React from "react";
import BaseLoader from "../../BaseComponents/BaseLoader";
import DropRightMenu from "../../BaseComponents/DropRightMenu";
import MeetingCenterUserProfile from "../MeetingCenterSidePanel/MeetingCenterUserProfile";


class MeetingCenterTranscriptContent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const transcripts = this.props.transcripts;
    return (
      <div
        style={{
          overflowY: "auto",
          height: "500px"
        }}
      >
        {
          transcripts.map( (transcript) => {
            return (
              <div
                id="transcriptBlock"
                key={transcript._id}
                className="assembo-border-radius__standard"
                style={ 
                  { 
                    backgroundColor: "white",
                    flexGrow: "1",
                    margin: "15px 15px 15px 15px",
                  } 
                }
              >
                <div 
                  id="transcriptSentence"
                  className="assembo-border-radius__standard"
                  style={ 
                    { 
                      backgroundColor: "lightgray",
                      flexGrow: "1",
                    } 
                  }
                >
                  <div
                    style={{
                      display: "flex"
                    }}
                  >
                    <MeetingCenterUserProfile
                      styleOverride={{}}
                      user={transcript.userInfo}
                    />
                    <DropRightMenu
                      disable={false}
                      text=""
                      menuStyle={{
                        margin: "0 15px auto auto",
                      }}
                      items={[
                        // note that the bsToggle is a compromise to make bootstrap work with the current code
                        { title: "Add transcript", callback: ()=>{ this.props.insertTranscription(transcript.text) }, bsToggle: "", bsTarget: "" },
                      ]}
                    ></DropRightMenu>
                  </div>
                  <p style={{margin: "5px 15px auto 15px"}}>{transcript.text}</p>
                  <div id="results">
                    <span className="final" id="final_span"></span> <span className="interim" id="interim_span"></span>
                  </div>
                </div>
              </div>
            )
          })
        }
        <div ref={this.props.loadTrigger}
          style={ { display: 'flex'} }
        >
          { this.props.loading &&
            <BaseLoader /> }
        </div>
      </div>
    );
  }
}
  
export default MeetingCenterTranscriptContent;