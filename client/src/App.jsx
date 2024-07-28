import styles from "../src/App.module.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { Menu } from "./pages/Menu";
import Contact from "./pages/Contact";
import SignupForm from "./pages/Signup";
import LoginForm from "./pages/Login";
import Home from "./pages/Home";

function App() {
  return (
    <div className={styles.App}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
