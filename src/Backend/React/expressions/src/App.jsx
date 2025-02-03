function App() {
  const fName = "Diego";
  const lName = "Gonzalez";
  return (
    <>
      <h1>Hello, {fName} {lName}!</h1>
      <p>Your lucky number is {Math.floor(Math.random() * 10)}</p>
    </>
  );
}

export default App;
