import { useState, useEffect } from "react";
import api from "../api/axios";
import JobCard from "./JobCard";
import {useSelector,useDispatch} from 'react-redux'
import {CiSearch} from 'react-icons/ci';
import Toast from "./Toast";

function JobComp() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const {userData}=useSelector((state)=>state.auth)
  const [searchInput,setSearchInput]=useState("");
  const [filteredJobs,setFilteredJobs]=useState(jobs);
  const [toast,setToast]=useState({
    show:false,
    message: "",
    type:"success",
  })

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setError("");
        const res = await api.get("/jobs");
        setJobs(res.data.jobs);             
      } catch (e) {
        setError(e.response?.data?.message || "Failed to load jobs");
      } finally {
        setLoading(false);      }
    };

    fetchJobs();
  }, [userData.role]);


  const handleSearch=(e)=>{
    const value=e.target.value.toLowerCase();
    setSearchInput(value);
    const filtered=jobs.filter((job)=>
      job.title.toLowerCase().includes(value) || job.company.toLowerCase().includes(value) || job.location.toLowerCase().includes(value)
    );

    setFilteredJobs(filtered);


  }


  const showToast=(message,type="success")=>{
    setToast({show:true,message,type});

    setTimeout(()=>{
      setToast({show:false,message:"",type:"success"});
    },1500)
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Hi {userData?.name || "user"},Here are Jobs for you!</h2>
      <div className="flex items-center justify-center pb-3">
        <CiSearch className="mr-2 mb-2"/>
        <input type="text" className="rounded-md p-0.5 mb-2 text-center text-sm border-none" placeholder="Search jobs by title or company..." onChange={handleSearch} />
      </div>
      {loading && <p>Loading jobs...</p>}
      {error && <h4 className="text-red-500">{error}</h4>}

      {!loading && !error && jobs.length === 0 && (
        <p>No jobs found</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        {(searchInput ? filteredJobs : jobs).map((job) => 
          <JobCard key={job.id} job={job} showToast={showToast} />
        )}
      </div>
      {toast.show && (
        <Toast message={toast.message} type={toast.type} />
    )}
    </div>
  );
}

export default JobComp;