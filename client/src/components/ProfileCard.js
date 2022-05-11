import React from "react";
import { useNavigate } from "react-router-dom";

//this will take the value of the Profile List which we got as a response from the
//server accessed through props
function ProfileCard(props) {
  const navigate = useNavigate();
  console.log(props.id);

  function editClick(event) {
    event.preventDefault();
    const url = "/profile/update/" + props.id;
    console.log(url);
    navigate(url);
  }

  return (
    <div className="card" style={{ width: 280 + "px" }}>
      {/* check is there an image received from the server */}
      {props.foundProfPic && (
        <img src={props.foundProfPic} className="card-img-top" alt="Profile" />
      )}
      <div className="card-body">
        <h5>this is the profile of {props.profileName}</h5>
        <h5>Fullname: {props.fullName}</h5>
        <h5>Email: {props.email}</h5>
        <button
          value="Edit"
          className="btn btn-outline-dark btn-sm"
          onClick={editClick}
        >
          Edit
        </button>
      </div>
    </div>
  );
}

export default ProfileCard;
