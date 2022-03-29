import React, { useEffect, useState } from "react";
import "./App.css";
import search from "./assets/icons/search.svg";
import PokemonCart from "./components/pokemonCart/PokemonCart";
import cart from "./assets/carts/cart1.png";

import Pokedex from "pokedex-promise-v2"; //with pokedex-promise-v2
const P = new Pokedex();

const App = () => {
  const [pokemon, setPokemon] = useState();
  const [searchTerm, setSearchTerm] = useState("Pikachu");

  const searchPokemon = async (name) => {
    P.getPokemonByName(name.toLowerCase()) // with Promise
      .then((response) => {
        setPokemon(response);
        console.log(response);
      })
      .catch((error) => {
        //console.log("There was an ERROR: ", error);
        setPokemon(null);
      });
  };

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.key === "Enter") {
      searchPokemon(searchTerm);
    }
  };

  return (
    <div className="app padding">
      <div className="container">
        <h1>PokéWeb</h1>
        <div className="search">
          <input
            placeholder="Enter the Pokémon or their number"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeypress}
          />
          <img
            src={search}
            alt="search"
            onClick={() => searchPokemon(searchTerm)}
          />
        </div>
      </div>

      {pokemon != null && pokemon !== undefined ? (
        <div className="content">
          <PokemonCart pokemon={pokemon} />
        </div>
      ) : (
        <div className="empty">
          <h2>No Pokemon :/</h2>
        </div>
      )}
    </div>
  );
};

export default App;
