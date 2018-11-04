export function loadAudioFile(url, ctx = new AudioContext()) {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest()
    req.open('GET', url, true)
    req.responseType = 'arraybuffer'
    req.onload = () => ctx.decodeAudioData(req.response, resolve, reject)
    req.send()
  })
}

export function playBuffer(buffer, volume = 100, time = 0, ctx = new AudioContext()) {
  const gain = ctx.createGain()
  const src = ctx.createBufferSource()
  src.buffer = buffer

  src.connect(gain)
  gain.connect(ctx.destination)

  src.start(time)
}
