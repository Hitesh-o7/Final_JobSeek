import React from "react";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useNavigate } from "react-router-dom";
import "./style3.css";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="my-card">
      {/* Job Header */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-gray-500">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button
          variant="ghost"
          className="p-1 rounded-full hover:bg-gray-100"
          size="icon"
        >
          <Bookmark className="h-5 w-5 text-gray-700" />
        </Button>
      </div>

      {/* Company Details */}
      <div className="flex items-center gap-3 mb-4">
        <Avatar className="h-10 w-10">
          <AvatarImage
            src={job?.company?.logo || "https://via.placeholder.com/40"}
            alt="Company Logo"
            className="h-full w-full rounded-full"
          />
        </Avatar>
        <div>
          <h1 className="font-semibold text-base text-[#1f2937]">
            {job?.company?.name}
          </h1>
          <p className="text-xs text-gray-500">India</p>
        </div>
      </div>

      {/* Job Details */}
      <div>
        <h1 className="font-bold text-lg text-[#1f2937] mb-1">{job?.title}</h1>
        <p className="text-sm text-gray-600 leading-tight line-clamp-2">
          {job?.description}
        </p>
      </div>

      {/* Badges */}
      <div className="flex items-center gap-2 mt-3">
        <Badge
          className="text-blue-700 font-semibold bg-blue-100 px-2 py-1 rounded-md"
          variant="ghost"
        >
          {job?.position} Positions
        </Badge>
        <Badge
          className="text-[#F83002] font-semibold bg-red-100 px-2 py-1 rounded-md"
          variant="ghost"
        >
          {job?.jobType}
        </Badge>
        <Badge
          className="text-[#7209b7] font-semibold bg-purple-100 px-2 py-1 rounded-md"
          variant="ghost"
        >
          {job?.salary} LPA
        </Badge>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 mt-4">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="bg-[#e3edf7] border-[#1f2937] text-[#1f2937] hover:bg-[#1f2937] hover:text-white transition-colors text-sm py-2 px-4"
        >
          View Details
        </Button>
        <Button className="bg-[#6C63FF] text-white hover:bg-blue-700 transition-colors text-sm py-2 px-4">
          Save For Later
        </Button>
      </div>
    </div>
  );
};

export default Job;
