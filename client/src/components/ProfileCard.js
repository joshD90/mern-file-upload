import React from "react";

function ProfileCard(props) {
  return (
    <div className="card" style={{ width: 250 + "px" }}>
      {props.foundProfPic && (
        <img src={props.foundProfPic} className="card-img-top" />
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
