import React from 'react'
import { Link } from 'react-router-dom'

const Links = ({text, to, setDiplayMenu}) => {

    return (
        <Link to={to} onClick={()=>setDiplayMenu(false)}>
            {text}
        </Link>
    )
}

export default Links
