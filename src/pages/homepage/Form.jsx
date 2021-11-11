import React from 'react'
import './form.css'
import {FaSearch} from 'react-icons/fa'


//Handle Submit


const Form = ({setOrigin, setDestination, origin, destination,setSearch}) => {
    
    const handleSubmit = (e)=>{
        if(origin.trim() && destination.trim()){
            setSearch(prev => true)
        }
    
    }

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
