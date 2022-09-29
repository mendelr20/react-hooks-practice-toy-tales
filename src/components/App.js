import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([])

  useEffect(()=>{
    fetch("http://localhost:3001/toys")
    .then(res => res.json())
    .then(data => setToys(data))
  }, [])

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function handleAddToy(newToy){
    setToys([...toys, newToy])
  }

  function onDeleteToy(toyToDelete){
    const updatedToyList = toys.filter((toy) => toy.id !== toyToDelete.id);
    setToys(updatedToyList);
  }
  function onUpdateToy(updatedToy){
    const updatedToyList = toys.map((toy) =>
      toy.id === updatedToy.id ? updatedToy : toy
    );
    setToys(updatedToyList);
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm handleAddToy={handleAddToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} onDeleteToy={onDeleteToy} onUpdateToy={onUpdateToy} />
    </>
  );
}

export default App;
