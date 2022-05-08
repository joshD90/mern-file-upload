import React from "react";

//import image from local directory
import profile from "../images/profile.png";

//just renders the homepage
function HomePage() {
  return (
    <div className="welcomeDiv">
      <h1>Welcome to Profile Book</h1>
      <img className="welcomeImage" src={profile} alt="profileShadow" />
    </div>
  );
}

export default HomePage;
