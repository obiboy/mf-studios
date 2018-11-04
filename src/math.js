export function channelLength(beats) {
  const lastChecked = beats.reduce(function (p, v) {
    return ( p > v ? p : v )
  }, 0)
  return Math.ceil((lastChecked + 1) / 16)
}
export function beatsToSeconds(beats, bpm) {
  return beats * (60 / bpm) / 4
}
