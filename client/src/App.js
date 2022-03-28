import React, { useEffect, useState } from "react";
import "./App.css";
import search from "./assets/icons/search.svg";
import PokemonCart from "./components/pokemonCart/PokemonCart";

import Pokedex from "pokedex-promise-v2"; //with pokedex-promise-v2
const P = new Pokedex();

const App = () => {
  const [pokemon, setPokemon] = useState({});
  const [searchTerm, setSearchTerm] = useState("Pikachu");

  const searchPokemon = async (name) => {
    P.getPokemonByName(name.toLowerCase()) // with Promise
      .then((response) => {
        setPokemon(response);
        console.log(response);
      })
      .catch((error) => {
        console.log("There was an ERROR: ", error);
        setPokemon(null);
      });
  };

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

      {pokemon != null ? (
        <div className="container">
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
