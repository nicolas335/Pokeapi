/* import React from 'react'; */
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PokemonProvider } from './context/PokemonContext';
import PokemonList from './components/PokemonList';

function App() {
  return (
    <Router>
      <PokemonProvider>
        <Routes>
          <Route path="/" element={<PokemonList />} />
        </Routes>
      </PokemonProvider>
    </Router>
  );
}

export default App;


