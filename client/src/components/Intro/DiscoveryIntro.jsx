import React from 'react'
import fondo from '../../../../client/src/img/fondo.png'
import style from '../../../../client/src/components/Intro/DiscoveryIntro.module.css'
import logo from '../../../../client/src/img/logo.png'
import {Link} from 'react-router-dom'

function DiscoveryIntro() {
    return (
        <div className={style.fondo}>
   <div >
    <img src={logo} alt="" className={style.logo} />
    <Link to='/loader'>
    <button className={style.boton}>Bienvenidos!</button>
    </Link>
   </div> 
   </div>
    )
}

export default DiscoveryIntro
