import React from "react";
import { MdLocationOn } from "react-icons/md";
import Button from "./Button";
import { CiCircleRemove } from "react-icons/ci";
import api from "../api/axios";

export default function SavedJobsCard({ job, onRemove,showToast }) {
  const { id, job_url, title, company, location } = job ?? {}

  const handleApply = () => {
    if (!job_url) return;
    window.open(job_url, "_blank", "noopener,noreferrer");
  };

  const handleRemove = async () => {
    try {
      await api.delete(`/saved-jobs/${id}`);
      onRemove(id); // 🔥 update UI instantly
      showToast("job removed from saved!","error"
      )
    } catch (e) {
      console.log(e.response?.data?.message || "Remove failed");
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-300 p-5 shadow-md hover:shadow-lg">

      <div className="flex justify-between">
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-gray-600">{company}</p>
        </div>

        <button
          onClick={handleRemove}
          className="h-10 w-10 flex items-center justify-center border rounded-lg hover:bg-red-300"
        >
          <CiCircleRemove />
        </button>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center gap-2 text-sm">
          <MdLocationOn />
          <span>{location}</span>
        </div>

        <Button onClick={handleApply}>
          Apply
        </Button>
      </div>
    </div>
  );
}