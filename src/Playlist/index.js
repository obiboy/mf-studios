import React from 'react'

export function Playlist (props) {
  return (
    <div style={{width: '100vh', margin: '2vh auto'}}>
      {
        props.playlists.map((playlist, id) => (
          <div>
            <div style={{
              float: 'left',
              width: '9vh',
              height: '7vh',
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
<<<<<<< HEAD
              alignItems: 'left'

            }} class="grid-container">
            <div class="grid-item" style={{
              width: '10%',
              height: '95%',
              border: '2px solid black'
            }}></div>
            <div class="grid-item" style={{
              width: '10%',
              height: '95%',
              border: '2px solid black'
            }}></div><div class="grid-item" style={{
              width: '10%',
              height: '95%',
              border: '2px solid black'
            }}></div><div class="grid-item" style={{
              width: '10%',
              height: '95%',
              border: '2px solid black'
            }}></div><div class="grid-item" style={{
              width: '10%',
              height: '95%',
              border: '2px solid black'
            }}></div><div class="grid-item" style={{
              width: '10%',
              height: '95%',
              border: '2px solid black'
            }}></div><div class="grid-item" style={{
              width: '10%',
              height: '95%',
              border: '2px solid black'
            }}></div><div class="grid-item" style={{
              width: '10%',
              height: '95%',
              border: '2px solid black'
            }}></div><div class="grid-item" style={{
              width: '10%',
              height: '95%',
              border: '2px solid black'
            }}></div><div class="grid-item" style={{
              width: '10%',
              height: '95%',
              border: '2px solid black'
            }}></div>
=======
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
                      <a style={{color: 'green'}} href="#" onClick={() => props.addPatternToTrack(id, pos)}>+</a>
                    </div>
                  )
                } else {
                  return (<div style={{
                    width: '10%',
                    height: '95%',
                    border: '2px solid black',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    <a style={{color: 'red'}} href="#" onClick={() => props.removePatternFromTrack(id, pos)}>&times;</a></div>)
                }
              })}
>>>>>>> 6cf9cccb0ae7cf67d4f7709b8cd644042c53eca1
            </div>
            <div style={{clear: 'both'}}></div>
          </div>
        ))
      }
    </div>
  )
}
