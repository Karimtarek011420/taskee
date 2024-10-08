import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import JobCard from "../jobcard/JobCard";
import "./alljobs.css";
import { fetchJobs, fetchJobsQuery } from "../../RTK/JobsSlice";

const AllJobsScreen = () => {
  const dispatch: any = useDispatch();
  const Data = useSelector((state: any) => state?.jobs?.jobs);
  const Query = useSelector((state: any) => state?.jobs?.Query);

  useEffect(() => {
    if (!Query) {
      dispatch(fetchJobs());
    } else {
      dispatch(fetchJobsQuery(Query));
      console.log(Query);
    }
  }, [Query, dispatch]);

  const MappingJob = () => {
    if (Data) {
      return Data.map((job: any) => <JobCard key={job.id} job={job} />);
    }
  };

  return (
    <div className="container">
      <h1>
        {Query !== "" ? `"${Query}"` : "All Jobs"} ({Data?.length})
      </h1>

      <div className="job-list">
        {MappingJob()}
        {Data?.length === 0 && "There's no Data"}
      </div>
    </div>
  );
};

export default AllJobsScreen;
