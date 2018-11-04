import React from 'react'
import { channelLength } from '../math.js'

const numBeats = 32

export function MFMixer(props) {
  return (
    <div style={{padding: '2vh 0', borderBottom: '1px solid black'}}>
      {
        props.channels.map((channel, id) => {
          const lastGroup = channelLength(channel.beats) / 16
          return (<div>
            <input type="range" min="0" max="100" value={channel.volume} onInput={e => props.updateVolume(id, +e.target.value)} onChange={() => {}} />
            <span style={{
              border: '1px solid gray',
              padding: '2px 0',
              width: '12vw',
              display: 'inline-block',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              userSelect: 'none'
            }}>
              {channel.sample}
            </span>
            <span>
              {
                [...Array(numBeats)].map((_, i) => (
                  <input
                    type="checkbox"
                    style={{
                      margin: i % 4 === 0 ? '0 0 0 5px' : '0',
                      opacity: ((i + 1) / 16) > lastGroup ? '.5' : '1',
                      width: '1vw',
                      height: '1vw'
                    }}
                    checked={channel.beats.includes(i)}
                    onChange={() => props.toggleBeat(id, i)} />
                ))
              }
            </span>
          </div>)
        })
      }
    </div>
  )
}
