import React, {useState} from 'react'
import Links from './Links'
import {FaBars} from 'react-icons/fa'
import './navbar.css'

const links = ['Home', 'About', 'Help', 'Contact']

const NavBar = () => {

    const [displayMenu, setDiplayMenu] = useState(false);

    return (
        <nav className='nav-bar'>
            <FaBars className='menu-bar' onClick={()=>setDiplayMenu(!displayMenu)}/>
            <div className={`nav-links ${displayMenu && 'display'}`}>
                {
                    links.map((link, index)=>(
                        <Links key={index} to={`/${link.toLowerCase()}`} text={link} setDiplayMenu={setDiplayMenu}/>
                    ))
                }
            </div>
        </nav>
    )
}

export default NavBar
