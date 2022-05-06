import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ProfileCard from "./ProfileCard";

function FindProfile() {
  const { profileName } = useParams();
  const [profileList, setProfileList] = useState([]);

  axios
    .post("/profile", { fName: profileName })
    .then((res) => {
      setProfileList(
        res.data.map((profile) => {
          const shortenedPath =
            "/profile/uploads/" +
            profile.picPath.slice(
              profile.picPath.lastIndexOf("/"),
              profile.picPath.length
            );
          const fullName = profile.fName + " " + profile.sName;
          return {
            picPath: shortenedPath,
            fullName: fullName,
            email: profile.email,
          };
        })
      );
    })
    .catch((error) => console.log(error));

  return (
    <div className="cardContainer">
      {profileList.map((profile) => {
        return (
          <div className="cardDiv">
            <ProfileCard
              foundProfPic={profile.picPath}
              fullName={profile.fullName}
              email={profile.email}
            />
          </div>
        );
      })}
    </div>
  );
}

export default FindProfile;
