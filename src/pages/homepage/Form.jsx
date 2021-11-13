import React, {useState, useRef, useEffect} from 'react'
import './form.css'
import {FaSearch} from 'react-icons/fa'


//Handle Submit


const Form = ({setIsFetching,setSearchPoints}) => {
    
    const [origin, setOrigin] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [destination, setDestination] = useState('');

    const startpointRef = useRef(null);
    const endpointRef = useRef(null);
   
    const handleSubmit = (e)=>{
        e.preventDefault()
        if(origin.trim() && destination.trim()){
            setSearchPoints({
                origin: origin,
                destination: destination
            })
            setIsFetching(true)
            setFormSubmitted(true)
            setOrigin('');
            setDestination('');
        }
    
    }
    
    
    useEffect(()=>{
        
        if(formSubmitted){
            startpointRef.current.blur();
            endpointRef.current.blur();
            setFormSubmitted(false)
        }

    }, [formSubmitted])

    return (
        <form className='form-container' onSubmit={(e)=>{e.preventDefault()}}>
            <div className="form-div">
                <input 
                type='text' 
                name='startPoint' 
                className='input start-point' 
                required={true} 
                autoComplete='off'
                value={origin}
                onChange={(e)=>setOrigin(e.target.value)}
                ref={startpointRef}
                />

                <label htmlFor="startPoint" className='label-box start-label-box'><span className='label-text start-label-text'>Origin</span></label>
            </div>

            <div className="form-div">
                <input type='text'
                 name='endPoint' 
                 className='input end-point' 
                 required={true} 
                 autoComplete='off'
                 value={destination}
                 onChange={(e)=>setDestination(e.target.value)}
                ref={endpointRef}
                 />

                <label htmlFor="endPoint" className='label-box end-label-box'><span className='label-text end-label-text'>Destination</span></label>
            </div>
            <div className='search-box'>

            <button 
            type='submit' 
            onClick={(e)=>handleSubmit(e)}
            > 
            <FaSearch className='search-icon'/> search
            </button>

            </div>
        </form>
    )
}

export default Form
