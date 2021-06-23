import React, { useEffect, useRef, useState } from 'react'

function Music() {

    useEffect(() => {
        getlistSONGS()
    },[])

    const [list, setlist] = useState([])

    function getlistSONGS() {
        fetch("https://assets.breatheco.de/apis/sound/songs", {
            method: "GET",
            headers: {
                "content-type": "application/json"
            },
        })
            .then((respuesta) => respuesta.json())
            .then((data) => {
                setlist(data)
                
            })
    }

    const player = useRef(null);
    const [actual, setActual]=useState(0)
    const [play, setplay]= useState(false)

    function cancion(url,index){
        player.current.src = `https://assets.breatheco.de/apis/sound/${url}` 
        setActual(index)
        playSong()
    }

    function playSong() {
        setplay(true) 
        player.current.play();
    }

    function pauseSong(){ 
        setplay(false)
        player.current.pause() 
    }

    function nextSong(){
        let nextSong = actual !== null ? actual === list.length-1 ? 0 : actual + 1 : 0;
        cancion(list[nextSong].url, nextSong)
        playSong()
    }

    function prevSong(){
        let prevSong = actual !== null ? actual === 0 ? list.length - 1 : actual - 1 : 0;
        cancion(list[prevSong].url, prevSong)
        playSong()
    }

    
    

    return (
        <div>
            <audio ref={player}  type="audio"></audio>
            <div className="container p-3">
                <div className="row">
                    <div className="list-group">
                        {
                            !!list &&
                            list.map((value, index) => {
                                
                                return (
                                    <>
                                        <a key={index} className="list-group-item list-group-item-action list-group-item-info" onClick={() => cancion(value.url,value.id)}>{value.name}</a>
                                    </>
                                )
                            })
                        }


                        <a className="list-group-item list-group-item-action list-group-item-info text-center">
                            <div className="btn-group btn-group-lg" role="group" aria-label="Basic example">
                                <button type="button" className="btn" onClick={prevSong} ><i className="fas fa-caret-left"></i></button>
                                <div>
                                    {
                                        play ?  <button type="button" className="btn btn-lg" onClick={pauseSong}><i class="fas fa-pause"></i></button>
                                        :<button type="button" className="btn btn-lg" onClick={playSong}><i class="fas fa-play"></i></button>
                                        
                                    }
                                </div>
                                <button type="button" className="btn" onClick={nextSong}><i className="fas fa-caret-right"></i></button>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Music
