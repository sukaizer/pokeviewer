import React from 'react'
import "./pokemonCart.css"

const PokemonCart = (pokemon) => {
    return (
    <div className="pokemon__cart">
        <div>
            <p>{pokemon.pokemon.name}</p>
        </div>

        <div>
            <img src={pokemon.pokemon.sprites.front_default} alt={pokemon.pokemon.name}/>
        </div>
        <div>
            <span>{pokemon.Type}</span>
            <h3>{pokemon.Title}</h3>
        </div>
    </div>);
}

export default PokemonCart