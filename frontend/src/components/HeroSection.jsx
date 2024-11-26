import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";
import "./style.css";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="relative w-full pt-[100px] bg-white">
      {/* Main Content */}
      <div className="relative h-screen max-w-[80%] mx-auto flex items-center justify-center bg-white">
        {/* Background Images */}
        <img
          src="bgpng.png"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <img
          src="bgsvg.svg"
          alt="Overlay"
          className="absolute inset-0 w-full h-full object-contain z-10"
        />
        <img
          src="left.svg"
          alt="Left Decoration"
          className="absolute h-[30em] object-contain top-[140px] left-0 z-20"
        />
        <img
          src="right.svg"
          alt="Right Decoration"
          className="absolute h-[30em] object-contain top-[250px] right-0 z-20"
        />

        {/* Content Section */}
        <div className="relative z-30 text-center max-w-4xl px-4">
          {/* Tagline */}
          <span className="block mx-auto px-6 py-2 mb-6 rounded-full text-[#30538a] font-semibold text-sm tracking-wider">
            Your Trusted Career Partner
          </span>

          {/* Hero Text */}
          <h1 className="text-6xl font-extrabold leading-tight text-[#1f2937] mb-6">
            Discover Jobs that Match <br />
            <span className="text-[#6A38C2]">Your Passion</span>
          </h1>

          <p className="text-lg text-gray-500 mb-12">
            Find jobs, post resumes, and start your dream career today.
          </p>

          {/* Search Bar */}
          <div className="flex w-full sm:w-[70%] lg:w-[60%] mx-auto shadow-xl border border-gray-200 pl-4 pr-2 py-2 rounded-full items-center gap-4 bg-white transition-all duration-300 hover:shadow-2xl mb-8">
            <input
              type="text"
              placeholder="Find your dream jobs"
              onChange={(e) => setQuery(e.target.value)}
              className="outline-none border-none w-full py-3 px-4 text-gray-700 rounded-full focus:ring-2 focus:ring-[#6C63FF] transition duration-200"
            />
            <Button
              onClick={searchJobHandler}
              className="rounded-full bg-[#6A38C2] hover:bg-[#5A52F5] text-white py-3 px-6 transition-transform transform hover:scale-105 shadow-lg"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>

          {/* Slider Section */}
          <div
            className="slider mt-10 mx-auto"
            style={{ "--width": "100px", "--height": "50px", "--quantity": "10" }}
          >
            <div className="list">
              <div className="item" style={{ "--position": "1" }}>
                <img src="slider1_1.png" alt="Slider 1" />
              </div>
              <div className="item" style={{ "--position": "2" }}>
                <img src="slider1_2.png" alt="Slider 2" />
              </div>
              <div className="item" style={{ "--position": "3" }}>
                <img src="slider1_3.png" alt="Slider 3" />
              </div>
              <div className="item" style={{ "--position": "4" }}>
                <img src="slider1_4.png" alt="Slider 4" />
              </div>
              <div className="item" style={{ "--position": "5" }}>
                <img src="slider1_5.png" alt="Slider 5" />
              </div>
              <div className="item" style={{ "--position": "6" }}>
                <img src="slider1_6.png" alt="Slider 6" />
              </div>
              <div className="item" style={{ "--position": "7" }}>
                <img src="slider1_7.png" alt="Slider 7" />
              </div>
              <div className="item" style={{ "--position": "8" }}>
                <img src="slider1_8.png" alt="Slider 8" />
              </div>
              <div className="item" style={{ "--position": "9" }}>
                <img src="slider1_9.png" alt="Slider 9" />
              </div>
              <div className="item" style={{ "--position": "10" }}>
                <img src="slider1_10.png" alt="Slider 10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
