import './Header.css';
import React  from 'react';
import { Link } from 'react-router-dom';
function Header(){

    return <div class="header">
        <div class="content"><Link style={{textDecoration:"none" , color: 'white'}} to="/">Home</Link></div>
        <div class="content"style={{marginLeft:'35rem'}}>My Chat Web</div>
    </div>

}

export default Header;