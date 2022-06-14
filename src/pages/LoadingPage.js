import React, { useState, useEffect } from "react";
import Loader from "../assets/loader.gif";

const LodingPage = () => {
 
 return (
   <div className="loading loder-div">  
    <img src={Loader} alt="loader" />
    </div>
  );
};


export default LodingPage;
