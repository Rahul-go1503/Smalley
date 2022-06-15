import './App.css';
import {Routes, Route} from 'react-router-dom';
import InputURl from './components/InputURl';
import ShowShortURL from './components/ShowShortURL'
import Header from './components/Header/Header';
import NotFound from './components/Not Found/NotFound';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Header/>
        <Routes>
          <Route path='/' exact element={<InputURl/>}/>
          <Route path='/shorturl/:id' exact element={<ShowShortURL/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
        <Footer/>
    </div>
  );
}

export default App;
