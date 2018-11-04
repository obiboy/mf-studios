export function loadAudioFile(url, ctx = new AudioContext()) {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest()
    req.open('GET', url, true)
    req.responseType = 'arraybuffer'
    req.onload = () => ctx.decodeAudioData(req.response, resolve, reject)
    req.send()
  })
}

export function playBuffer(buffer, volume = 65, time = 0, ctx = new AudioContext()) {
  const src = ctx.createBufferSource()
  src.buffer = buffer
  const gain = ctx.createGain()
  if (volume > 80) {
    gain.gain.value = (volume**1.3 / 100)
  } else if (volume > 70) {
    gain.gain.value = (volume**1.2 / 100)
  } else {
    gain.gain.value = (volume**1.101 / 100)
  }

  src.connect(gain)
  gain.connect(ctx.destination)

  src.start(time)

  return src
}
