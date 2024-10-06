import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from '../../redux/actions/jobActions';
import JobCard from '../jobcard/JobCard';
import './alljobs.css'

const AllJobsScreen = () => {
  const dispatch: any = useDispatch();
  const { jobs, loading, error } = useSelector((state:any) => state.jobs);
  console.log(jobs);
  

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  if (loading) return <p>Loading jobs...</p>;
  if (error) return <p>Error fetching jobs: {error}</p>;

  return (
    <div className='container'>
      <h1>All Jobs (32)</h1>
      <div className="job-list">
        {jobs.map((job: any) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default AllJobsScreen;
