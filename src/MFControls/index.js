import React from 'react'
//import VolumeSample from '../Functions/volume-sample.js'
import playArrowIcon from '../material/play_arrow.svg'
import pauseIcon from '../material/pause.svg'
import stopIcon from '../material/stop.svg'
import micIcon from '../material/mic.svg'
import loopIcon from '../material/loop.svg'

// Sorry
const makeMySVGRed = {filter: 'invert(0.3) sepia(1) saturate(10) hue-rotate(-30deg)'}
const makeMySVGGray = {filter: 'invert(0.3) sepia(1) saturate(10) hue-rotate(-30deg)'}


// TODO
// <a href="#" onClick={props.toggleLooping} style={props.looping ? {} : makeMySVGGray}>
//   <img src={loopIcon} />
// </a>


export function MFControls (props) {
  return (<div style={{textAlign: 'center', padding: '2vh 0', borderBottom: '1px solid black'}}>
    <span>{props.time}</span>
    <a href="#" onClick={props.togglePlaying} style={{
      verticalAlign: 'middle',
      border: '1px solid grey',
      padding: '1vh'
    }}>
      <img src={props.playing ? stopIcon : playArrowIcon} />
    </a>
    <a href="#" onClick={props.toggleRecording} style={props.recording ? makeMySVGRed : {
      verticalAlign: 'middle',
      border: '1px solid grey',
      padding: '1vh'
    }}>
      <img src={micIcon} />
    </a>
    <input onChange={e => props.updateBPM(e.target.value)} value={props.bpm} style={{
      verticalAlign: 'middle',
      textAlign: 'center',
      border: '1px solid grey',
      width: '2vw',
      height: '2vw'
    }} />
  </div>)
}
