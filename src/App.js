import React, { Component } from 'react'
import { MFControls } from './MFControls'
import { MFMixer } from './MixerRack'
import { Playlist } from './Playlist'
import { FileList } from './FileList'
import { loadAudioFile, playBuffer } from './audio'
import { channelLength, beatsToSeconds } from './math.js'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.context = new AudioContext()
    this.state = {
      playing: false,
      recording: false, // or something like {start: 20} if it is actually recording
      time: 0,
      bpm: 150,
      mixerChannels: [
        {
          volume: 50,
          sample: 'DrumKits/Kick.wav',
          beats: [0, 6, 12],
          pan: 0,
          mod: [0, 0]
        },
        {
          volume: 50,
          sample: 'DrumKits/Snare.wav',
          beats: [8],
          pan: 0,
          mod: [0, 0]
        },
        {
          volume: 50,
          sample: 'DrumKits/Hi Hat.wav',
          beats: [0, 2, 4, 6, 8, 10, 12, 14],
          pan: 0,
          mod: [0, 0]
        },
        {
          volume: 50,
          sample: 'DrumKits/Open Hat.wav',
          beats: [10],
          pan: 0,
          mod: [0, 0]
        },
      ]
    }
    this.state.mixerChannels.forEach((channel, id) => {
      loadAudioFile(channel.sample).then(buffer => {
        this.setState(state => {
          state.mixerChannels[id].buffer = buffer
          return state
        })
      })
    })
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
    const ctx = new AudioContext()
    this.state.mixerChannels.forEach(channel => {
      const setupBeats = (beatOffset) => {
        channel.beats.forEach(beat => {
          playBuffer(channel.buffer, channel.volume, beatsToSeconds(beat + beatOffset, this.state.bpm), ctx)
        })
      }
      setupBeats(0)
      let timesLooped = 0
      const numBeats = channelLength(channel.beats)
      setInterval(() => {
        timesLooped++
        setupBeats(numBeats * timesLooped)
      }, 1000 * beatsToSeconds(numBeats, this.state.bpm))
    })
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
        <FileList>
        </FileList>
      </div>
    )
  }
}

export default App
