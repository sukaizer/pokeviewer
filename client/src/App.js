import React, { useState, useRef } from "react";
import createPersistedState from "use-persisted-state";
import "./App.css";
import search from "./assets/icons/search.svg";
import volumeOn from "./assets/icons/volumeOn.svg";
import volumeOnSFX from "./assets/sounds/volumeOn.mp3";
import volumeOff from "./assets/icons/volumeOff.svg";
import volumeOffSFX from "./assets/sounds/volumeOff.mp3";
import PokemonCart from "./components/pokemonCart/PokemonCart";
import Cursor from "./components/cursor/Cursor";
import useSound from "use-sound";

import Pokedex from "pokedex-promise-v2"; //with pokedex-promise-v2
const P = new Pokedex();

const App = () => {
  const [volumeState, setVolumeState] = useState([volumeOn, true]);
  const useSearchState = createPersistedState("Pokemon");
  const [searchTerm, setSearchTerm] = useSearchState("Pikachu");
  const [pokemonList, setPokemonList] = useState([]);
  const err = useRef();
  const [playVolumeOn] = useSound(volumeOnSFX, { volume: 0.2 });
  const [playVolumeOff] = useSound(volumeOffSFX, { volume: 0.5 });

  const searchPokemon = async (name) => {
    console.log(name);
    P.getPokemonByName(name.toLowerCase().replace(/\s/g, "")) // with Promise
      .then((response) => {
        isElementIn(response.id, pokemonList)
          ? console.log("pokemon already here")
          : setPokemonList((prevArray) => [...prevArray, response]);
        console.log(response);
      })
      .catch((error) => {
        console.log("There was an ERROR: ", error);
        displayErr();
      });
  };

  function isElementIn(index, array) {
    let b = false;
    array.forEach((e) => {
      if (index === e.id) {
        b = true;
      }
    });
    return b;
  }

  const searchPokemon2 = async (index) => {
    P.getPokemonByName(index) // with Promise
      .then((response) => {
        setPokemonList((prevArray) => [...prevArray, response]);
        console.log(response);
      });
  };

  const randomizePokemon = async () => {
    const randomNb = Math.floor(Math.random() * 897) + 1;
    if (isElementIn(randomNb, pokemonList)) {
      randomizePokemon();
    }
    searchPokemon2(randomNb);
  };

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
    isElementIn(pokemon.id, array)
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

  const displayErr = () => {
    const el = err.current;
    el.className = "no__pokemon";
    setTimeout(function () {
      el.className = "hidden no__pokemon";
    }, 1000);
  };

  return (
    <div className="padding">
      <img
        className="volume clickable"
        src={volumeState[0]}
        alt="volumeOff"
        onClick={() => {
          changeVolume();
          volumeState[1] ? playVolumeOff() : playVolumeOn();
        }}
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
          <button
            className="random__button clickable"
            onClick={() => randomizePokemon()}
          >
            Random Pokemon
          </button>
        </div>
        <div className="hidden no__pokemon" ref={err}>
          Pokemon not found !
        </div>
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
