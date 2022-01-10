import React, {useState, useEffect, useMemo} from 'react'
import ReactMapGl, {Marker} from '!react-map-gl' // eslint-disable-line import/no-webpack-loader-syntax
import markerIcon from '../../logo/marker-icon.png'
import Form from './Form'
import 'mapbox-gl/dist/mapbox-gl.css';
import './home.css'
const Home = () => {
    
    const [errors, setErrors] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(null);
    const [lat, setLat] = useState('9.0765');
    const [lng, setLng] = useState('7.3986');
    const [routeData, setRouteData] = useState({path: [[lat, lng]]});
    const [searchPoints, setSearchPoints] = useState({
        origin: 'Imo',
        destination: 'Abuja'
    });
    
    const [viewport, setViewport] = useState({
        latitude: Number(lat),
        longitude: Number(lng),
        zoom: 10,
        width: '100vw',
        height: '55vh'
     });


    const url = useMemo(()=>{
        return 'https://mock-api.dev.lalamove.com/route'
    }, [])


    useEffect(()=>{

        const getToken = ()=>{

            
            fetch(url, {
                method: 'post',
                headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                origin: searchPoints.origin,
                destination: searchPoints.destination
            })
        })
        .then(res => {
            if(!res.ok){
                //call fetch again to get token.
                getToken();
                setLoading(false)
                throw Error('Could not fetch from the resource, please reload the page or check your network connection.')
            }
            return res.json();
        })
        .then(data => {
            setToken(data.token)
            setErrors(null)
            setIsFetching(false)
            
        })
        .catch(err => {
            setErrors(err.message);
            setLoading(false)
        })
        
        }
        //call function only on ssearch button click

        if(isFetching){
            setErrors(null)
            setRouteData({path: [['9.0765', '7.3986']]})
            setTimeout(getToken, 1500)
            setLoading(true)
        }
    }, [url, searchPoints.origin, searchPoints.destination, isFetching, lat, lng])
    

    useEffect(()=>{
        if(token){
        let retiries = 0;            

            const getRouteData = ()=>{
                fetch(`${url}/${token}`)
                .then(response => {
                    if(!response.ok && retiries <= 3){
                        getRouteData()
                        retiries++;
                        if(retiries > 3){
                            throw Error('Unable to get data from the resouce. Try again...')
                        }
                        return
                    }

                    return response.json();
                })
                .then(data => {
                    //call getRouteDta again untill we have a success or failure
                    if(data && data.status === 'in progress'){
                        getRouteData();
                    }else{
                        setToken(null)
                        if(data?.path && data?.path?.length > 0){
                            setLat(data.path[0][0])
                            setLng(data.path[0][1])
                            setViewport({...viewport, latitude: Number(data.path[0][0]), longitude: Number(data.path[0][1])})
                        }

                        setRouteData(data)
                        setLoading(false)
                    }
                    
                   
                })
               
            }
            
            getRouteData();
        }

    }, [url, token, viewport])


   



   return (
       <div className='home'>
           <div className='fetch-container'>

            {
                loading &&
                <p className='loading-icon'></p>
                }
           <p className='error'>{errors}</p>

           {
                (routeData && routeData.total_time) &&
                <>
                <p>Distance: {routeData.total_distance}</p>
                <p>Time: {routeData.total_time}</p>
                </> 
                
            }
            {
                (routeData && routeData.error) &&
                <p>{routeData.error}</p>
            }

           <Form  setIsFetching={setIsFetching} setSearchPoints={setSearchPoints} isFetching={isFetching}/>
            
            </div>

            <ReactMapGl 
            {...viewport} 
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
            onViewportChange = {viewport => setViewport(viewport)}
            mapStyle='mapbox://styles/mapbox/streets-v11'
            >
                  {
                    routeData.path?.map((point, index)=>(
                    <Marker key={index} latitude={Number(point[0])} longitude={Number(point[1])} >
                        <div className='marker'>
                        <span>{index + 1}</span>
                        <img 
                            src={markerIcon} alt='marker icon'
                            height={viewport.zoom*3}
                            width={viewport.zoom*3} 
                        />
                        </div>

                    </Marker>
      
        ))
    }
            </ReactMapGl>

       </div>
   )

      
}

export default Home
