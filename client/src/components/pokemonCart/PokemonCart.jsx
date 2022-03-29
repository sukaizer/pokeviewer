import React, { useState, useRef } from 'react'
import "./pokemonCart.css"
import {
    cart1, cart2, cart3, cart4, cart5, cart6, cart7, cart8, cart9, cart10, cart11, cart12, cart13, cart14, cart15, cart16, arrow, heart
} from "./import"

const PokemonCart = (pokemon) => {
    const [actualCart, setActualCart] = useState([cart1, 0]);
    const visibleHeart = useRef();

    var carts = [cart1, cart2, cart3, cart4, cart5, cart6, cart7, cart8, cart9, cart10, cart11, cart12, cart13, cart14, cart15, cart16];

    function previousCart() {
        if (actualCart[1] > 0) {
            actualCart[1]--;
        } else {
            actualCart[1] = 15;
        }
        setActualCart([carts[actualCart[1]],actualCart[1]]);
        console.log(actualCart[1]);
    }

    function nextCart() {
        if (actualCart[1] < carts.length - 1) {
            actualCart[1]++;
        } else {
            actualCart[1] = 0;
        }
        setActualCart([carts[actualCart[1]],actualCart[1]]);
        console.log(actualCart[1]);
    }

    function heartPopUp() {
        console.log(visibleHeart.current);
        let el = visibleHeart.current;
        el.style.display = "block";
        el.className = "fade-out";
        setTimeout(function () { 
        el.style.display = "none";
        el.className = "fade-in";
         }, 1000);
    }

    return (
        <div className="pokemon__cart">    
            <img className="cart" src={actualCart[0]} alt={cart2} />
            <div className='wrapper__left' onClick={() => previousCart()}>
                <img className='arrow__left' src={arrow} alt="left" />   
            </div>
            <div className='wrapper__right' onClick={() => nextCart()}>
                <img className='arrow__right' src={arrow} alt="right" />
            </div>
            <div className='description'>
                {pokemon.pokemon.name + " #" + pokemon.pokemon.id.toString()}
            </div>

            <div className='heart'>
                <img className='fade-in' ref={visibleHeart} src={heart} id="heart" alt="heart"/>
            </div>
            <div className='pokemon'>
                <img onClick={() => heartPopUp()} src={pokemon.pokemon.sprites.front_default} alt={ pokemon.pokemon.name } />
            </div>
        </div>
    );
}

export default PokemonCart