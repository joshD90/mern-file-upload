import React from "react";

function ProfileCard(props) {
  //this will take the value of the Profile List which we got as a response from the
  //server
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
      </div>
    </div>
  );
}

export default ProfileCard;
