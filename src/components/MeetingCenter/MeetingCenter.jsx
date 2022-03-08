import React from "react";
import { setAllMeetings } from "../../store/meetingsSlice";
import { connect } from "react-redux";
import MeetingCenterMainPanel from "./MeetingCenterMainPanel";
import { MEETING_PLATFORMS } from "../../constants/constants";
import { generateSignature, getMeetingData, getZoomMeetings } from "../../utils/meetings/zoom";
import { getAgendMap } from "../../utils/agendaMaps/agendaMaps";
import { addTranscript, getMeetingTranscripts } from "../../utils/transcripts/transcript";
import { getTimeStamp } from "../../utils/helpers";
import ZoomMtgEmbedded from "@zoomus/websdk/embedded";
import { apiKey, apiSecret } from "../../zoomAPISecretes";

class MeetingCenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      done: false,
      expandSidePanel: true,
      searchText: "",
      page: 0, // page used for db pagination,
      prevY: 0, // a number to indicate the bottom most part that the cards has reached in dom
      loading: false,
      layout: "工作台",
      selectedDate: null,
      selectedMeeting: null,
      selectedMeetingType: MEETING_PLATFORMS.ZOOM,
      zoomMeetingToActivate: null,
      selectedAgendaMapId: null,
      agendaMap: null,
      transcripts: [],
      recognizing: false,
      interimBox: null,
      finalTranscript: null,
      ignoreOnend: null,
      voiceRecognitionAvailable: false,
    };
    window.mc = this;
  }

  async componentDidMount() {
    let meetingSDKElement = document.getElementById('meetingSDKElement');
    this.client = ZoomMtgEmbedded.createClient();
    this.client.init({
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
    const interval_time = 10000;

    setInterval(async () => {
      if (this.state.selectedAgendaMapId) {
        const agendaMap = await getAgendMap(this.state.selectedAgendaMapId);
        this.setState({ agendaMap: null });
        this.setState({ agendaMap });
      }
    }, interval_time);
    this.setupWebkitSpeechRecognition();

    if (!this.props.user || !this.props.user.zoomId || this.props.meetings.length !== 0) {
      return;
    }
    await this.getMeetings();
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.selectedMeeting !== prevProps.selectedMeeting && this.props.selectedMeeting && this.props.selectedMeeting.id) {
      const meetingData = await getMeetingData(this.props.selectedMeeting.id);
      const mindMap = meetingData.mindMap;
      this.setState({selectedAgendaMapId: mindMap });
      this.setState({ transcripts: [] });
      await this.getTranscripts(this.props.selectedMeeting.id, 0);
      const agendaMap = await getAgendMap(this.state.selectedAgendaMapId);
      this.setState({ agendaMap: null });
      this.setState({ agendaMap });
      const role = this.props.user.zoomId === this.props.selectedMeeting.host_id ? 1 : 0;
      const meetingNumber = this.props.selectedMeeting.id;
      const joinUrl = this.props.selectedMeeting.join_url;
      const pwdParam = 'pwd=';
      const start = joinUrl.indexOf(pwdParam);
      const password = joinUrl.substring(start + pwdParam.length, joinUrl.length);
      this.join({ role, password, meetingNumber });
    }

    if (this.state.zoomMeetingToActivate && this.state.zoomMeetingToActivate.meetingNumber) {
      if (prevState.zoomMeetingToActivate !== this.state.zoomMeetingToActivate ) {
        this.join(this.state.zoomMeetingToActivate);
      }
    }

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
      this.client.join(meetingInfo);
    }

  /**
   * function to start voice transcription
   * @param {Number} meetingId - meeting's id
   * @param {string} transcriptId last transcripts id
   */
  getTranscripts = async(meetingId, transcriptId) => {
    const transcripts = await getMeetingTranscripts(meetingId, transcriptId);
    console.log(transcripts)
    if (transcripts && transcripts.length) {
      this.setState(prevState => ({
        transcripts: [...prevState.transcripts, ...transcripts]
      }));
    }
  }

  /**
   * wrapper function for retrieveing meetings
  */
  async getMeetings() {
    const meetings = await getZoomMeetings(this.props.user.zoomId);
    this.props.setAllMeetings(meetings);
  };

  /**
   * function to start voice transcription
   */
   startButton = () => {
    console.log("start recording")
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
              meetingType: this.state.selectedMeetingType,
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
    const selectedMeeting = this.props.selectedMeeting;
    return (
      <div
        style={{
          display: "flex",
          backgroundColor: "rgb(229, 229, 229)"
        }}
      >
        <MeetingCenterMainPanel
          agendaMap={ this.state.agendaMap }
          selectedMeeting={selectedMeeting}
          selectedMeetingType={this.state.selectedMeetingType}
          layout={this.state.layout}
          zoomMeetingToActivate={this.state.zoomMeetingToActivate}
          transcripts={this.state.transcripts}
          toggleRecording={this.startButton}
          getTranscripts={this.getTranscripts}
        />
        <div id="meetingSDKElement"
        ></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.value,
  users: state.users.value,
  meetings: state.meetings.value,
  selectedMeeting: state.meetingCenter.value.selectedMeeting,
  recording: state.meetingCenter.value.recording
});

const mapDispatchToProps = {
  setAllMeetings
};

export default connect(mapStateToProps, mapDispatchToProps)(MeetingCenter);
