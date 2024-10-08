import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import "./SingleJob.css";
import RelatedCard from "../Related/RelatedCard";

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
    const fetchSkills = async () => {
      if (job) {
        const skillPromises = job.relationships.skills.map((skill: Skill) =>
          axios.get(`https://skills-api-zeta.vercel.app/skill/${skill.id}`)
        );
        const skillResponses = await Promise.all(skillPromises);
        const skillNames = skillResponses.map(
          (response) => response.data.data.skill.attributes.name
        );
        setSkills(skillNames); // تخزين أسماء المهارات في الحالة

        // تخزين المهارات والوظائف المرتبطة
        setATTR(
          skillResponses.map((response) => response.data.data.skill.attributes)
        );
        setJobsID(
          skillResponses.map(
            (response) => response.data.data.skill.relationships.jobs
          )
        );
        setSkillsID(
          skillResponses.map(
            (response) => response.data.data.skill.relationships.skills
          )
        );
      }
    };

    fetchSkills();
  }, [job]);

  // استخدام useMemo لمنع إعادة الحساب غير الضرورية
  const memoizedAttributes = useMemo(
    () => ATTR.map((attr) => attr.name),
    [ATTR]
  );

  if (loading) {
    return <div>Loading...</div>; // عرض حالة التحميل
  }

  if (error) {
    return <div>{error}</div>; // عرض رسالة الخطأ
  }

  return (
    <div className="SJob-Container">
      <div>
        <h1>{job?.attributes?.title}</h1>
        <div>
          <h2>Related Skills:</h2>
          <ul>
            {skills.map((skillName, index) => (
              <li key={index}>{skillName}</li> // عرض أسماء المهارات
            ))}
          </ul>
        </div>
      </div>
      <RelatedCard
        Jobs={JobsID}
        Skills={SkillsID}
        ATTR={memoizedAttributes} // تمرير القيم المحسوبة باستخدام useMemo
      />
    </div>
  );
}
