import React, { useEffect, useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [petsLoaded, setPetsLoaded] = useState(false);
  const [filters, setFilters] = useState({ type: "all" });

  useEffect(()=> {
    onFindPetsClick();  
      }, [])

  function onFindPetsClick() {
    let fetchURL

    if(filters.type === "all") {
      fetchURL = "http://localhost:3001/pets";
    }
    else {
      fetchURL = `http://localhost:3001/pets?type=${filters.type}`
    }

    fetch(fetchURL)
      .then((r)=>r.json())
      .then((petsList) => setPets(petsList))
      .then(()=>setPetsLoaded(true));   
    }
  
  function onChangeType(filter) {
    setFilters(filter);
  }

  function onAdoptPet(selectedPetID) {
    let updatedPet;
    
    const newPetList = pets.map((newPet) => {
      if(newPet.id === selectedPetID) {
        newPet.isAdopted = true;
        updatedPet = newPet;
        return newPet
      }
      else {
        return newPet;
      }
    })

    setPets(newPetList);

    fetch(`http://localhost:3001/pets/${selectedPetID}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
      },
    body: JSON.stringify(updatedPet)
    })
  }

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters filters = {filters} onChangeType = {onChangeType} onFindPetsClick = {onFindPetsClick} />
          </div>
          <div className="twelve wide column">
            <PetBrowser pets = {pets} petsLoaded = {petsLoaded} onAdoptPet = {onAdoptPet} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
