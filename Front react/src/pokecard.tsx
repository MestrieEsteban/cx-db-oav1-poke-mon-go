import React from "react";
import './pokecard.css';


function PokeCard(props: { ndex: number; name: string, sprite: string, types: [] }) {
	let type = props.types.toString();
	let color = type.split(',')
	
  return (
	<div className={"pokemon " + color[0]}>
		<a href={`/${props.ndex}`} className='decoration'>
		<div className="img-container">
			<img
			src={props.sprite}
			alt={props.name}
			/>
		</div>
		<div className="info">
			<span className="number">#{props.ndex.toString().padStart(3, '0').toString().padStart(3, '0')}</span>
			<h3 className="name">{props.name}</h3>
			<small className="type">
				{props.types.toString()}
			</small>
		</div>
		</a>
	</div>
  );
}

export default PokeCard;
