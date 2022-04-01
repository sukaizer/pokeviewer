import React, { useState } from "react";
import "./App.css";
import search from "./assets/icons/search.svg";
import PokemonCart from "./components/pokemonCart/PokemonCart";
import Cursor from "./Cursor";

import Pokedex from "pokedex-promise-v2"; //with pokedex-promise-v2
const P = new Pokedex();

const App = () => {
  const [searchTerm, setSearchTerm] = useState("Pikachu");
  const [pokemonList, setPokemonList] = useState([]);

  const searchPokemon = async (name) => {
    P.getPokemonByName(name.toLowerCase()) // with Promise
      .then((response) => {
        isElementIn(response, pokemonList)
          ? console.log("pokemon already here")
          : setPokemonList((prevArray) => [...prevArray, response]);
        console.log(response);
      })
      .catch((error) => {
        console.log("There was an ERROR: ", error);
      });
  };

  function isElementIn(element, array) {
    let b = false;
    array.forEach((e) => {
      if (element.name === e.name) {
        b = true;
      }
    });
    return b;
  }

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.key === "Enter") {
      searchPokemon(searchTerm);
    }
  };

  return (
    <div className="app padding">
      <div className="container">
        <Cursor />
        <h1>PokéWeb</h1>
        <div className="search">
          <input
            placeholder="Enter the Pokémon or their number"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeypress}
          />
          <img
            className="clickable"
            src={search}
            alt="search"
            onClick={() => searchPokemon(searchTerm)}
          />
        </div>
      </div>
      {/* AJOUTER MESSAGE SI LE POKEMON RECHERCHE NEXISTE PAS OU ERREUR */}
      <div className="content">
        {pokemonList.map((p) => (
          <PokemonCart pokemon={p} key={p.id} />
        ))}
      </div>
    </div>
  );
};

export default App;
