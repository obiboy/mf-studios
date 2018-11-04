import React from 'react'

export function Playlist (props) {
  return (
    <div style={{width: '80vw', margin: '2vh auto'}}>
      {
        props.playlists.map((playlist, id) => (
          <div>
            <div style={{
              borderLeft: '1px solid blue',
              position: 'absolute',
              top: '17.5vw',
              left: 'calc(13.1vw)',
              fontSize: '100vh',
            }}>&nbsp;</div>
            <div style={{
              float: 'left',
              width: '3vw',
              height: '3vw',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid black'
            }}>{id + 1}</div>
            <div style={{
              float: 'left',
              width: '74vw',
              height: '3vw',
              background: 'red',
              border: '1px solid black',
              display: 'flex',
              alignItems: 'center'
            }}>
              {
                playlist.sequence.map(id => {
                  const pattern = props.patterns[id]
                  if (!pattern) {
                    return (<div style={{width: '5vw', height: '3vw', borderRight: '1px solid gray'}}>&nbsp;</div>)
                  } else {
                    return (<div style={{width: '5vw', height: '3vw', borderRight: '1px solid gray'}}>Pattern {id + 1}</div>)
                  }
                })
              }
            </div>
            <div style={{clear: 'both'}}></div>
          </div>
        ))
      }
    </div>
  )
}
