import React from 'react'

export function Playlist (props) {
  return (
    <div style={{width: '80vw', margin: '2vh auto'}}>
      {
        props.playlists.map((playlist, id) => (
          <div>
            <div style={{
              borderLeft: '3px solid blue',
              position: 'absolute',
              top: '22.5vw',
              left: 'calc(14.4vw)',
              fontSize: '100vh',
            }}>&nbsp;
            </div>
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
              background: 'red',
              border: '1px solid black',
              display: 'flex',
              alignItems: 'left'

            }} class="grid-container">
            <div class="grid-item" style={{
              width: '10%',
              height: '95%',
              border: '2px solid black'
            }}>1</div>
            <div class="grid-item" style={{
              width: '10%',
              height: '95%',
              border: '2px solid black'
            }}>2</div><div class="grid-item" style={{
              width: '10%',
              height: '95%',
              border: '2px solid black'
            }}>3</div><div class="grid-item" style={{
              width: '10%',
              height: '95%',
              border: '2px solid black'
            }}>4</div><div class="grid-item" style={{
              width: '10%',
              height: '95%',
              border: '2px solid black'
            }}>5</div><div class="grid-item" style={{
              width: '10%',
              height: '95%',
              border: '2px solid black'
            }}>6</div><div class="grid-item" style={{
              width: '10%',
              height: '95%',
              border: '2px solid black'
            }}>7</div><div class="grid-item" style={{
              width: '10%',
              height: '95%',
              border: '2px solid black'
            }}>8</div><div class="grid-item" style={{
              width: '10%',
              height: '95%',
              border: '2px solid black'
            }}>9</div><div class="grid-item" style={{
              width: '10%',
              height: '95%',
              border: '2px solid black'
            }}>10</div>
            </div>
            <div style={{clear: 'both'}}></div>
          </div>
        ))
      }
    </div>
  )
}
