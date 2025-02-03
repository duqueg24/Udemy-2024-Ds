import "./App.css";

function App() {

  const customStyle = {
    color: "red",
    fontSize: "20px",
    border: "1px solid black",
  };

  return <> 
    <h1 style={customStyle} >React App</h1>
    <p>React is a JavaScript library for building user interfaces.</p>
    <p>React is used to build single-page applications.</p>
    <p>React allows us to create reusable UI components.</p>
 </>;
}

export default App;
