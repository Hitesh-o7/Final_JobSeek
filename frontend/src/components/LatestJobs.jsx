import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="max-w-7xl  mx-auto my-20 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">
        <span className="text-[#6C63FF]">Latest & Top </span> Job Openings
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"> {/* Increased gap from gap-6 to gap-8 */}
        {allJobs.length <= 0 ? (
          <span>No Job Available</span>
        ) : (
          allJobs?.slice(0, 6).map((job) => (
            <div
              key={job._id}
              className="transition-all duration-300 transform
                shadow-[ -10px -10px 30px rgba(255, 255, 255, 1), 10px 10px 30px rgba(174, 174, 192, 1) ]
                hover:shadow-[ inset -10px -10px 25px 0 rgba(255, 255, 255, 0.9), inset 10px 10px 25px 0 rgba(174, 174, 192, 0.8) ]
                 hover:shadow-xl"
            >
              <LatestJobCards job={job} />
            </div>
          ))
        )}
      </div>
      <div className="flex justify-center mt-8">
        <button className="bg-[#6C63FF] text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-[#5b2fa6] transition duration-200">
          View All Jobs
        </button>
      </div>
    </div>
  );
};

export default LatestJobs;
