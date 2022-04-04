import React, { useState } from "react";
import createPersistedState from "use-persisted-state";
import "./App.css";
import search from "./assets/icons/search.svg";
import volumeOn from "./assets/icons/volumeOn.svg";
import volumeOff from "./assets/icons/volumeOff.svg";
import PokemonCart from "./components/pokemonCart/PokemonCart";
import Cursor from "./components/cursor/Cursor";

import Pokedex from "pokedex-promise-v2"; //with pokedex-promise-v2
const P = new Pokedex();

const App = () => {
  const [volumeState, setVolumeState] = useState([volumeOn, true]);
  const useSearchState = createPersistedState("Pokemon");
  const [searchTerm, setSearchTerm] = useSearchState("Pikachu");
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

  const childToParent = (pokemon) => {
    const array = pokemonList.slice();
    const index = pokemonList.indexOf(pokemon);
    console.log(index);
    isElementIn(pokemon, array)
      ? array.splice(index, 1)
      : console.log("Error : pokemon not in list");
    setPokemonList(array);
  };

  const changeVolume = () => {
    if (volumeState[1] === false) {
      setVolumeState([volumeOn, true]);
    } else {
      setVolumeState([volumeOff, false]);
    }
  };

  return (
    <div className="padding">
      <img
        className="volume clickable"
        src={volumeState[0]}
        alt="volumeOff"
        onClick={() => changeVolume()}
      />
      <div className="app">
        <div className="container">
          <h1>PokéViewer</h1>
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
            <PokemonCart
              pokemon={p}
              childToParent={childToParent}
              volumeState={volumeState}
              key={p.id}
            />
          ))}
        </div>
        <Cursor />
      </div>
    </div>
  );
};

export default App;
