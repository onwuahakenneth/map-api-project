import React from 'react'
import './pageNotFound.css'
import {Link} from 'react-router-dom'
const PageNotFound = () => {


    return (
        <div className='page404'>
            <p>Oops, the page ... does not exist or may have been moved to another location. Kindly ensure that you have entered the correct address or click the link to return to our homepage..</p>
            <Link to='/'>Home</Link>
            
        </div>
    )
}

export default PageNotFound
