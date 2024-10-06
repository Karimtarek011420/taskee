import { Link } from "react-router-dom";
import "./jobcard.css";

interface Job {
  id: string;
  company: string;
  location: string;
  attributes?: {
    title: string;
  };
  title?: string;
}

const JobCard: React.FC<{ job: Job }> = ({ job }) => {
  return (
    <div className="job-card">
      <h3>{job.title || job.attributes?.title}</h3>
      <div>
        <p className="relatedskills">Related Skills:</p>
      </div>
      <ul className="relatedskills">
        <li>operation monitoring</li>
        <li>active listening</li>
        <li>information ordering</li>
        <li>operation monitoring</li>
        <li>active listening</li>
        <li>information ordering</li>
      </ul>

      <Link to={`/job/${job.id}`}>View Job details</Link>
    </div>
  );
};

export default JobCard;
