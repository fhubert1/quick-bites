import styles from "../src/App.module.css";
import { Navbar } from "./components/Navbar/Navbar";
import {Contact} from './components/ContactUs/ContactUs'

function App() {
  return (
    <div className={styles.App}>
      <Navbar />
      <Contact />
    </div>
  );
}

export default App;
