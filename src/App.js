import React, { Component } from 'react'
import { MFControls } from './MFControls'
import { MixerRack } from './MixerRack'
import { Playlist } from './Playlist'
import { FileList } from './FileList'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playing: false,
      recording: false, // or something like {start: 20} if it is actually recording
      time: 0,
      bpm: 110
    }
  }
  pause() {
    // TODO
    this.setState(state => ({playing: false}))
  }
  play() {
    // TODO
    this.setState(state => ({playing: true}))
  }  stopRecording() {
    // TODO
    this.setState(state => ({recording: false}))
  }
  startRecording() {
    // TODO
    this.setState(state => ({recording: {start: state.time}}))
  }
  setTime(time) {
    this.setState({time})
  }
  setBPM(bpm) {
    // TODO
    this.setState({bpm})
  }
  render() {
    return (
      <div className="App">
        <MFControls
          playing={this.state.playing}
          recording={this.state.recording}
          bpm={this.state.bpm}
          updateBPM={this.state.updateBPM}
          togglePlaying={() => this.state.playing ? this.pause() : this.play()}
          toggleRecording={() => {this.state.recording ? this.stopRecording() : this.startRecording()}}
          stop={() => {
            this.pause();
            this.setTime(0)
          }}>
        </MFControls>
        <MixerRack></MixerRack>
        <Playlist></Playlist>
        <FileList></FileList>
      </div>
    )
  }
}

export default App
