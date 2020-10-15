import React from "react";
import "./pokecard.css";
var request = require("request");


export default class Pokemons extends React.Component<{}, any> {
  constructor(props: string) {
    super(props);
    this.state = {
      pokemons: [],
	  pokeId: this.props,
	  name: '',
	  description: '',
    };
  }

  componentDidMount() {
    this.fetchListPokemons();
  }

  async fetchListPokemons() {
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

  changeName(event: any) {
    var options = {
      method: "PUT",
      url: "http://localhost:5000/api/pokemons/1",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      form: {
        name: event.target.value,
      },
    };
    request(options, (error: string | undefined, response: { body: any }) => {
	  if (error) throw new Error(error);
    });
  }

  changeDesc(event: any) {
    var request = require("request");
    var options = {
      method: "PUT",
      url: "http://localhost:5000/api/pokemons/1",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      form: {
        description: event.target.value,
      },
    };
    request(options, (error: string | undefined, response: { body: any }) => {
	  if (error) throw new Error(error);
    });
  }

  render() {
    const pokemon = this.state.pokemons;
    if (pokemon)
      return (
        <div className="poke-container">
          <div className={"pokemon "}>
            <div className="img-container">
              <img src={pokemon.sprite} alt={pokemon.name} />
            </div>
            <div className="info">
              <span className="number">#{pokemon.pokeId}</span>
              <br />
              <input
                type="text"
                value={this.state.name === "" ? pokemon.name : this.state.name}
                name="name"
				onChange={e =>{
					this.changeName(e)
					this.setState({name: e.target.value})
				}}
              />
              <br />
              <small className="type">{pokemon.types}</small> <br />
              <input
                type="text"
                value={this.state.description === "" ? pokemon.description : this.state.description}
				name="description"
				onChange={e =>{
					this.changeDesc(e)
					this.setState({description: e.target.value})
				}}
              />
              <br />
            </div>
          </div>
        </div>
      );
  }
}
