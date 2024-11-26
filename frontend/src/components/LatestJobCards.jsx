import React from "react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from 'date-fns'; // Example with date-fns
import "./style2.css";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  // Format the "posted" date dynamically
  const postedDate = job?.createdAt ? formatDistanceToNow(new Date(job?.createdAt)) : "Unknown";

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="job-card p-5 rounded-lg bg-white border border-gray-200 cursor-pointer transition-all"
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-medium text-xl text-[#1f2937]">{job?.company?.name || "Unknown Company"}</h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
        <span className="text-sm text-gray-400">{`Posted ${postedDate} ago`}</span>
      </div>
      <div className="my-3">
        <h2 className="font-bold text-lg text-[#1f2937]">{job?.title}</h2>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
      <div className="flex items-center gap-3 mt-4">
        {job?.position && (
          <Badge className="text-blue-700 font-bold" variant="ghost">
            {job?.position} Positions
          </Badge>
        )}
        {job?.jobType && (
          <Badge className="text-[#F83002] font-bold" variant="ghost">
            {job?.jobType}
          </Badge>
        )}
        {job?.salary && (
          <Badge className="text-[#7209b7] font-bold" variant="ghost">
            {job?.salary} LPA
          </Badge>
        )}
      </div>
    </div>
  );
};

export default LatestJobCards;
