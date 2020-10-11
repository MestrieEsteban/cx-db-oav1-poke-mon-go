import React from "react";
import "./pokecard.css";

export default class Pokemons extends React.Component<{}, any> {
  constructor(props: string) {
    super(props);
    this.state = {
      pokemons: [],
      pokeId: this.props,
    };
  }

  componentDidMount() {
    this.fetchListPokemons();
  }

  async fetchListPokemons() {
    var request = require("request");
    var options = {
      method: "GET",
      url: `http://localhost:5000/api/pokemons${this.state.pokeId.location.pathname}`,
      headers: {},
      form: {},
    };
    request(options, (error: string | undefined, response: { body: any }) => {
      if (error) throw new Error(error);
      let pokemons = JSON.parse(response.body);
      this.setState({ pokemons: pokemons.data.array[0] });
    });
  }

  changeName(event : any) {
	console.log(event.target.value);	
  }

  render() {
	const pokemon = this.state.pokemons;
	console.log(pokemon);
	if(pokemon)
    return (
      <div className="poke-container">
        <div className={"pokemon "}>
            <div className="img-container">
              <img src={pokemon.sprite} alt={pokemon.name} />
            </div>
            <div className="info">
              <span className="number">
				  #{pokemon.pokeId}
              </span>
			  <br/>
              <input type="text" value={pokemon.name} name="name" onChange={this.changeName}/><br/>
              <small className="type">{pokemon.types}</small> <br/>
              <input type="text" value={pokemon.description} name="description"/><br/>
            </div>
        </div>
      </div>
    );
  }
}
