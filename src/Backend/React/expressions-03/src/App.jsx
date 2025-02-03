import "./App.css";

function App() {
  const images = [
    "https://picsum.photos/seed/food1/200/300",
    "https://picsum.photos/seed/food2/200/300",
    "https://picsum.photos/seed/food3/200/300",
  ];

  return (
    <>
      <h1 className="heading">My Favorite Foods</h1>
      <div>
        {images.map((src, index) => (
          <img key={index} src={src + "?grayscale"} alt={`Food ${index + 1}`} />
        ))}
      </div>
    </>
  );
}

export default App;
