import axios from 'axios';
import React, { useState, useEffect } from 'react';
import "./Related.css"
const RelatedCard = React.memo((props: any) => {
    const { Jobs, Skills, SetSkills } = props;
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
        <div>
            <h2>Related Jobs:</h2>
            <ul>
                {JobsData.map((job, index) => (
                    <li key={index} >
                        <h3 className='Job-title'>{job.title}</h3>
                    </li>
                ))}
            </ul>

        </div>
    );
});

export default RelatedCard;
