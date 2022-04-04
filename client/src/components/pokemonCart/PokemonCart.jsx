import React, { useState, useRef} from 'react'
import "./pokemonCart.css"
import {
    cart1, cart2, cart3, cart4, cart5, cart6, cart7, cart8, cart9, cart10, cart11, cart12, cart13, cart14, cart15, cart16, arrow, heart, trash, bin1, bin2
} from "./import"
import useSound from 'use-sound';

import heartSFX from '../../assets/sounds/heart.mp3';

const PokemonCart = ({pokemon, childToParent, volumeState}) => {
    const visibleHeart = useRef();
    const bin_closed = useRef();
    const bin_opened = useRef();
    const [play] = useSound(heartSFX, { volume: 0.005 });

    var carts = [cart1, cart2, cart3, cart4, cart5, cart6, cart7, cart8, cart9, cart10, cart11, cart12, cart13, cart14, cart15, cart16];
    
    const randomNb =  Math.floor(Math.random() * 15);
    const [actualCart, setActualCart] = useState([carts[randomNb], randomNb]);

    function heightConversion(height) {
        let newHeight = height / 10;
        return newHeight;
    }

    function weightConversion(weight) {
        let newWeight = weight / 100;
        return newWeight;
    }

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
        //TODO prendre en compte la taille du sprite pour les pokemons "grands"
        //console.log(visibleHeart.current);
        let el = visibleHeart.current;
        el.style.display = "block";
        el.className = "fade-out";
        setTimeout(function () { 
        el.style.display = "none";
        el.className = "fade-in";
         }, 300);
    }

    function setIsShown(bool) {
        let b1 = bin_closed.current;
        let b2 = bin_opened.current;
        if (bool) {
            b1.className = "clickable hidden";
            b2.className = "clickable";
        } else {
            b1.className = "clickable";
            b2.className = "clickable hidden";
        }
    }


    return (
        <div className="pokemon__cart">    
            <img className="cart" src={actualCart[0]} alt={cart2} />
            <div className='wrapper__left clickable' onClick={() => previousCart()}>
                <img className='arrow__left clickable' src={arrow} alt="left" />   
            </div>
            <div className='wrapper__right clickable' onClick={() => nextCart()}>
                <img className='arrow__right clickable' src={arrow} alt="right" />
            </div>
            <div className='description'>
                <p><span className='poke'>{pokemon.name}</span>{" #" + pokemon.id.toString()}</p>
                <p>{"height : " + heightConversion(pokemon.height) + "m"}</p>
                <p>{"weight : " + weightConversion(pokemon.weight) + "kg"}</p>
            </div>
            <div
                className='wrapper__trash clickable'
                onClick={() => childToParent(pokemon)}
                onMouseEnter={() => setIsShown(true)}
                onMouseLeave={() => setIsShown(false)}>
                
                <img
                    className='clickable'
                    ref={bin_closed}
                    src={bin1}
                    alt="right" />
                
                <img
                    className='clickable hidden'
                    ref={bin_opened}
                    src={bin2}
                    onClick={() => childToParent(pokemon)}
                    alt="right" />
            </div>

            <div className='heart'>
                <img className='fade-in' ref={visibleHeart} src={heart} id="heart" alt="heart"/>
            </div>
            <div className='pokemon'>
                <img
                    className='clickable'
                    onClick={() => {
                        heartPopUp();
                        volumeState ? play() : console.log("muted");
                    }}
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name} />
            </div>
        </div>
    );
}

export default PokemonCart