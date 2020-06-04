import React, {useState, useEffect} from 'react';
import './App.css';
import PokemonList from './PokemonList';
import axios from 'axios';
import Pagination from './Pagination';

function App() {
  const[pokemon, setPokemon] = useState([]);
  const[currentPageURL, setCurrentPageURL] = useState('https://pokeapi.co/api/v2/pokemon');
  const[nextPageURL, setNextPageURL] = useState();
  const[previousPageURL, setPreviousPageURL] = useState();
  const[loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    axios.get(currentPageURL).then(res =>{
      setLoading(false)
      setNextPageURL(res.data.next) /*Next Data from the API */
      setPreviousPageURL(res.data.previous) /*Previous Data from the API */
      setPokemon(res.data.results.map(p => p.name))
    })
  }, [currentPageURL]);


  function gotoNextPage() {
    setCurrentPageURL(nextPageURL)
  }

  function gotoPreviousPage() {
    setCurrentPageURL(previousPageURL)
  }
  if (loading) return 'Loading...'

  

  
  return (
    <div>
      <PokemonList pokemon = {pokemon}/>
      <Pagination 
        gotoNextPage = {nextPageURL ? gotoNextPage : null}
        gotoPreviousPage = {previousPageURL ? gotoPreviousPage: null}
      />
    </div>
  );
}

export default App;
