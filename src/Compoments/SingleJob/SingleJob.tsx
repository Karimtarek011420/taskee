import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import "./SingleJob.css";
import RelatedCard from "../Related/RelatedCard";
import { fetchSkillsData } from "./FetchSkills";

interface Skill {
  id: string;
  attributes: {
    name: string;
  };
  relationships: {
    jobs: JobType[];
    skills: SkillType[];
  };
}

interface Job {
  relationships: {
    skills: Skill[];
  };
  attributes?: {
    title: string;
  };
}

interface SkillType {
  id: string;
  attributes: {
    name: string;
  };
  relationships: {
    jobs: JobType[];
    skills: SkillType[];
  };
}

interface JobType {
  id: string;
  attributes: {
    title: string;
  };
}

export default function SingleJob() {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [skills, setSkills] = useState<string[]>([]);
  const [SkillsID, setSkillsID] = useState<SkillType[][]>([]);
  const [JobsID, setJobsID] = useState<JobType[][]>([]);
  const [ATTR, setATTR] = useState<any[]>([]);
  const [RelatedSkills, setRelatedSkills] = useState<{
    SkillsData: any[];
    SkillsInfo: any[];
  }>({
    SkillsData: [],
    SkillsInfo: [],
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(
          `https://skills-api-zeta.vercel.app/job/${id}`
        );
        setJob(response.data.data.job);
        setLoading(false);
      } catch (error: any) {
        setError("فشل في جلب البيانات");
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  useEffect(() => {
    if (job) {
      fetchSkillsData(
        job.relationships.skills,
        setSkills,
        setATTR,
        setJobsID,
        setSkillsID
      );
    }
  }, [job]);

  const memoizedAttributes = useMemo(
    () => ATTR.map((attr) => attr.name),
    [ATTR]
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="SJob-Container">
      <div className="perant">
        <div className="widthper">
        <h1>{job?.attributes?.title} </h1>
        <h2>Related Skills:</h2>
        <ul className="ATTR-Skills">
          {skills.map((skillName, index) => (
            <li key={index}>{skillName}</li>
          ))}
        </ul>

        </div>
        <div>
          <ul className="listskill">
          {RelatedSkills.SkillsData.map((skill, index) => (
              <li key={index} className="listbox">
                <h3>{skill}</h3>
                <div className="ATTR-Skill">
                  <p>
                    <b>Importance</b>:{" "}
                    {RelatedSkills.SkillsInfo[index]?.importance}
                  </p>
                  <p>
                    <b>Level</b>: {RelatedSkills.SkillsInfo[index]?.level}
                  </p>
                  <p>
                    <b>Type</b>: {RelatedSkills.SkillsInfo[index]?.type}
                  </p>
                </div>
              </li>
            ))}

          </ul>
        </div>
      </div>

      <RelatedCard
        Jobs={JobsID}
        Skills={SkillsID}
        ATTR={memoizedAttributes}
        SetSkills={setRelatedSkills}
      />
    </div>
  );
}
