import axios from 'axios';
import React, { useState, useEffect } from 'react';
import "./Related.css";
import { Link } from 'react-router-dom';

interface Job {
    Jobs: { id: string }[][];
    Skills: { id: string }[][];
    SetSkills: React.Dispatch<React.SetStateAction<{ SkillsData: any[], SkillsInfo: any[] }>>;
    ATTR: string[];
}

const RelatedCard = React.memo((props: Job) => {
    const { Jobs, Skills, SetSkills } = props;
    const [jobIDs, setJobIDs] = useState<string[]>([]);
    const [skillIDs, setSkillIDs] = useState<string[]>([]);
    const [JobsData, setJobsData] = useState<{ title: string }[]>([]);
    const [SkillsData, setSkillsData] = useState<string[]>([]);
    const [SkillsInfo, setSkillsInfo] = useState<{ importance: number, level: string, type: string }[]>([]);

    useEffect(() => {
        const newJobIDs = Jobs.flatMap((jobArray: { id: string }[]) => jobArray.map((job: { id: string }) => job.id));
        const newSkillIDs = Skills.flatMap((skillArray: { id: string }[]) => skillArray.map((skill: { id: string }) => skill.id));
        setJobIDs(newJobIDs);
        setSkillIDs(newSkillIDs);
    }, [Jobs, Skills]);

    // Get Jobs Info 
    useEffect(() => {
        const fetchJobs = async () => {
            if (jobIDs.length) {
                try {
                    const JobsPromises = jobIDs.map((jobID: string) =>
                        axios.get(`https://skills-api-zeta.vercel.app/job/${jobID}`)
                    );
                    const JobsResponses = await Promise.all(JobsPromises);
                    const jobDetails = JobsResponses.map(response => response.data.data.job.attributes);
                    setJobsData(jobDetails);
                } catch (error) {
                    console.error('فشل في جلب تفاصيل الوظائف:', error);
                }
            }
        };
        fetchJobs();
    }, [jobIDs]);

    useEffect(() => {
        const fetchSkills = async () => {
            if (skillIDs.length) {
                try {
                    const skillPromises = skillIDs.map((skillID: string) =>
                        axios.get(`https://skills-api-zeta.vercel.app/skill/${skillID}`)
                    );
                    const skillResponses = await Promise.all(skillPromises);
                    const skillsDetails = skillResponses.map(response => response.data.data.skill.attributes);
                    setSkillsData(skillsDetails.map(skill => skill.name));
                    setSkillsInfo(skillsDetails.map(skill => ({
                        importance: skill.importance,
                        level: skill.level,
                        type: skill.type,
                    })));
                    SetSkills({ SkillsData, SkillsInfo });
                } catch (error) {
                    console.error('فشل في جلب تفاصيل المهارات:', error);
                }
            }
        };
        fetchSkills();
    }, [skillIDs, SetSkills, SkillsData, SkillsInfo]);

    return (
        <div className='RelatedJobs'>
            <h2>Related Jobs:</h2>
            <ul>
                {JobsData.map((job, index) => (
                    <li key={index}>
                        <Link to={`/job/${jobIDs[index]}`} className='Job-link'>
                            <h3 className='Job-title'>{job.title}</h3>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
});

export default RelatedCard;
