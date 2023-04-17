import React from 'react'
import style from '../../components/Nav/Nav.module.css'
import logo from '../../img/logo.png'
import {Link} from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'



function Nav(props) {
  return (
    <div className={style.container}>
      
       <img className={style.logo} src={logo} />
       <SearchBar  className={style.search} onSearch={props.onSearch} /> 
        <Link className={style.link}>
        <p className={style.home}>Home</p>
        </Link>
        <Link className={style.link}>
        <p className={style.home2}>Create Recipe</p>
        </Link>
        <Link className={style.link}>
        <p className={style.home3}>About</p>
        </Link>
    </div>
  )
}

export default Nav