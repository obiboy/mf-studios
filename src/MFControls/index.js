import React from 'react'
import playArrowIcon from '../material/play_arrow.svg'
import pauseIcon from '../material/pause.svg'
import stopIcon from '../material/stop.svg'
import micIcon from '../material/mic.svg'

// Sorry
const makeMySVGRed = {filter: 'invert(0.3) sepia(1) saturate(10) hue-rotate(-30deg)'}

export function MFControls (props) {
  return (<div style={{textAlign: 'center', padding: '2vh 0', borderBottom: '1px solid black'}}>
    <span>{props.time}</span>
    <a href="#" onClick={props.togglePlaying}>
      <img src={props.playing ? pauseIcon : playArrowIcon} />
    </a>
    <a href="#" onClick={props.stop}>
      <img src={stopIcon} />
    </a>
    <a href="#" onClick={props.toggleRecording} style={props.recording ? makeMySVGRed : {}}>
      <img src={micIcon} />
    </a>
    <input onChange={e => props.updateBPM(e.target.value)} value={props.bpm} size="3" />
  </div>)
}
