import React from 'react'
import playArrowIcon from '../material/play_arrow.svg'
import pauseIcon from '../material/pause.svg'
import stopIcon from '../material/stop.svg'
import micIcon from '../material/mic.svg'

export function MFControls (props) {
  return (<div style={{textAlign: 'center', padding: '2vh 0', borderBottom: '1px solid black'}}>
    <a href="#">
      <img src={props.playing ? playArrowIcon : pauseIcon} />
    </a>
    <a href="#">
      <img src={stopIcon} />
    </a>
    <a href="#" style={{color: props.recording ? 'red' : 'inherit'}}>
      <img src={micIcon} />
    </a>
  </div>)
}
