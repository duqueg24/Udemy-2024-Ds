import "./App.css";

import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Note from "./components/Note/Note.jsx";

function App() {
  return (
    <>
      <Header />
      <div className="notes-container">
        <Note title="Planex" content="Contenido de la nota." />
      </div>
      <Footer />
    </>
  );
}

export default App;
