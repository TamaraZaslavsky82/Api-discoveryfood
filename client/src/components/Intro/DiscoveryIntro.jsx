import React from 'react'
import fondo from '../../../../client/src/img/fondo.png'
import style from '../../../../client/src/components/Intro/DiscoveryIntro.module.css'
import logo2 from '../../../../client/src/img/logo2.png'
import {Link} from 'react-router-dom'

function DiscoveryIntro() {
    return (
        <div className={style.fondo}>
   <div >
    <img src={logo2} alt="" className={style.logo} />
    <Link to='/home'>
    <button className={style.boton}>Bienvenidos!</button>
    </Link>
   </div> 
   </div>
    )
}

export default DiscoveryIntro
