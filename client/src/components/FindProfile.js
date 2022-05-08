import axios from "axios";
import React, { useState, useEffect } from "react";
import ProfileCard from "./ProfileCard";
import { useSearchParams } from "react-router-dom";

function FindProfile() {
  //profile list is what will be populated once we get a response
  //from server.  Needs to be set with [] due to recieving an array
  const [profileList, setProfileList] = useState([]);
  //this will be used to grab the search paramaters from the url that have
  //passed over.  React router dom hook
  const [searchParams] = useSearchParams();

  //set up variables to be populated later
  let searchKey;
  let searchValue;
  //we have to call the .get function to get the parameters. Can't be
  //gotten as part of . notation
  //check the params and set the key through an if statement as we have
  // to use the .get function and one argument is required for this
  if (searchParams.get("fName") != null) {
    searchKey = "fName";
    searchValue = searchParams.get("fName");
  } else if (searchParams.get("email") != null) {
    searchKey = "email";
    searchValue = searchParams.get("email");
  } else if (searchParams.get("sName") != null) {
    searchKey = "sName";
    searchValue = searchParams.get("sName");
  }

  //now we can post the data to the endpoint once we have the key/value pair
  //to insert into our serverside mongoose function
  useEffect(() => {
    axios
      .post("/profile", { [searchKey]: searchValue })
      .then((res) => {
        //on response we need to remap out data into another array to include
        //a change of pathname and fullname which will fit into the necessary
        //information required in the card
        setProfileList(
          res.data.map((profile) => {
            //we can get a consistant path that will match with the correct
            //serverside endpoint by slicing from the last index of the / char
            //until the end
            const shortenedPath =
              "/profile/uploads/" +
              profile.picPath.slice(
                profile.picPath.lastIndexOf("/"),
                profile.picPath.length
              );
            const fullName = profile.fName + " " + profile.sName;
            //returning the newly mapped object into the profile list array
            return {
              picPath: shortenedPath,
              fullName: fullName,
              email: profile.email,
            };
          })
        );
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="cardContainer">
      {/* now that we have the adjusted values we can map the values directly onto
      our profile card component */}
      {profileList.map((profile, index) => {
        return (
          <div className="cardDiv" key={index}>
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
