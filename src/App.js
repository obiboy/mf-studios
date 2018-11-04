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
<<<<<<< HEAD
=======
    this.connection = new WebSocket('ws://localhost:7862')
    this.connection.onerror = window.location.reload.bind(window.location)
    this.connection.onmessage = e => {
      setTimeout(() => {
        this.setState(JSON.parse(e.data))
        setTimeout(this.reloadAudioFiles.bind(this), 0)
      }, 0)
    }
>>>>>>> 6cf9cccb0ae7cf67d4f7709b8cd644042c53eca1
    this.context = new AudioContext()
    this.state = {
      playing: false,
      recording: false, // or something like {start: 20} if it is actually recording
<<<<<<< HEAD
      time: 0,
      bpm: 150,
      mixerChannels: [
        {
          volume: 65,
          sample: 'DrumKits/Kick.wav',
          beats: [0, 6, 12],
          pan: 0,
          mod: [0, 0]
        },
        {
          volume: 65,
          sample: 'DrumKits/Snare.wav',
          beats: [8],
          pan: 0,
          mod: [0, 0]
        },
        {
          volume: 65,
          sample: 'DrumKits/Hi Hat.wav',
          beats: [0, 2, 4, 6, 8, 10, 12, 14],
          pan: 0,
          mod: [0, 0]
        },
        {
          volume: 65,
          sample: 'DrumKits/Open Hat.wav',
          beats: [10],
          pan: 0,
          mod: [0, 0]
        }
      ],
      patterns: [
        [
          {
            volume: 65,
            sample: 'DrumKits/Kick.wav',
            beats: [0, 6, 12],
            pan: 0,
            mod: [0, 0]
          },
          {
            volume: 65,
            sample: 'DrumKits/Snare.wav',
            beats: [8],
            pan: 0,
            mod: [0, 0]
          },
          {
            volume: 65,
            sample: 'DrumKits/Hi Hat.wav',
            beats: [0, 2, 4, 6, 8, 10, 12, 14],
            pan: 0,
            mod: [0, 0]
          },
          {
            volume: 65,
            sample: 'DrumKits/Open Hat.wav',
            beats: [10],
            pan: 0,
            mod: [0, 0]
          }
        ]
      ],
      playlistTracks: [
        {
          sequence: [0, 0]
        },
        {
          sequence: [null, null, 0]
        }
      ]
    }
    this.ctx = new AudioContext()
    this.state.mixerChannels.forEach((channel, id) => {
      loadAudioFile(channel.sample).then(buffer => {
        this.setState(state => {
          state.mixerChannels[id].buffer = buffer
          return state
        })
      })
    })
=======
      audioBuffers: {},
      bpm: 0,
      mixerChannels: [],
      playlistTracks: []
    }
    this.ctx = new AudioContext()
    this.reloadAudioFiles()
  }
  reloadAudioFiles() {
    this.state.mixerChannels.forEach(channel => {
      if (!this.state.audioBuffers[channel.sample]) {
        loadAudioFile(channel.sample).then(buffer => {
          this.setState(state => {
            state.audioBuffers[channel.sample] = buffer
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
    this.connection.send(JSON.stringify(state))
>>>>>>> 6cf9cccb0ae7cf67d4f7709b8cd644042c53eca1
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
  stop() {
    this.ctx.close()
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
          channel.src = playBuffer(this.state.audioBuffers[channel.sample], channel.volume, beatsToSeconds(beat + beatOffset, this.state.bpm), this.ctx)
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
  setBPM(bpm) {
    // TODO
    this.pause()
    this.setState({bpm})
    this.play()
  }
  setVolume(id, volume) {
    // TODO
    this.setState(state => {
      state.mixerChannels[id].volume = volume
      return state
    })
  }
  addPatternToTrack(trackID, position) {
    this.setState(state => {
      if (state.playlistTracks[trackID].sequence.length - 1 === position) {
        // This is an insert at the very last position - make sure to add a new position!
        for (let i = 0 ; i < state.playlistTracks.length; i++) {
          state.playlistTracks[i].sequence.push(null)
        }
      }
      state.playlistTracks[trackID].sequence[position] = JSON.parse(JSON.stringify(state.mixerChannels))
      state = JSON.parse(JSON.stringify(state))
      this.sendState(state)
    })
  }
  removePatternFromTrack(trackID, position) {
    this.setState(state => {
      state.playlistTracks[trackID].sequence[position] = null
      state = JSON.parse(JSON.stringify(state))
      this.sendState(state)
    })
  }  render() {
    return (
      <div className="App">
        <MFControls
          bpm={this.state.bpm}
          playing={this.state.playing}
          recording={this.state.recording}
          updateBPM={this.setBPM.bind(this)}
          togglePlaying={() => this.state.playing ? this.stop() : this.play()}
          toggleRecording={() => {this.state.recording ? this.stopRecording() : this.startRecording()}}
          stop={this.stop.bind(this)}>
        </MFControls>
        <MFMixer
          channels={this.state.mixerChannels}
          updateVolume={this.setVolume.bind(this)}
          toggleBeat={this.toggleBeat.bind(this)}></MFMixer>
        <Playlist
          playlists={this.state.playlistTracks}
          time={this.ctx.currentTime}
          addPatternToTrack={this.addPatternToTrack.bind(this)}
          removePatternFromTrack={this.removePatternFromTrack.bind(this)}></Playlist>
      </div>
    )
  }
}

export default App
