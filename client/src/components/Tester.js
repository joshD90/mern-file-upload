import React from "react";
import { useSearchParams } from "react-router-dom";
//this component is purely for testing out different functions etc.
//this is to allow easier development to test out ideas without all the
//extranious material involved in other components and can delete any data
//without any worries of breaking the overall project
function Tester() {
  const testArray = [
    { name: "Josh" },
    { name: "James" },
    { name: "Joel" },
    { name: "Sammy" },
  ];

  const [searchParams] = useSearchParams();
  console.log(searchParams.get("name"));
  if (searchParams.get("name") != null) {
    console.log(
      "we have a name search param which is " + searchParams.get("name")
    );
  } else if (searchParams.get("email") != null) {
    console.log(
      "we have an email search param which is " + searchParams.get("email")
    );
  }

  return testArray.map((person) => {
    return <h1>{person.name}</h1>;
  });
}

export default Tester;
