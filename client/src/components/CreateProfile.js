import React, { useState } from "react";
import axios from "axios";

function CreateProfile(props) {
  //tracking changes in our form inputs
  const [file, setFile] = useState();
  const [name, setName] = useState();
  const [secondName, setSecondName] = useState();
  const [email, setEmail] = useState();
  //this is the name that is to be sent through with the formData
  const [fileName, setFileName] = useState();
  //this is to display for the user where the file has been uploaded to
  const [uploadedFilePath, setUploadedFilePath] = useState("Choose File");
  //this uses useState hook to effectively give an event listener to the selecting
  //of a file in our form.  Once it's selected it loads it into the file variable
  //which will be sent off on event click
  function selectFile(event) {
    setFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
  }
  //this actively updates the name variable dynamically as the form is changed
  function nameInputChange(event) {
    setName(event.target.value);
  }

  function secondNameChange(event) {
    setSecondName(event.target.value);
  }

  function emailChange(event) {
    setEmail(event.target.value);
  }

  //this will trigger as soon as the form submit button is clicked
  async function uploadFile(event) {
    event.preventDefault();
    //we need to send things off as form data so we can append the file to it
    const formData = new FormData();
    //give the object name first, then object value
    formData.append("file", file);
    formData.append("userName", name);
    formData.append("secondName", secondName);
    formData.append("email", email);

    //this does the actual axios sending it off the upload endpoint
    try {
      const res = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      //once we get our response then we update the file uploaded path
      setUploadedFilePath(`File has been uploaded to ${res.data.filePath}`);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      <h4> {uploadedFilePath} </h4>
      {/* we don't any form actions as this is taken care of in the onClick.
        When the form has it's own headers and actions this interfers with the axios call */}
      <div className="formContainer">
        <form className="row g-3">
          <div className="mb-3 mt-3">
            <label className="form-label" htmlFor="firstNameInput">
              Input Your First Name
            </label>
            <input
              className="form-control"
              type="text"
              name="firstNameInput"
              onChange={nameInputChange}
            />
          </div>
          <div className="mb-3 mt-3">
            <label className="form-label" htmlFor="secondNameInput">
              Input Your Second Name
            </label>
            <input
              className="form-control"
              type="text"
              name="secondNameInput"
              onChange={secondNameChange}
            />
          </div>
          <div className="mb-3 mt-3">
            <label className="form-label" htmlFor="emailChange">
              Input Your Email
            </label>
            <input
              className="form-control"
              type="email"
              name="emailInput"
              onChange={emailChange}
            />
          </div>
          <div className="mb-3 mt-3">
            <label className="form-label" htmlFor="myFile">
              Choose Your Profile Picture
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
            value="Upload Profile"
            onClick={uploadFile}
          />
        </form>
      </div>
    </div>
  );
}

export default CreateProfile;
