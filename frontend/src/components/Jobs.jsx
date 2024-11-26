import React, { useEffect, useState, useMemo } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);

  // Memoize the filtered jobs based on searchedQuery
  const filterJobs = useMemo(() => {
    if (searchedQuery) {
      return allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase())
        );
      });
    }
    return allJobs; // If no search query, show all jobs
  }, [allJobs, searchedQuery]);

  return (
    <div className="bg-[#e3edf7] mt-[-20px] min-h-screen">
      <Navbar />
      <div className="max-w-7xl  mx-auto mt-5">
        <div className="flex gap-5  flex-col lg:flex-row">
          <div className="w-full mt-[100px] lg:w-1/5">
            <FilterCard />
          </div>
          <div className="flex-1 h-[88vh] mt-[100px] overflow-y-auto pb-5">
            {filterJobs.length <= 0 ? (
              <span className="text-center">Job not found</span>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filterJobs.map((job) => (
                  <motion.div
                    key={job?._id}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
