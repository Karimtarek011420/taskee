import axios from 'axios';
import React, { useState, useEffect } from 'react';

const RelatedCard = React.memo((props: any) => {
    const { Jobs, Skills } = props;
    const [jobIDs, setJobIDs] = useState<string[]>([]);
    const [skillIDs, setSkillIDs] = useState<string[]>([]);
    const [JobsData, setJobsData] = useState<any[]>([]);
    const [SkillsData, setSkillsData] = useState<any[]>([]);
    const [SkillsInfo, setSkillsInfo] = useState<any[]>([]);

    useEffect(() => {
        const newJobIDs = Jobs.flatMap((jobArray: any[]) => jobArray.map((job: any) => job.id));
        const newSkillIDs = Skills.flatMap((skillArray: any[]) => skillArray.map((skill: any) => skill.id));
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
                    console.log(
                        JobsResponses.map(response => response.data.data)
                    )
                    setJobsData(jobDetails);
                } catch (error) {
                    console.error('فشل في جلب تفاصيل الوظائف:', error);
                }
            }
        };
        fetchJobs();
    }, [jobIDs]);

    // Get Skills Info 
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
                } catch (error) {
                    console.error('فشل في جلب تفاصيل المهارات:', error);
                }
            }
        };
        fetchSkills();
    }, [skillIDs]);

    return (
        <div>
            <h2>Related Jobs:</h2>
            <ul>
                {JobsData.map((job, index) => (
                    <li key={index}>
                        <h3>{job.title}</h3>
                        <p>{job.description}</p>
                    </li>
                ))}
            </ul>

            <h2>Related Skills:</h2>
            <ul>
                {SkillsData.map((skill, index) => (
                    <li key={index}>
                        <h3>{skill}</h3>
                        <p>Importance: {SkillsInfo[index]?.importance}</p>
                        <p>Level: {SkillsInfo[index]?.level}</p>
                        <p>Type: {SkillsInfo[index]?.type}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
});

export default RelatedCard;
