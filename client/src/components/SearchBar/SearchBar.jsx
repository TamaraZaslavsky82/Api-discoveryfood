import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getRecipeName } from "../../Redux/actions";
import "../SearchBar/SearchBar.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [pageLoaded, setPageLoaded] = useState(false);

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getRecipeName(name));
    setName("");
  }

  useEffect(() => {
    setPageLoaded(true);
    setName("");
  }, []);

  return (
    <div>
      <React.Fragment>
        <input
          className="input"
          type="text"
          placeholder="Search Name"
          value={name}
          onChange={(e) => handleInputChange(e)}
        />
        <button
          className="button_buscar"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Search
        </button>
      </React.Fragment>
    </div>
  );
}
