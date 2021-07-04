import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom'
import HomePage from './Components/HomePage';

function App() {
  return (
    
    <BrowserRouter>
       <Route exact path="/" component={HomePage} />
       
    </BrowserRouter>
  );
}

export default App;
