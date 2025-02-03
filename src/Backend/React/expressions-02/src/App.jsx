import "./App.css";

const name = "Diego Duque";
const year = new Date().getFullYear();

function App() {
  return (
    <>
      <div>
        <p>Created by {name}</p>
        <p>Copyright {year}</p>
      </div>
    </>
  );
}

export default App;
