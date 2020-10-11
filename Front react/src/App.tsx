import React from 'react';
import {
	BrowserRouter as Router,
	Route
  } from 'react-router-dom'
import './App.css';
import Pokemons from './pokemon';
import PokeInfo from './pokeInfo';


function App() {
	return (
		<Router>
		  <div className="Home">
			<div className="navbar-header">
			  <a className="navbar-brand" href="/">
			  </a>
			</div>
			<div>
			  <Route path="/" component={Pokemons} exact />
			  <Route path="/:id" component={PokeInfo} exact />
			</div>
		  </div>
		</Router >
	  );
	}
export default App;
