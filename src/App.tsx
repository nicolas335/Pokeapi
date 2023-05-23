import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PokemonProvider } from './context/PokemonContext';
import PokemonList from './components/PokemonList';
import './index.css';
import { ThemeConfig } from './themes/theme.config';

function App() {
  return (
    <ThemeConfig>
    <Router>
      <PokemonProvider>
        <Routes>
          <Route path="/" element={<PokemonList />} />
        </Routes>
      </PokemonProvider>
    </Router>
    </ThemeConfig>
  );
}

export default App;


