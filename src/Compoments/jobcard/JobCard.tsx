import { Link} from "react-router-dom";
import "./jobcard.css";
import { useEffect, useState } from "react";
import axios from "axios";
interface Skill {
  id: string;
  name: string;
}
interface Job {
  id: string;
  company: string;
  location: string;
  attributes?: {
    title: string;
  };
  title?: string;
  relationships: {
    skills: Skill[];
  };
}


const JobCard: React.FC<{ job: Job }> = ({ job }) => {
  const [skills, setSkills] = useState<string[]>([]);


  useEffect(() => {
    const fetchSkills = async () => {
      if (job) {
        const skillPromises = job.relationships.skills.map((skill: Skill) =>
          axios.get(`https://skills-api-zeta.vercel.app/skill/${skill.id}`)
        );
        const skillResponses = await Promise.all(skillPromises);
        const skillNames = skillResponses.map(response => response.data.data.skill.attributes.name);
        setSkills(skillNames);
      }

    };

    fetchSkills();
  }, [job])
  return (
    <div className="job-card">
      <h3>{job.title || job.attributes?.title}</h3>
      <div>
        <p className="relatedskills">Related Skills:</p>
      </div>
      <ul className="relatedskills">
        {skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>

      <Link to={`/job/${job.id}`}>View Job details</Link>

    </div>
  );
};

export default JobCard;
