import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//this component will extract the information from the form inputted
//and concatonate it into a url string which it will useNavigate to
//route to the FindProfile component.
function SearchProfile() {
  const [searchTerm, setSearchTerm] = useState();
  //set the key value as default fName as the setSearchType only
  //is picked up on change of the form selector
  const [searchType, setSearchType] = useState("fName");
  const navigate = useNavigate();
  //set the value of the value triggered by the change of input
  function updateSearchTerm(event) {
    setSearchTerm(event.target.value);
  }
  //set the value of the key triggered by the change of input
  function updateSearchType(event) {
    setSearchType(event.target.value);
  }
  //activate on form submission - navigate to the /profile route
  //after setting the search parameters through the url
  function submitSearch(event) {
    event.preventDefault();
    const profileUrl = "/profile?" + searchType + "=" + searchTerm;
    navigate(profileUrl);
  }

  return (
    <form className="row g3">
      <div className="mb-3 mt-3">
        <label className="form-label" htmlFor="searchTerm">
          Input your Search Criteria
        </label>
        <input
          name="searchTerm"
          className="form-input"
          type="text"
          onChange={updateSearchTerm}
        />
      </div>
      <div className="mb-3 mt-3">
        <label className="form-label" htmlFor="typeSearch">
          What Criteria to do your Search Under
        </label>
        <select
          name="typeSearch"
          className="form-input"
          onChange={updateSearchType}
        >
          <option value="fName">First Name</option>
          <option value="sName">Second Name</option>
          <option value="email">Email</option>
        </select>
      </div>
      <input
        className="btn btn-primary"
        type="submit"
        value="Search Profile"
        onClick={submitSearch}
      />
    </form>
  );
}

export default SearchProfile;
