import React from "react";

import Pet from "./Pet";

function PetBrowser({pets, petsLoaded, onAdoptPet}) {
  return (
    <div className="ui cards">{petsLoaded ? pets.map((pet) => <Pet key = {pet.id} pet = {pet} onAdoptPet = {onAdoptPet}/>) : <p>Loading...</p>}</div>
  );
}

export default PetBrowser;
