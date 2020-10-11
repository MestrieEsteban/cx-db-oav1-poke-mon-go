import React from "react";
import PokeCard from "./pokecard";
import './pokemon.css'

export default class Pokemons extends React.Component<{},any> {
  constructor(props: string) {
    super(props);
    this.state = {
      pokemons: [],
    };
  }

  componentDidMount() {
    this.fetchListPokemons();
  }

  async fetchListPokemons() {
    var request = require("request");
    var options = {
      method: "GET",
      url: "http://localhost:5000/api/pokemons/",
      headers: {
		
	  },
      form: {},
    };
    request(options,  (error: string | undefined, response: { body: any; }) => {
	  if (error) throw new Error(error);
	  let pokemons = JSON.parse(response.body);
	  this.setState({ pokemons : pokemons.data.array })
    });
  }

  render() {
	const pokemons = this.state.pokemons;
    return <div className="poke-container ">
			{pokemons.map((pokemon: { name: string; pokeId: number; sprite: string; types: [] }) => (
				<PokeCard ndex={pokemon.pokeId} name={pokemon.name} sprite={pokemon.sprite} types={pokemon.types} />
			))}
	</div>;
  }
}
