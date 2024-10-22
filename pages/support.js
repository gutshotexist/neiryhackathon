import React from "react";
import NavBar from "../components/NavBar";
import BottomBar from "../components/BottomBar";
import SupportComponent from "../components/Support";

const SupportPage = () => {
  return (
    <div className="min-h-screen bg-background md:bg-black">
      <NavBar />
      <SupportComponent />
      <BottomBar />
    </div>
  );
};

export default SupportPage;
