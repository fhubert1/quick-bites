import styles from "../src/App.module.css";
import { Contact } from "./components/ContactUs/ContactUs";
import { Navbar } from "./components/Navbar/Navbar";

function App() {
  return (
    <div className={styles.App}>
      <Navbar />
      <Contact />
    </div>
  );
}

export default App;
