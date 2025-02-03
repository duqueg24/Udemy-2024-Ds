import "./App.css";

function App() {
  const getGreetingAndColor = () => {
    const currHour = new Date().getHours();
    let greeting = "";
    let color = "";

    if (currHour >= 12 && currHour < 18) {
      greeting = "Good Afternoon";
      color = "red";
    } else if (currHour >= 18 && currHour <= 24) {
      greeting = "Good Evening";
      color = "green";
    } else {
      greeting = "Good Morning";
      color = "blue";
    }

    return { greeting, color };
  };

  const { greeting, color } = getGreetingAndColor();

  return (
    <>
      <h1 className="heading" style={{ color: color }}>
        {greeting}
      </h1>
    </>
  );
}

export default App;
