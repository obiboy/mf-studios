const WebSocket = require('ws')

const wss = new WebSocket.Server({
  port: 7862, // on a phone, SYNC is 7862
  perMessageDeflate: {
    zlibDeflateOptions: {
      chunkSize: 1024,
      memLevel: 7,
      level: 3,
    },
    zlibInflateOptions: {
      chunkSize: 10 * 1024
    }
  }
})

let payload = {
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
  playlistTracks: [
    {
      sequence: [null, null, null, null, null, null, null, null, null, null]
    },
    {
      sequence: [null, null, null, null, null, null, null, null, null, null]
    }
  ]
}

wss.on('connection', ws => {
  ws.on('message', msg => {
    payload = JSON.parse(msg)
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(payload))
      }
    })
    console.log('received: %s', msg)
  })
  ws.send(JSON.stringify(payload))
})
