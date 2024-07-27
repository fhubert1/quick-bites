import './App.css'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';


function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<login />} />
          <Route path="/Contact" element={<ContactUs />} />
          </Routes>
          </Router>
          </div>
  );
}

export default App
