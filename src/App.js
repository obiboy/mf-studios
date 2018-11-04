import React, { Component } from 'react'
import { MFControls } from './MFControls'
import { MFMixer } from './MixerRack'
import { Playlist } from './Playlist'
import { loadAudioFile, playBuffer } from './audio'
import { channelLength, beatsToSeconds } from './math.js'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.connection = new WebSocket('ws://localhost:7862')
    this.connection.onerror = window.location.reload.bind(window.location)
    this.connection.onmessage = e => {
      setTimeout(() => {
        this.setState(JSON.parse(e.data))
        this.reloadAudioFiles()
      }, 0)
    }
    this.context = new AudioContext()
    this.state = {
      playing: false,
      recording: false, // or something like {start: 20} if it is actually recording
      time: 0,
      bpm: 0,
      mixerChannels: [],
      patterns: [],
      playlistTracks: []
    }
    this.ctx = new AudioContext()
    this.reloadAudioFiles()
  }
  reloadAudioFiles() {
    this.state.mixerChannels.forEach((channel, id) => {
      if (!channel.buffer) {
        loadAudioFile(channel.sample).then(buffer => {
          this.setState(state => {
            state.mixerChannels[id].buffer = buffer
            return state
          })
        })
      }
    })
  }
  sendState(state = false) {
    if (!state) {
      state = this.state
    }
    this.connection.send(
      JSON.stringify({
        bpm: state.bpm,
        mixerChannels: state.mixerChannels.map(channel => ({
          volume: channel.volume,
          sample: channel.sample,
          beats: channel.beats,
          pan: channel.pan,
          mod: channel.mod
        })),
        patterns: state.patterns,
        playlistTracks: state.playlistTracks,
      })
    )
  }
  toggleBeat(channelID, beatID) {
    this.setState(state => {
      if (state.mixerChannels[channelID].beats.includes(beatID)) {
        state.mixerChannels[channelID].beats = state.mixerChannels[channelID].beats.filter(beat => beat !== beatID)
      } else {
        state.mixerChannels[channelID].beats.push(beatID)
      }
      this.sendState(state)
      return state
    })
  }
  stop() {
    this.ctx.close()
    this.setTime(0)
    this.setState(state => ({playing: false}))
  }
  pause() {
    this.ctx.suspend()
    this.setState(state => ({playing: false}))
  }
  play() {
    // TODO
    this.setState(state => ({playing: true}))
    const resuming = this.ctx.state === 'suspended'
    if (resuming) {
      this.ctx.resume()
    } else {
      this.ctx = new AudioContext()
    }
    this.state.mixerChannels.forEach(channel => {
      const setupBeats = (beatOffset) => {
        channel.beats.forEach(beat => {
          channel.src = playBuffer(channel.buffer, channel.volume, beatsToSeconds(beat + beatOffset, this.state.bpm), this.ctx)
        })
      }
      if (!resuming) {
        setupBeats(0)
      }
      let timesLooped = 0
      const numBeats = channelLength(channel.beats)
      setInterval(() => {
        timesLooped++
        if (this.ctx.state === 'running') {
          setupBeats(numBeats * timesLooped)
        }
      }, 1000 * beatsToSeconds(numBeats, this.state.bpm))
    })
  }
  stopRecording() {
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
    this.pause()
    this.setState({bpm})
    this.play()
    this.sendState()
  }
  setVolume(id, volume) {
    // TODO
    this.setState(state => {
      state.mixerChannels[id].volume = volume
      this.sendState(state)
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
          stop={this.stop.bind(this)}>
        </MFControls>
        <MFMixer
          channels={this.state.mixerChannels}
          updateVolume={this.setVolume.bind(this)}
          toggleBeat={this.toggleBeat.bind(this)}></MFMixer>
        <Playlist playlists={this.state.playlistTracks} patterns={this.state.patterns}></Playlist>
      </div>
    )
  }
}

export default App
