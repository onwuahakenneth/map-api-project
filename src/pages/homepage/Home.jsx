import React, {useState, useEffect, useCallback} from 'react'
import ReactMapGl, {Marker, Popup} from 'react-map-gl'
import markerIcon from '../../logo/marker-icon.png'
import Form from './Form'
import 'mapbox-gl/dist/mapbox-gl.css';
import './home.css'
const Home = () => {

    const [waypoints, setWaypoints] = useState([['6.05', '7.18']])
    const [info, setInfo] = useState({})
    const [currentToken, setCurrentToken] = useState(null)
    const [origin, setOrigin] = useState('')
    const [destination, setDestination] = useState('')
    const [search, setSearch] = useState(false)

    const [showInfo, setShowInfo] = useState(false)


    const getToken = useCallback(()=>{
        const requestParams = {
            method: 'POST',
            headers : {'Content-Type' : 'application/json'},
            body: JSON.stringify({origin: origin, destination: destination})
        };

        fetch('https://mock-api.dev.lalamove.com/route', requestParams)
        .then(async response => {
            const isJson = response.headers.get('Content-Type')?.includes('application/json');
            const data = isJson && await response.json();
            //check for error response
            if(!response.ok){
                const error = (data && data.message) || response.status;
                return Promise.reject(error)
            }
            setCurrentToken(data);
        })
        .catch(error =>{
           setInfo({error: error})
        })
    }, [origin, destination])


    useEffect(()=>{
      if(search){
          getToken()
          setSearch(false)
      }
    }, [getToken, search])
   
    useEffect(()=>{
            if(currentToken){
                fetch(`https://mock-api.dev.lalamove.com/route/${currentToken}`)
                .then(response => response.json())
                .then(data => {
                    
                if(data.status === 'success'){
                    console.log(data)
                    setWaypoints(data.path)
                    setInfo({...data})
                }
            })
        }
            
    }, [currentToken])


    const [viewport, setViewport] = useState({
        latitude: Number(waypoints[0][0]),
        longitude: Number(waypoints[0][1]),
        zoom: 10,
        width: '100vw',
        height: '55vh'
    });

    useEffect(()=>{
    
    }, [waypoints])

    return (
        <div className='home'>

            {   
                info.status === 'success' &&
                <div>
                <p>Distance: {info['total_distance']}</p>
                <p>Time: {info['total_time']}</p>
            </div>
            }
            
            {
                 info.status === 'failue' &&
                 <p>{info.error}</p>
            }
            <Form 
            setOrigin={setOrigin} 
            setDestination={setDestination}
            origin={origin}
            destination={destination}
            setSearch={setSearch}
            />
            <div className="mapContainer">
            <ReactMapGl
            {...viewport} 
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
            onViewportChange={viewport => setViewport(viewport)}
            mapStyle='mapbox://styles/mapbox/streets-v11'
            >
                {
                    waypoints.map((point, index)=>(
                        <Marker key={index} latitude={Number(point[0])} longitude={Number(point[1])} >
                            <div className='marker'>
                            <span>{index + 1}</span>
                            <img 
                            src={markerIcon} alt='marker icon'
                            height={viewport.zoom*3}
                            width={viewport.zoom*3} />
                            </div>

                        </Marker>
                  
                    ))

                }

               {
                   showInfo && (
                       <Popup latitude={viewport.latitude} longitude={viewport.longitude} onClose={()=>setShowInfo(false)}><p>start</p></Popup>
                   )
               }
            </ReactMapGl>
            </div>
        </div> 
    )
}

export default Home
