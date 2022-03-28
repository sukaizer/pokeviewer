import React, { useEffect, useState } from "react";
import "./App.css";
import search from "./assets/icons/search.svg";

import Pokedex from "pokedex-promise-v2"; //with pokedex-promise-v2
const P = new Pokedex();

const App = () => {
  const [data, setData] = useState([{}]);
  const [searchTerm, setSearchTerm] = useState("Pikachu");

  const searchPokemon = async (name) => {};

  useEffect(() => {
    P.getPokemonByName("1") // with Promise
      .then((response) => {
        setData(response);
        console.log(response);
      })
      .catch((error) => {
        console.log("There was an ERROR: ", error);
      });
  }, []);
  return (
    <div className="app padding">
      <h1>PokéWeb</h1>
      <div className="search">
        <input
          placeholder="Enter the Pokémon or their number"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={search}
          alt="search"
          onClick={() => searchPokemon(searchTerm)}
        />
      </div>
    </div>
  );
};

export default App;
