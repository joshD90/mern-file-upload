import React from "react";

function Tester() {
  const testArray = [
    { name: "Josh" },
    { name: "James" },
    { name: "Joel" },
    { name: "Sammy" },
  ];

  return testArray.map((person) => {
    return <h1>{person.name}</h1>;
  });
}

export default Tester;
