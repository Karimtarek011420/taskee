import { useEffect } from "react";
import { fetchJobs, fetchJobsQuery } from "../../RTK/JobsSlice";
import JobCard from "../jobcard/JobCard";
import { useDispatch, useSelector } from "react-redux";
import "./SearchStyle.css";
import { RootState } from "../../RTK/store";
import { Link } from "react-router-dom";

export default function SearchComponent() {
  const dispatch: any = useDispatch();
  const Data = useSelector((state: any) => state?.jobs?.jobs);
  const Query = useSelector((state: any) => state?.jobs?.Query);
  const searchHistory = useSelector((state: RootState) => state.search.searchHistory);



  useEffect(() => {
    if (!Query) {
      dispatch(fetchJobs());
    } else {
      dispatch(fetchJobsQuery(Query));
      console.log(Query);
    }
  }, [Query, dispatch]);

  const MappingJob = () => {
    if (Query) {
      return Data.map((job: any) => <JobCard key={job.id} job={job} />);
    }
  };

  return (
    <div className="container">
      <h1>
        {Query !== "" && (
          <>
            <span>"{Query}"</span> <span>({Data?.length})</span>
          </>
        )}
      </h1>
      <div className="job-list">
        <div className="job-list">
          {MappingJob()}

          {Data?.length === 0 && "There's no Data"}
        </div>
        <div className="History">
          <h3>Search History:</h3>
          <ul className="search-history">

          {searchHistory.map((history, index) => (
          <li key={index}>
            <Link to={`/search?query=${history}`}>{history}</Link>
          </li>
        ))}
 
          </ul>
        </div>
      </div>
    </div>
  );
}
