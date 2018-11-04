import React from 'react'

export function Playlist (props) {
  return (
    <div style={{width: '80vw', margin: '2vh auto'}}>
      <div style={{
        borderLeft: '3px solid blue',
        position: 'absolute',
        top: '41vh',
        left: 'calc(15.1vw)',
        fontSize: '100vh'
      }}>&nbsp;</div>

      {
        props.playlists.map((playlist, id) => (
          <div>
            <div style={{
              float: 'left',
              width: '5vw',
              height: '5vw',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid black'
            }}>{id + 1}
            </div>
            <div style={{
              float: 'left',
              width: '72vw',
              height: '5vw',
              background: 'lightgray',
              border: '1px solid black',
              display: 'flex',
              alignItems: 'left',
              overflow: 'scroll'
            }}>
              {playlist.sequence.map((slot, pos) => {
                console.log(playlist.sequence)
                if (!slot) {
                  return (
                    <div style={{
                      width: '10%',
                      height: '95%',
                      border: '2px solid black',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                      <a href="#" onClick={() => props.addPatternToTrack(id, pos)}>+</a>
                    </div>
                  )
                } else {
                  return (<div style={{
                    width: '10%',
                    height: '95%',
                    border: '2px solid black'
                  }}>1</div>)
                }
              })}
            </div>
            <div style={{clear: 'both'}}></div>
          </div>
        ))
      }
    </div>
  )
}
