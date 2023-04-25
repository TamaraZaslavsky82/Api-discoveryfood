import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import { getAllRecipes } from "../../Redux/actions";
import { Link } from "react-router-dom";
import logo2 from "../../img/logo2.png";
import { useDispatch } from "react-redux";
import "../Nav/Nav.css";

const Nav = () => {
  const dispatch = useDispatch();

  function handleClick(e) {
    //le pasamos un evento al handler como la variable c
    e.preventDefault(); //evito que recargue la pagina y se rompa
    dispatch(getAllRecipes());
  }

  return (
    <nav className="nav">
      <div className="container">
        <div>
          <Link to='/home'>
          <img src={logo2} className="imgen__logo" />
          </Link>
        </div>
        <SearchBar className="search" />
        <Link to="/recipes">
          <button className="button">Add New Recipe</button>
        </Link>
        <div>
          <button
            className="button_recargar"
            onClick={(c) => {
              handleClick(c);
            }}
          >
            Refill recipes
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
