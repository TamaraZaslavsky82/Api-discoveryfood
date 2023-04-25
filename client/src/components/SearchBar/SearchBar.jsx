import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipeName } from "../../Redux/actions";
import  '../SearchBar/SearchBar.css'


export default function SearchBar(){
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value)
        //console.log(name)
    };

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getRecipeName(name))
        setName("")
    };

    return (<div >
        <React.Fragment >
            <input className="input" type="text" placeholder="Search Name" onChange={e=>handleInputChange(e)}/>
            <button className="button_buscar" type="submit" onClick={e=>handleSubmit(e)}>Search</button>
            
        </React.Fragment>
    </div>)
}