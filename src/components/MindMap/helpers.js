import { getUserLogoSrc } from "../../utils/helpers";

export const milliSecondToTime = (milliseconds) => {
    var hours = milliseconds / (1000 * 60 * 60);
    var absoluteHours = Math.floor(hours);
    var h = absoluteHours > 9 ? absoluteHours : "0" + absoluteHours;
  
    //Get remainder from hours and convert to minutes
    var minutes = (hours - absoluteHours) * 60;
    var absoluteMinutes = Math.floor(minutes);
    var m = absoluteMinutes > 9 ? absoluteMinutes : "0" + absoluteMinutes;
  
    //Get remainder from minutes and convert to seconds
    var seconds = (minutes - absoluteMinutes) * 60;
    var absoluteSeconds = Math.floor(seconds);
    var s = absoluteSeconds > 9 ? absoluteSeconds : "0" + absoluteSeconds;
  
    if (h != "00") {
      return `${h} h ${m} m ${s} s`;
    } else if (m != "00") {
      return `${m} m ${s} s`;
    } else {
      return `${s} s`;
    }
  };

  export const getSortedListOfTopics = (listOfTopics) => {
    function compare(a, b) {
      if (a.id.split("-")[1] < b.id.split("-")[1]) {
        return -1;
      }
      if (a.id.split("-")[1] > b.id.split("-")[1]) {
        return 1;
      }
      return 0;
    }
  
    const sortedIds = listOfTopics.sort(compare);
    return sortedIds;
  };


  export const transcriptConverter = (transcripts) => {
    const result = [];
    for (let i = 0; i < transcripts.length; ++i) {
      const transcript = transcripts[i];
      const userInfo = transcript ? transcript.userInfo : null;
      const timeStamp = transcript.timeStamp;
      const offsetTime = timeStamp ? new Date(timeStamp.time + timeStamp.offset * 60 * 1000) : new Date();
      if (transcript && userInfo) {
        const data = {
          profilePic: userInfo.headimgurl ? userInfo.headimgurl : getUserLogoSrc(userInfo.headimgurl, userInfo.letterLogo, userInfo.name),
          name: userInfo.name ? userInfo.name : "Anonymous",
          message: transcript.text,
          time: offsetTime.toLocaleTimeString(),
          meetingId: transcript.meetingId
        }
        result.push(data);
      }
    }
    return result;
  }; 
