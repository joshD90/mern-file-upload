import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function UpdateProfile(props) {
  //set up our parameters
  const { id } = useParams();
  const [updatedYet, setUpdatedYet] = useState(false);

  //set up the original state of these inputs to match the response object we got back
  //from mongo and server
  const [firstNameInput, setFirstNameInput] = useState();
  const [secondNameInput, setSecondNameInput] = useState();
  const [emailInput, setEmailInput] = useState();
  const [fileInput, setFileInput] = useState();
  const [picPath, setPicPath] = useState();
  //get the profile information using the servers /update/idparam
  useEffect(() => {
    axios
      .get(`/profile/update/${id}`)
      .then((res) => {
        setFirstNameInput(res.data[0].fName);
        setSecondNameInput(res.data[0].sName);
        setEmailInput(res.data[0].email);
        setPicPath(res.data[0].picPath);
      })
      .catch((err) => console.log(err));
  }, []);

  //track changes to inputs
  function firstNameChange(event) {
    setFirstNameInput(event.target.value);
  }
  function secondNameChange(event) {
    setSecondNameInput(event.target.value);
  }
  function emailChange(event) {
    setEmailInput(event.target.value);
  }
  function selectFile(event) {
    setFileInput(event.target.files[0]);
  }

  //handles the click event
  function updateProfile(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("firstNameInput", firstNameInput);
    formData.append("secondNameInput", secondNameInput);
    formData.append("emailInput", emailInput);
    formData.append("picPath", picPath);
    formData.append("file", fileInput);
    formData.append("id", id);

    axios
      .post("/profile/update", formData)
      .then((res) => {
        setUpdatedYet(true);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <h4> Update Profile with Id: {id}</h4>
      {updatedYet && <h5>Profile with Id: {id} has been updated</h5>}
      {/* we don't any form actions as this is taken care of in the onClick.
    When the form has it's own headers and actions this interfers with the axios call */}
      <div className="formContainer">
        <form className="row g-3">
          <div className="mb-3 mt-3">
            <label className="form-label" htmlFor="firstNameInput">
              Update First Name
            </label>
            <input
              className="form-control"
              type="text"
              name="firstNameInput"
              placeholder={firstNameInput}
              onChange={firstNameChange}
            />
          </div>
          <div className="mb-3 mt-3">
            <label className="form-label" htmlFor="secondNameInput">
              Update Second Name
            </label>
            <input
              className="form-control"
              type="text"
              name="secondNameInput"
              placeholder={secondNameInput}
              onChange={secondNameChange}
            />
          </div>
          <div className="mb-3 mt-3">
            <label className="form-label" htmlFor="emailChange">
              Update Email
            </label>
            <input
              className="form-control"
              type="email"
              name="emailInput"
              placeholder={emailInput}
              onChange={emailChange}
            />
          </div>
          <div className="mb-3 mt-3">
            <label className="form-label" htmlFor="myFile">
              Choose Your Profile Picture. If you do not change this Picture
              will remain the same
            </label>
            <input
              className="form-control"
              type="file"
              name="myFile"
              onChange={selectFile}
            />
          </div>
          <input
            className="btn btn-primary"
            type="submit"
            value="Update Profile"
            onClick={updateProfile}
          />
        </form>
      </div>
    </div>
  );
}

export default UpdateProfile;
