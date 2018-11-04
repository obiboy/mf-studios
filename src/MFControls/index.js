import React from 'react'
//import VolumeSample from '../Functions/volume-sample.js'
import playArrowIcon from '../material/play_arrow.svg'
import pauseIcon from '../material/pause.svg'
import stopIcon from '../material/stop.svg'
import micIcon from '../material/mic.svg'

export function MFControls (props) {
  return (
    <div style={{textAlign: 'center', padding: '2vh 0', borderBottom: '1px solid black'}}>
      <a href="#">
        <img src={props.playing ? playArrowIcon : pauseIcon} />
      </a>
      <a href="#">
        <img src={stopIcon} />
      </a>
      <a href="#" style={{color: props.recording ? 'red' : 'inherit'}}>
        <img src={micIcon} />
      </a>
  </div>)}

export function MFMixer (props){
  return(
    <div style={{textAlign: 'left', padding: '2vh 0', borderBottom: '1px solid black'}}>
      <input type="range" min="0" max="100" value="100" oninput="sample.changeVolume(this);">
    <div>)}

<script type="text/javascript" async="" src="https://ssl.google-analytics.com/ga.js"></script>
<script src="/static/js/shared.js"></script>
<script src="volume-sample.js"></script>
<script>
var sample = new VolumeSample();
</script>
