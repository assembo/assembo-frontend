import React from "react";
import { connect } from "react-redux";
import { getTimeStamp } from "../../utils/helpers";
import { addTranscript, getMeetingTranscripts } from "../../utils/transcripts/transcript";
import ZoomMtgEmbedded from "@zoomus/websdk/embedded";
import { generateSignature } from "../../utils/meetings/zoom";
import { apiKey, apiSecret } from "../../zoomAPISecretes";
import PostMeetingContent from "../PostMeetingContent"

const client = ZoomMtgEmbedded.createClient()

class MeetingCenterPostMeeting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recognizing: false,
      interimBox: null,
      finalTranscript: null,
      ignoreOnend: null,
      voiceRecognitionAvailable: false,
      transcripts: [],
      loading: false,
      prevY: 0
    }
    this.recognition = null;
    this.loader = React.createRef();
  }

  componentDidMount = () => {
    let meetingSDKElement = document.getElementById('meetingSDKElement');

    client.init({
      debug: true,
      zoomAppRoot: meetingSDKElement,
      language: 'en-US',
      customize: {
        meetingInfo: ['topic', 'host', 'mn', 'pwd', 'telPwd', 'invite', 'participant', 'dc', 'enctype'],
        toolbar: {
          buttons: [
            {
              text: 'Custom Button',
              className: 'CustomButton',
              onClick: () => {
                console.log('custom button');
              }
            }
          ]
        }
      }
    });
    this.setupWebkitSpeechRecognition();
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0
    };
    this.observer = new IntersectionObserver(
      this.handleObserver.bind(this),
      options
    );
    if (this.loader.current) this.observer.observe(this.loader.current);
  }

  componentDidUpdate = async (prevProps) => {
    if (this.props.selectedMeeting && this.props.selectedMeeting.id) {
      if (prevProps.selectedMeeting !== this.props.selectedMeeting ) {
        this.setState({ transcripts: [] });
        await this.getTranscripts(this.props.selectedMeeting.id, 0);
      }
    }
    if (this.props.zoomMeetingToActivate && this.props.zoomMeetingToActivate.meetingNumber) {
      if (prevProps.zoomMeetingToActivate !== this.props.zoomMeetingToActivate ) {
        this.join(this.props.zoomMeetingToActivate);
      }
    }
  }
  /**
   * function triggered by intersection observer
   * @param {Object} entities 
   */
  handleObserver = async(entities) => {
    const y = entities[0].boundingClientRect.y;
    if (this.state.prevY > y) {
      if (this.state.transcripts.length) {
        const lastTranscript = this.state.transcripts[this.state.transcripts.length - 1];
        const transcriptId = lastTranscript._id;
        await this.getTranscripts(this.props.selectedMeeting.id, transcriptId);
      }
    }
    this.setState({ prevY: y });
  }

  /**
   * function to trigger zoom meeting
   * @param {*} Object that represent meeting data 
   */
  join( {role, password, meetingNumber} ) {
    const signature = generateSignature({ role, apiSecret, meetingNumber });
    const meetingInfo = {
      apiKey: apiKey,
      signature: signature,
      meetingNumber: meetingNumber,
      userName: this.props.user.name
    }
    if (password) {
      meetingInfo.password = password;
    }
    client.join(meetingInfo);
  }

  /**
   * function to start voice transcription
   * @param {Number} meetingId - meeting's id
   * @param {string} transcriptId last transcripts id
   */
  getTranscripts = async(meetingId, transcriptId) => {
    const transcripts = await getMeetingTranscripts(meetingId, transcriptId);
    if (transcripts && transcripts.length) {
      this.setState(prevState => ({
        transcripts: [...prevState.transcripts, ...transcripts]
      }));
    }
  }

  /**
   * function to start voice transcription
   */
  startButton = () => {
    if (this.state.recognizing) {
      this.setState({
        recognizing: false
      });
      this.recognition.stop();
      return;
    }
    this.setState({
      finalTranscript: "",
      ignoreOnend: false
    });
    this.recognition.lang = "en-US";
    this.recognition.start();
  }

  setupWebkitSpeechRecognition = () => {
    if ("webkitSpeechRecognition" in window) {
      this.recognition = new window.webkitSpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.setState({
        voiceRecognitionAvailable: true
      })

      this.recognition.onstart = () => {
        this.setState({
          recognizing: true,
        })
      };

      this.recognition.onerror = (event) => {
        if (event.error == "no-speech") {
          this.setState({ignoreOnend: true});
        }
        if (event.error == "audio-capture") {
          this.setState({ignoreOnend: true});
          console.warn("audio capture error")
        }
        if (event.error == "not-allowed") {
          this.setState({ignoreOnend: true});
          console.error("recognition not allowed")
        }
      };

      this.recognition.onend = () => {
        this.setState({recognizing: false});
        if (this.state.ignoreOnend) {
          return;
        }
        if (!this.state.finalTranscript) {
          return;
        }
      };

      this.recognition.onresult = async (event) => {
        this.setState({
          interim_transcript: ""
        })
        if (typeof event.results == "undefined") {
          this.recognition.onend = null;
          this.recognition.stop();
          return;
        }
        for (var i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            this.setState({
              finalTranscript: this.state.finalTranscript + event.results[i][0].transcript,
              interimBox: null
            });
            const text = event.results[i][0].transcript;
            const now = new Date();
            const transcriptData = {
              timeStamp: getTimeStamp(now),
              userId: this.props.user._id,
              meetingId: this.props.selectedMeeting.id,
              meetingType: this.props.selectedMeetingType,
              text: text
            }
            await addTranscript(transcriptData);

          } else {
            this.setState({
              interim_transcript: this.state.interim_transcript + event.results[i][0].transcript,
              interimBox: this.state.interim_transcript + event.results[i][0].transcript
            })
          }
        }
      };
    }
  }

  render() {
    return (
      <div
        className="assembo-border-radius__standard"
        style={ 
          { 
            display: "flex",
            float: "right",
            flexDirection: "column",
            flexGrow: "1",
            margin: "10px 30px 15px 30px",
            width: "calc(-390px + 60vw)",
            height: "calc(-95px + 100vh)"
          } 
        }
      >
        { false &&
          <PostMeetingContent 
            recording={this.props.recording}
            agendaToggle={ async() =>{ await this.props.toggleRecording() } }
            recognizing={this.state.recognizing}
            transcriptToggle={this.startButton}
            users={this.props.users}
            transcripts={this.state.transcripts}
            loadTrigger={this.loader}
            loading={this.state.loading}
            insertTranscription={this.props.insertTranscription}
          />
        }
        <div id="meetingSDKElement"
          style={{
            display: "flex",
            position: "absolute",
            top: "690px",
            right: "65px"
          }}
        >
          {/* // <!-- Zoom Meeting SDK Rendered Here --> */}
        </div>
      </div>
      
    );
  }
};

const mapStateToProps = (state) => ({
  user: state.user.value,
  users: state.users.value
});

export default connect(mapStateToProps, null)(MeetingCenterPostMeeting);