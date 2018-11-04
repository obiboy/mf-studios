import React, { Component } from 'react'
import { MFControls } from './MFControls'
import { MFMixer } from './MixerRack'
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
      bpm: 110,
      mixerChannels: [
        {
          volume: 50,
          sample: 'kick.mp3',
          beats: [],
          pan: 0,
          mod: [0, 0]
        },
        {
          volume: 50,
          sample: 'snare.mp3',
          beats: [],
          pan: 0,
          mod: [0, 0]
        },
        {
          volume: 50,
          sample: 'hihat.mp3',
          beats: [],
          pan: 0,
          mod: [0, 0]
        },
        {
          volume: 50,
          sample: 'clap.mp3',
          beats: [],
          pan: 0,
          mod: [0, 0]
        },
      ]
    }
  }
  toggleBeat(channelID, beatID) {
    this.setState(state => {
      if (state.mixerChannels[channelID].beats.includes(beatID)) {
        state.mixerChannels[channelID].beats = state.mixerChannels[channelID].beats.filter(beat => beat !== beatID)
      } else {
        state.mixerChannels[channelID].beats.push(beatID)
      }
      return state
    })
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
  setVolume(id, volume) {
    // TODO
    this.setState(state => {
      state.mixerChannels[id].volume = volume
      return state
    })
  }
  render() {
    return (
      <div className="App">
        <MFControls
          time={this.state.time}
          bpm={this.state.bpm}
          playing={this.state.playing}
          recording={this.state.recording}
          updateBPM={this.setBPM.bind(this)}
          togglePlaying={() => this.state.playing ? this.pause() : this.play()}
          toggleRecording={() => {this.state.recording ? this.stopRecording() : this.startRecording()}}
          stop={() => {
            this.pause()
            this.setTime(0)
          }}>
        </MFControls>
        <MFMixer
          channels={this.state.mixerChannels}
          updateVolume={this.setVolume.bind(this)}
          toggleBeat={this.toggleBeat.bind(this)}></MFMixer>
        <Playlist></Playlist>
        <FileList></FileList>
      </div>
    )
  }
}

export default App
