import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);

  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5; // Number of jobs per page

  const navigate = useNavigate();

 useEffect(() => {
   const filteredJobs = allAdminJobs
     .filter((job) => {
       if (!searchJobByText) {
         return true;
       }
       return (
         job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
         job?.company?.name
           .toLowerCase()
           .includes(searchJobByText.toLowerCase())
       );
     })
     .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by createdAt descending

   setFilterJobs(filteredJobs);
 }, [allAdminJobs, searchJobByText]);


  const downloadPDF = () => {
    if (!filterJobs || filterJobs.length === 0) {
      alert("No jobs data available to download!");
      return;
    }

    const doc = new jsPDF();
    const tableColumn = ["Company Name", "Role", "Date", "Description"];
    const tableRows = [];

    filterJobs.forEach((job) => {
      const jobData = [
        job?.company?.name || "N/A",
        job?.title || "N/A",
        job?.createdAt?.split("T")[0] || "N/A",
        job?.description,
      ];
      tableRows.push(jobData);
    });

    doc.text("Jobs Report", 14, 14);
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      theme: "grid",
      headStyles: { fillColor: [46, 204, 113] }, // Green color for the header
      bodyStyles: { fillColor: [229, 244, 234] }, // Light green color for rows
      alternateRowStyles: { fillColor: [204, 235, 216] }, // Alternate row color
    });

    doc.save("jobs-report.pdf");
  };

  // Calculate jobs to display on the current page
  const startIndex = (currentPage - 1) * jobsPerPage;
  const currentJobs = filterJobs.slice(startIndex, startIndex + jobsPerPage);

  // Calculate total pages
  const totalPages = Math.ceil(filterJobs.length / jobsPerPage);

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button onClick={downloadPDF}>Download PDF</Button>
      </div>
      <Table>
        <TableCaption>A list of your recently posted jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentJobs?.map((job) => (
            <TableRow key={job._id}>
              <TableCell>{job?.company?.name}</TableCell>
              <TableCell>{job?.title}</TableCell>
              <TableCell>{job?.createdAt?.split("T")[0]}</TableCell>
              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
      
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    <div
                      onClick={() => navigate(`/admin/companies/${job._id}`)}
                      className="flex items-center gap-2 w-fit cursor-pointer"
                    >
                      <Edit2 className="w-4" />
                      <span>Edit</span>
                    </div>
                    <div
                      onClick={() =>
                        navigate(`/admin/jobs/${job._id}/applicants`)
                      }
                      className="flex items-center w-fit gap-2 cursor-pointer mt-2"
                    >
                      <Eye className="w-4" />
                      <span>Applicants</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center mt-4">
        <Button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default AdminJobsTable;