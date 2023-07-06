import './App.css';
import Body from './Components/Body';
import Footer from './Components/Footer';
import Homepage from './Components/Homepage';
import Services from './Components/Services'

function App() {
  return (
    <div className="App">
      <Homepage />
      <Body/>
      <Services />
      <Footer />

    </div>
  );
}

export default App;
